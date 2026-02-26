package handlers

import (
	"encoding/json"
	"net/http"

	"backend/utils"
)

func GoogleAuth(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Token string `json:"token"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Token == "" {
		utils.SendError(w, "Google token is required", http.StatusBadRequest)
		return
	}

	// In real implementation, verify Google token and create/update user
	response := map[string]interface{}{
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
		"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
		"user": map[string]interface{}{
			"id":    "123",
			"name":  "Google User",
			"email": "user@gmail.com",
			"avatar": "https://example.com/avatar.jpg",
		},
	}

	utils.SendSuccess(w, response)
}
