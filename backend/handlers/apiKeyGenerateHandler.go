package handlers

import (
	"encoding/json"
	"net/http"

	"backend/utils"
)

func GenerateAPIKey(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Name string `json:"name"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Name == "" {
		utils.SendError(w, "API key name is required", http.StatusBadRequest)
		return
	}

	key := map[string]interface{}{
		"id":        "3",
		"name":      req.Name,
		"key":       "sk_live_..." + utils.GenerateRandomString(8),
		"createdAt": "2024-01-20T00:00:00Z",
		"lastUsed":  nil,
	}

	utils.SendSuccess(w, key)
}
