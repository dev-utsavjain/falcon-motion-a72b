package handlers

import (
	"backend/db"
	"backend/models"
	"backend/utils"
	"backend/views"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"time"
)

func GetApiKeys(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "User ID is required", http.StatusBadRequest)
		return
	}

	var apiKeys []models.ApiKey
	if err := db.DB.Where("user_id = ?", userID).Find(&apiKeys).Error; err != nil {
		utils.SendError(w, "Failed to fetch API keys", http.StatusInternalServerError)
		return
	}

	keyResponses := make([]views.ApiKeyResponse, len(apiKeys))
	for i, key := range apiKeys {
		keyResponses[i] = views.ApiKeyResponse{
			ID:        key.ID,
			Name:      key.Name,
			CreatedAt: key.CreatedAt.Format(time.RFC3339),
		}
		if key.LastUsed != nil {
			keyResponses[i].LastUsed = key.LastUsed.Format(time.RFC3339)
		}
		if key.ExpiresAt != nil {
			keyResponses[i].ExpiresAt = key.ExpiresAt.Format(time.RFC3339)
		}
	}

	response := views.ApiKeyListResponse{
		ApiKeys: keyResponses,
		Total:   int64(len(apiKeys)),
	}

	utils.SendSuccess(w, response)
}

func CreateApiKey(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "User ID is required", http.StatusBadRequest)
		return
	}

	var req views.CreateApiKeyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Name == "" {
		utils.SendError(w, "API key name is required", http.StatusBadRequest)
		return
	}

	keyBytes := make([]byte, 32)
	if _, err := rand.Read(keyBytes); err != nil {
		utils.SendError(w, "Failed to generate API key", http.StatusInternalServerError)
		return
	}
	apiKeyValue := "ak_" + hex.EncodeToString(keyBytes)

	apiKey := models.ApiKey{
		Key:    apiKeyValue,
		Name:   req.Name,
		UserID: userID,
	}

	if req.ExpiresAt != "" {
		expiresAt, err := time.Parse(time.RFC3339, req.ExpiresAt)
		if err == nil {
			apiKey.ExpiresAt = &expiresAt
		}
	}

	if err := db.DB.Create(&apiKey).Error; err != nil {
		utils.SendError(w, "Failed to create API key", http.StatusInternalServerError)
		return
	}

	response := views.ApiKeyResponse{
		ID:        apiKey.ID,
		Key:       apiKey.Key,
		Name:      apiKey.Name,
		CreatedAt: apiKey.CreatedAt.Format(time.RFC3339),
	}
	if apiKey.ExpiresAt != nil {
		response.ExpiresAt = apiKey.ExpiresAt.Format(time.RFC3339)
	}

	utils.SendSuccess(w, response)
}
