package handlers

import (
	"backend/db"
	"backend/models"
	"backend/utils"
	"backend/views"
	"encoding/json"
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"
)

func Login(w http.ResponseWriter, r *http.Request) {
	var req views.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Email == "" || req.Password == "" {
		utils.SendError(w, "Email and password are required", http.StatusBadRequest)
		return
	}

	var user models.User
	if err := db.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		utils.SendError(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		utils.SendError(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	if user.Status != "active" {
		utils.SendError(w, "Account is not active", http.StatusUnauthorized)
		return
	}

	now := time.Now()
	user.LastActive = &now
	db.DB.Save(&user)

	response := views.LoginResponse{
		User: views.UserResponse{
			ID:            user.ID,
			Name:          user.Name,
			Email:         user.Email,
			Avatar:        user.Avatar,
			Role:          user.Role,
			Status:        user.Status,
			EmailVerified: user.EmailVerified,
			CreatedAt:     user.CreatedAt.Format(time.RFC3339),
		},
		AccessToken:  "mock_access_token_" + user.ID,
		RefreshToken: "mock_refresh_token_" + user.ID,
	}
	if user.LastActive != nil {
		response.User.LastActive = user.LastActive.Format(time.RFC3339)
	}

	utils.SendSuccess(w, response)
}

func Register(w http.ResponseWriter, r *http.Request) {
	var req views.RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Name == "" || req.Email == "" || req.Password == "" {
		utils.SendError(w, "Name, email and password are required", http.StatusBadRequest)
		return
	}

	if !utils.IsValidEmail(req.Email) {
		utils.SendError(w, "Invalid email format", http.StatusBadRequest)
		return
	}

	var existingUser models.User
	if err := db.DB.Where("email = ?", req.Email).First(&existingUser).Error; err == nil {
		utils.SendError(w, "Email already exists", http.StatusConflict)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		utils.SendError(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	user := models.User{
		Name:          req.Name,
		Email:         req.Email,
		Password:      string(hashedPassword),
		Role:          "user",
		Status:        "active",
		EmailVerified: false,
	}

	if err := db.DB.Create(&user).Error; err != nil {
		utils.SendError(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	response := views.LoginResponse{
		User: views.UserResponse{
			ID:            user.ID,
			Name:          user.Name,
			Email:         user.Email,
			Avatar:        user.Avatar,
			Role:          user.Role,
			Status:        user.Status,
			EmailVerified: user.EmailVerified,
			CreatedAt:     user.CreatedAt.Format(time.RFC3339),
		},
		AccessToken:  "mock_access_token_" + user.ID,
		RefreshToken: "mock_refresh_token_" + user.ID,
	}

	utils.SendSuccess(w, response)
}

func GoogleAuth(w http.ResponseWriter, r *http.Request) {
	var req views.GoogleAuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Token == "" {
		utils.SendError(w, "Google token is required", http.StatusBadRequest)
		return
	}

	user := models.User{
		Name:          "Google User",
		Email:         "google_" + req.Token[:8] + "@example.com",
		Provider:      "google",
		ProviderID:    req.Token,
		Role:          "user",
		Status:        "active",
		EmailVerified: true,
	}

	var existingUser models.User
	if err := db.DB.Where("provider = ? AND provider_id = ?", "google", req.Token).First(&existingUser).Error; err != nil {
		if err := db.DB.Create(&user).Error; err != nil {
			utils.SendError(w, "Failed to create user", http.StatusInternalServerError)
			return
		}
	} else {
		user = existingUser
	}

	now := time.Now()
	user.LastActive = &now
	db.DB.Save(&user)

	response := views.LoginResponse{
		User: views.UserResponse{
			ID:            user.ID,
			Name:          user.Name,
			Email:         user.Email,
			Avatar:        user.Avatar,
			Role:          user.Role,
			Status:        user.Status,
			EmailVerified: user.EmailVerified,
			CreatedAt:     user.CreatedAt.Format(time.RFC3339),
		},
		AccessToken:  "mock_access_token_" + user.ID,
		RefreshToken: "mock_refresh_token_" + user.ID,
	}
	if user.LastActive != nil {
		response.User.LastActive = user.LastActive.Format(time.RFC3339)
	}

	utils.SendSuccess(w, response)
}

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

	var user models.User
	if err := db.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		utils.SendSuccess(w, map[string]interface{}{
			"message": "If the email exists, a reset link has been sent",
		})
		return
	}

	resetToken := "mock_reset_token_" + user.ID
	resetExpires := time.Now().Add(24 * time.Hour)

	user.ResetPasswordToken = resetToken
	user.ResetPasswordExpires = &resetExpires

	if err := db.DB.Save(&user).Error; err != nil {
		utils.SendError(w, "Failed to process password reset", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, map[string]interface{}{
		"message": "If the email exists, a reset link has been sent",
	})
}

func ResetPassword(w http.ResponseWriter, r *http.Request) {
	var req views.ResetPasswordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Token == "" || req.Password == "" {
		utils.SendError(w, "Token and password are required", http.StatusBadRequest)
		return
	}

	var user models.User
	if err := db.DB.Where("reset_password_token = ?", req.Token).First(&user).Error; err != nil {
		utils.SendError(w, "Invalid or expired token", http.StatusBadRequest)
		return
	}

	if user.ResetPasswordExpires == nil || user.ResetPasswordExpires.Before(time.Now()) {
		utils.SendError(w, "Token has expired", http.StatusBadRequest)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		utils.SendError(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	user.Password = string(hashedPassword)
	user.ResetPasswordToken = ""
	user.ResetPasswordExpires = nil

	if err := db.DB.Save(&user).Error; err != nil {
		utils.SendError(w, "Failed to reset password", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, map[string]interface{}{
		"message": "Password reset successfully",
	})
}

func RefreshToken(w http.ResponseWriter, r *http.Request) {
	var req views.RefreshTokenRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.RefreshToken == "" {
		utils.SendError(w, "Refresh token is required", http.StatusBadRequest)
		return
	}

	var refreshToken models.RefreshToken
	if err := db.DB.Where("token = ?", req.RefreshToken).First(&refreshToken).Error; err != nil {
		utils.SendError(w, "Invalid refresh token", http.StatusUnauthorized)
		return
	}

	if refreshToken.ExpiresAt.Before(time.Now()) {
		utils.SendError(w, "Refresh token has expired", http.StatusUnauthorized)
		return
	}

	newAccessToken := "mock_new_access_token_" + refreshToken.UserID
	newRefreshToken := "mock_new_refresh_token_" + refreshToken.UserID

	refreshToken.Token = newRefreshToken
	refreshToken.ExpiresAt = time.Now().Add(7 * 24 * time.Hour)

	if err := db.DB.Save(&refreshToken).Error; err != nil {
		utils.SendError(w, "Failed to update refresh token", http.StatusInternalServerError)
		return
	}

	response := views.RefreshTokenResponse{
		AccessToken:  newAccessToken,
		RefreshToken: newRefreshToken,
	}

	utils.SendSuccess(w, response)
}

func Logout(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "User ID is required", http.StatusBadRequest)
		return
	}

	if err := db.DB.Where("user_id = ?", userID).Delete(&models.RefreshToken{}).Error; err != nil {
		utils.SendError(w, "Failed to logout", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, map[string]interface{}{
		"message": "Logged out successfully",
	})
}

func GetMe(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "User ID is required", http.StatusBadRequest)
		return
	}

	var user models.User
	if err := db.DB.Where("id = ?", userID).First(&user).Error; err != nil {
		utils.SendError(w, "User not found", http.StatusNotFound)
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
