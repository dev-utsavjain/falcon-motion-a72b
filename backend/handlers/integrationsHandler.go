package handlers

import (
	"net/http"
	"backend/utils"
)

func GetIntegrations(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "User ID not found", http.StatusUnauthorized)
		return
	}

	integrations := []map[string]interface{}{
		{
			"id":       "slack",
			"name":     "Slack",
			"category": "communication",
			"status":   "available",
			"icon":     "slack-icon",
		},
		{
			"id":       "github",
			"name":     "GitHub",
			"category": "development",
			"status":   "available",
			"icon":     "github-icon",
		},
		{
			"id":       "stripe",
			"name":     "Stripe",
			"category": "payment",
			"status":   "available",
			"icon":     "stripe-icon",
		},
		{
			"id":       "google-analytics",
			"name":     "Google Analytics",
			"category": "analytics",
			"status":   "available",
			"icon":     "ga-icon",
		},
	}

	utils.SendSuccess(w, integrations)
}