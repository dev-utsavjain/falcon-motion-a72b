package handlers

import (
	"backend/db"
	"backend/models"
	"backend/utils"
	"backend/views"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"
)

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if id == "" {
		utils.SendError(w, "User ID is required", http.StatusBadRequest)
		return
	}

	var req views.UpdateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	var user models.User
	if err := db.DB.Where("id = ?", id).First(&user).Error; err != nil {
		utils.SendError(w, "User not found", http.StatusNotFound)
		return
	}

	if req.Name != "" {
		user.Name = req.Name
	}
	if req.Email != "" {
		user.Email = req.Email
	}
	if req.Avatar != "" {
		user.Avatar = req.Avatar
	}
	if req.Role != "" {
		user.Role = req.Role
	}
	if req.Status != "" {
		user.Status = req.Status
	}

	if err := db.DB.Save(&user).Error; err != nil {
		utils.SendError(w, "Failed to update user", http.StatusInternalServerError)
		return
	}

	response := views.UserResponse{
		ID:            user.ID,
		Name:          user.Name,
		Email:         user.Email,
		Avatar:        user.Avatar,
		Role:          user.Role,
		Status:        user.Status,
		EmailVerified: user.EmailVerified,
		CreatedAt:     user.CreatedAt.Format(time.RFC3339),
	}
	if user.LastActive != nil {
		response.LastActive = user.LastActive.Format(time.RFC3339)
	}

	utils.SendSuccess(w, response)
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	if page < 1 {
		page = 1
	}

	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	if limit < 1 || limit > 100 {
		limit = 20
	}

	offset := (page - 1) * limit

	var users []models.User
	var total int64

	db.DB.Model(&models.User{}).Count(&total)
	if err := db.DB.Limit(limit).Offset(offset).Find(&users).Error; err != nil {
		utils.SendError(w, "Failed to fetch users", http.StatusInternalServerError)
		return
	}

	userResponses := make([]views.UserResponse, len(users))
	for i, user := range users {
		userResponses[i] = views.UserResponse{
			ID:            user.ID,
			Name:          user.Name,
			Email:         user.Email,
			Avatar:        user.Avatar,
			Role:          user.Role,
			Status:        user.Status,
			EmailVerified: user.EmailVerified,
			CreatedAt:     user.CreatedAt.Format(time.RFC3339),
		}
		if user.LastActive != nil {
			userResponses[i].LastActive = user.LastActive.Format(time.RFC3339)
		}
	}

	totalPages := int(total) / limit
	if int(total)%limit > 0 {
		totalPages++
	}

	response := views.UserListResponse{
		Users:      userResponses,
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
	}

	utils.SendSuccess(w, response)
}

func SearchUsers(w http.ResponseWriter, r *http.Request) {
	query := strings.TrimSpace(r.URL.Query().Get("q"))
	if query == "" {
		utils.SendError(w, "Search query is required", http.StatusBadRequest)
		return
	}

	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	if page < 1 {
		page = 1
	}

	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	if limit < 1 || limit > 100 {
		limit = 20
	}

	offset := (page - 1) * limit

	var users []models.User
	var total int64

	searchQuery := db.DB.Where("name ILIKE ? OR email ILIKE ?", "%"+query+"%", "%"+query+"%")

	searchQuery.Model(&models.User{}).Count(&total)
	if err := searchQuery.Limit(limit).Offset(offset).Find(&users).Error; err != nil {
		utils.SendError(w, "Failed to search users", http.StatusInternalServerError)
		return
	}

	userResponses := make([]views.UserResponse, len(users))
	for i, user := range users {
		userResponses[i] = views.UserResponse{
			ID:            user.ID,
			Name:          user.Name,
			Email:         user.Email,
			Avatar:        user.Avatar,
			Role:          user.Role,
			Status:        user.Status,
			EmailVerified: user.EmailVerified,
			CreatedAt:     user.CreatedAt.Format(time.RFC3339),
		}
		if user.LastActive != nil {
			userResponses[i].LastActive = user.LastActive.Format(time.RFC3339)
		}
	}

	totalPages := int(total) / limit
	if int(total)%limit > 0 {
		totalPages++
	}

	response := views.UserListResponse{
		Users:      userResponses,
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
	}

	utils.SendSuccess(w, response)
}

func BulkUserActions(w http.ResponseWriter, r *http.Request) {
	var req views.BulkUserActionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if len(req.UserIDs) == 0 {
		utils.SendError(w, "User IDs are required", http.StatusBadRequest)
		return
	}

	if req.Action == "" {
		utils.SendError(w, "Action is required", http.StatusBadRequest)
		return
	}

	switch req.Action {
	case "update_status":
		if req.Value == "" {
			utils.SendError(w, "Status value is required", http.StatusBadRequest)
			return
		}
		if err := db.DB.Model(&models.User{}).Where("id IN ?", req.UserIDs).Update("status", req.Value).Error; err != nil {
			utils.SendError(w, "Failed to update user status", http.StatusInternalServerError)
			return
		}
	case "update_role":
		if req.Value == "" {
			utils.SendError(w, "Role value is required", http.StatusBadRequest)
			return
		}
		if err := db.DB.Model(&models.User{}).Where("id IN ?", req.UserIDs).Update("role", req.Value).Error; err != nil {
			utils.SendError(w, "Failed to update user role", http.StatusInternalServerError)
			return
		}
	case "delete":
		if err := db.DB.Where("id IN ?", req.UserIDs).Delete(&models.User{}).Error; err != nil {
			utils.SendError(w, "Failed to delete users", http.StatusInternalServerError)
			return
		}
	default:
		utils.SendError(w, "Invalid action", http.StatusBadRequest)
		return
	}

	utils.SendSuccess(w, map[string]interface{}{
		"message": "Bulk action completed successfully",
		"action":  req.Action,
		"count":   len(req.UserIDs),
	})
}
