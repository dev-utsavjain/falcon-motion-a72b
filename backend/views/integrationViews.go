package views

type IntegrationResponse struct {
	ID          string                 `json:"id"`
	Name        string                 `json:"name"`
	Type        string                 `json:"type"`
	Description string                 `json:"description"`
	Logo        string                 `json:"logo"`
	Status      string                 `json:"status"`
	Config      map[string]interface{} `json:"config,omitempty"`
}

type IntegrationListResponse struct {
	Integrations []IntegrationResponse `json:"integrations"`
	Total        int64                 `json:"total"`
}
