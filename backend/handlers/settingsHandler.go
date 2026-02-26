package handlers

import (
	"encoding/json"
	"net/http"

	"backend/db"
	"backend/models"
	"backend/utils"
	"github.com/google/uuid"
)

func GetSettings(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var settings models.Settings
	if err := db.DB.Where("user_id = ?", userID).First(&settings).Error; err != nil {
		settings = models.Settings{
			ID:     uuid.New().String(),
			UserID: userID,
			Theme:  "light",
			Notifications: models.NotificationSettings{
				Email: true,
				Push:  true,
			},
		}
		if err := db.DB.Create(&settings).Error; err != nil {
			utils.SendError(w, "Failed to create settings", http.StatusInternalServerError)
			return
		}
	}

	utils.SendSuccess(w, settings)
}

func UpdateSettings(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var req struct {
		Theme         string                        `json:"theme"`
		Notifications models.NotificationSettings   `json:"notifications"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	var settings models.Settings
	if err := db.DB.Where("user_id = ?", userID).First(&settings).Error; err != nil {
		utils.SendError(w, "Settings not found", http.StatusNotFound)
		return
	}

	updates := map[string]interface{}{}
	if req.Theme != "" {
		updates["theme"] = req.Theme
	}
	if req.Notifications.Email || !req.Notifications.Push {
		updates["notifications"] = req.Notifications
	}

	if err := db.DB.Model(&settings).Updates(updates).Error; err != nil {
		utils.SendError(w, "Failed to update settings", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, settings)
}
