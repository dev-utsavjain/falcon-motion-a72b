package views

type CreateApiKeyRequest struct {
	Name      string `json:"name"`
	ExpiresAt string `json:"expiresAt,omitempty"`
}

type ApiKeyResponse struct {
	ID        string `json:"id"`
	Key       string `json:"key"`
	Name      string `json:"name"`
	LastUsed  string `json:"lastUsed,omitempty"`
	ExpiresAt string `json:"expiresAt,omitempty"`
	CreatedAt string `json:"createdAt"`
}

type ApiKeyListResponse struct {
	ApiKeys []ApiKeyResponse `json:"apiKeys"`
	Total   int64            `json:"total"`
}
