package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"backend/db"
	"backend/models"
	"backend/utils"
)

func ResetPassword(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Token    string `json:"token"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Token == "" || req.Password == "" {
		utils.SendError(w, "Token and password are required", http.StatusBadRequest)
		return
	}

	var user models.User
	if err := db.DB.Where("reset_password_token = ? AND reset_password_expires > ?", req.Token, time.Now()).First(&user).Error; err != nil {
		utils.SendError(w, "Invalid or expired token", http.StatusBadRequest)
		return
	}

	// In real implementation, hash the new password
	user.Password = req.Password
	user.ResetPasswordToken = ""
	user.ResetPasswordExpires = nil

	if err := db.DB.Save(&user).Error; err != nil {
		utils.SendError(w, "Failed to reset password", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, map[string]interface{}{
		"message": "Password reset successful",
	})
}
