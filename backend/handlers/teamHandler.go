package handlers

import (
	"backend/db"
	"backend/models"
	"backend/utils"
	"backend/views"
	"encoding/json"
	"net/http"
	"time"
)

func GetTeamMembers(w http.ResponseWriter, r *http.Request) {
	var users []models.User
	if err := db.DB.Where("role IN ?", []string{"admin", "member"}).Find(&users).Error; err != nil {
		utils.SendError(w, "Failed to fetch team members", http.StatusInternalServerError)
		return
	}

	members := make([]views.TeamMemberResponse, len(users))
	for i, user := range users {
		members[i] = views.TeamMemberResponse{
			ID:       user.ID,
			Name:     user.Name,
			Email:    user.Email,
			Role:     user.Role,
			Status:   user.Status,
			JoinedAt: user.CreatedAt.Format(time.RFC3339),
		}
	}

	response := views.TeamListResponse{
		Members: members,
		Total:   int64(len(users)),
	}

	utils.SendSuccess(w, response)
}

func InviteTeamMember(w http.ResponseWriter, r *http.Request) {
	var req views.InviteTeamMemberRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Email == "" {
		utils.SendError(w, "Email is required", http.StatusBadRequest)
		return
	}

	if req.Role == "" {
		req.Role = "member"
	}

	var existingUser models.User
	if err := db.DB.Where("email = ?", req.Email).First(&existingUser).Error; err == nil {
		utils.SendError(w, "User already exists", http.StatusConflict)
		return
	}

	newUser := models.User{
		Email:         req.Email,
		Role:          req.Role,
		Status:        "invited",
		EmailVerified: false,
	}

	if err := db.DB.Create(&newUser).Error; err != nil {
		utils.SendError(w, "Failed to invite team member", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, map[string]interface{}{
		"message": "Team member invited successfully",
		"userId":  newUser.ID,
	})
}
