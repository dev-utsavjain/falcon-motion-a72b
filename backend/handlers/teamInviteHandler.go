package handlers

import (
	"encoding/json"
	"net/http"

	"backend/utils"
)

func InviteTeamMember(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Email string `json:"email"`
		Role  string `json:"role"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Email == "" {
		utils.SendError(w, "Email is required", http.StatusBadRequest)
		return
	}

	utils.SendSuccess(w, map[string]interface{}{
		"message": "Invitation sent successfully",
		"email":   req.Email,
		"role":    req.Role,
	})
}
