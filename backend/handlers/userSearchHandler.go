package handlers

import (
	"net/http"
	"strings"

	"backend/db"
	"backend/models"
	"backend/utils"
)

func SearchUsers(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	if query == "" {
		utils.SendError(w, "Search query is required", http.StatusBadRequest)
		return
	}

	var users []models.User
	if err := db.DB.Where("name ILIKE ? OR email ILIKE ?", "%"+query+"%", "%"+query+"%").Find(&users).Error; err != nil {
		utils.SendError(w, "Failed to search users", http.StatusInternalServerError)
		return
	}

	// Filter out sensitive fields
	var result []map[string]interface{}
	for _, user := range users {
		result = append(result, map[string]interface{}{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
			"role":  user.Role,
			"status": user.Status,
			"avatar": user.Avatar,
		})
	}

	utils.SendSuccess(w, map[string]interface{}{
		"query": strings.TrimSpace(query),
		"results": result,
		"count": len(result),
	})
}
