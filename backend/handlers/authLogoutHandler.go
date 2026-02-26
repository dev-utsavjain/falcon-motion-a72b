package handlers

import (
	"encoding/json"
	"net/http"

	"backend/utils"
)

func Logout(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Token string `json:"token"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// In real implementation, invalidate the token (e.g., add to blacklist)
	utils.SendSuccess(w, map[string]interface{}{
		"message": "Logged out successfully",
	})
}
