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

func GetNotifications(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "User ID is required", http.StatusBadRequest)
		return
	}

	var notifications []models.Notification
	if err := db.DB.Where("user_id = ?", userID).Order("created_at DESC").Find(&notifications).Error; err != nil {
		utils.SendError(w, "Failed to fetch notifications", http.StatusInternalServerError)
		return
	}

	var unreadCount int64
	db.DB.Model(&models.Notification{}).Where("user_id = ? AND read = ?", userID, false).Count(&unreadCount)

	notificationResponses := make([]views.NotificationResponse, len(notifications))
	for i, n := range notifications {
		notificationResponses[i] = views.NotificationResponse{
			ID:        n.ID,
			Title:     n.Title,
			Message:   n.Message,
			Type:      n.Type,
			Read:      n.Read,
			CreatedAt: n.CreatedAt.Format(time.RFC3339),
		}
		if n.ReadAt != nil {
			notificationResponses[i].ReadAt = n.ReadAt.Format(time.RFC3339)
		}
	}

	response := views.NotificationListResponse{
		Notifications: notificationResponses,
		Total:         int64(len(notifications)),
		UnreadCount:   unreadCount,
	}

	utils.SendSuccess(w, response)
}

func MarkNotificationsRead(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "User ID is required", http.StatusBadRequest)
		return
	}

	var req views.MarkNotificationsReadRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if len(req.NotificationIDs) == 0 {
		utils.SendError(w, "Notification IDs are required", http.StatusBadRequest)
		return
	}

	now := time.Now()
	if err := db.DB.Model(&models.Notification{}).
		Where("id IN ? AND user_id = ?", req.NotificationIDs, userID).
		Updates(map[string]interface{}{
			"read":   true,
			"read_at": now,
		}).Error; err != nil {
		utils.SendError(w, "Failed to mark notifications as read", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, map[string]interface{}{
		"message": "Notifications marked as read",
		"count":   len(req.NotificationIDs),
	})
}

func ClearNotifications(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "User ID is required", http.StatusBadRequest)
		return
	}

	if err := db.DB.Where("user_id = ?", userID).Delete(&models.Notification{}).Error; err != nil {
		utils.SendError(w, "Failed to clear notifications", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, map[string]interface{}{
		"message": "All notifications cleared",
	})
}
