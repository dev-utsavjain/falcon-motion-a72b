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

func GetSettings(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "User ID is required", http.StatusBadRequest)
		return
	}

	var setting models.Setting
	if err := db.DB.Where("user_id = ?", userID).First(&setting).Error; err != nil {
		if err.Error() == "record not found" {
			setting = models.Setting{
				UserID:        userID,
				Theme:         "light",
				Language:      "en",
				Timezone:      "UTC",
			}
			if err := db.DB.Create(&setting).Error; err != nil {
				utils.SendError(w, "Failed to create default settings", http.StatusInternalServerError)
				return
			}
		} else {
			utils.SendError(w, "Failed to fetch settings", http.StatusInternalServerError)
			return
		}
	}

	response := views.SettingsResponse{
		Theme:     setting.Theme,
		Language:  setting.Language,
		Timezone:  setting.Timezone,
		CreatedAt: setting.CreatedAt.Format(time.RFC3339),
		UpdatedAt: setting.UpdatedAt.Format(time.RFC3339),
	}

	if setting.Notifications != nil {
		response.Notifications = setting.Notifications
	}
	if setting.Privacy != nil {
		response.Privacy = setting.Privacy
	}

	utils.SendSuccess(w, response)
}

func UpdateSettings(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "User ID is required", http.StatusBadRequest)
		return
	}

	var req views.UpdateSettingsRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	var setting models.Setting
	if err := db.DB.Where("user_id = ?", userID).First(&setting).Error; err != nil {
		utils.SendError(w, "Settings not found", http.StatusNotFound)
		return
	}

	if req.Theme != "" {
		setting.Theme = req.Theme
	}
	if req.Language != "" {
		setting.Language = req.Language
	}
	if req.Timezone != "" {
		setting.Timezone = req.Timezone
	}
	if req.Notifications != nil {
		setting.Notifications = req.Notifications
	}
	if req.Privacy != nil {
		setting.Privacy = req.Privacy
	}

	if err := db.DB.Save(&setting).Error; err != nil {
		utils.SendError(w, "Failed to update settings", http.StatusInternalServerError)
		return
	}

	response := views.SettingsResponse{
		Theme:     setting.Theme,
		Language:  setting.Language,
		Timezone:  setting.Timezone,
		CreatedAt: setting.CreatedAt.Format(time.RFC3339),
		UpdatedAt: setting.UpdatedAt.Format(time.RFC3339),
	}

	if setting.Notifications != nil {
		response.Notifications = setting.Notifications
	}
	if setting.Privacy != nil {
		response.Privacy = setting.Privacy
	}

	utils.SendSuccess(w, response)
}
