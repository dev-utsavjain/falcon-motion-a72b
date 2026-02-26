package handlers

import (
	"net/http"

	"backend/utils"
)

func GetNotifications(w http.ResponseWriter, r *http.Request) {
	notifications := []map[string]interface{}{
		{
			"id":        "1",
			"userId":    "123",
			"title":     "Welcome to the platform",
			"message":   "Your account has been created successfully",
			"type":      "info",
			"read":      false,
			"createdAt": "2024-01-01T00:00:00Z",
		},
		{
			"id":        "2",
			"userId":    "123",
			"title":     "New team member joined",
			"message":   "Jane Smith has joined your team",
			"type":      "success",
			"read":      true,
			"createdAt": "2024-01-15T00:00:00Z",
		},
	}

	utils.SendSuccess(w, notifications)
}
