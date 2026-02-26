package handlers

import (
	"encoding/json"
	"net/http"
	"time"
	"backend/db"
	"backend/models"
	"backend/utils"
	"backend/views"
)

func ForgotPassword(w http.ResponseWriter, r *http.Request) {
	var req views.ForgotPasswordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Email == "" {
		utils.SendError(w, "Email is required", http.StatusBadRequest)
		return
	}

	if !utils.IsValidEmail(req.Email) {
		utils.SendError(w, "Invalid email format", http.StatusBadRequest)
		return
	}

	var user models.User
	if err := db.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		utils.SendSuccess(w, map[string]interface{}{
			"message": "If the email exists, a reset link has been sent",
		})
		return
	}

	resetToken := utils.GenerateRandomString(32)
	resetExpires := time.Now().Add(1 * time.Hour)

	user.ResetPasswordToken = resetToken
	user.ResetPasswordExpires = &resetExpires

	if err := db.DB.Save(&user).Error; err != nil {
		utils.SendError(w, "Failed to update user", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, map[string]interface{}{
		"message": "If the email exists, a reset link has been sent",
	})
}
