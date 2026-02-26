package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"backend/db"
	"backend/models"
	"backend/utils"
)

func RefreshToken(w http.ResponseWriter, r *http.Request) {
	var req struct {
		RefreshToken string `json:"refreshToken"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.RefreshToken == "" {
		utils.SendError(w, "Refresh token is required", http.StatusBadRequest)
		return
	}

	var token models.RefreshToken
	if err := db.DB.Where("token = ? AND expires_at > ?", req.RefreshToken, time.Now()).First(&token).Error; err != nil {
		utils.SendError(w, "Invalid or expired refresh token", http.StatusUnauthorized)
		return
	}

	// In real implementation, generate new JWT tokens
	response := map[string]interface{}{
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
		"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	}

	utils.SendSuccess(w, response)
}
