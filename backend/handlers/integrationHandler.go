package handlers

import (
	"backend/db"
	"backend/models"
	"backend/utils"
	"backend/views"
	"net/http"
)

func GetIntegrations(w http.ResponseWriter, r *http.Request) {
	var integrations []models.Integration
	if err := db.DB.Where("status = ?", "available").Find(&integrations).Error; err != nil {
		utils.SendError(w, "Failed to fetch integrations", http.StatusInternalServerError)
		return
	}

	integrationResponses := make([]views.IntegrationResponse, len(integrations))
	for i, integration := range integrations {
		integrationResponses[i] = views.IntegrationResponse{
			ID:          integration.ID,
			Name:        integration.Name,
			Type:        integration.Type,
			Description: integration.Description,
			Logo:        integration.Logo,
			Status:      integration.Status,
		}
		if integration.Config != nil {
			var config map[string]interface{}
			if err := integration.Config.UnmarshalJSON([]byte(integration.Config.String())); err == nil {
				integrationResponses[i].Config = config
			}
		}
	}

	response := views.IntegrationListResponse{
		Integrations: integrationResponses,
		Total:        int64(len(integrations)),
	}

	utils.SendSuccess(w, response)
}
