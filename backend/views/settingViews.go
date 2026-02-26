package views

type UpdateSettingsRequest struct {
	Theme         string                 `json:"theme,omitempty"`
	Language      string                 `json:"language,omitempty"`
	Timezone      string                 `json:"timezone,omitempty"`
	Notifications map[string]interface{} `json:"notifications,omitempty"`
	Privacy       map[string]interface{} `json:"privacy,omitempty"`
}

type SettingsResponse struct {
	Theme         string                 `json:"theme"`
	Language      string                 `json:"language"`
	Timezone      string                 `json:"timezone"`
	Notifications map[string]interface{} `json:"notifications"`
	Privacy       map[string]interface{} `json:"privacy"`
	CreatedAt     string                 `json:"createdAt"`
	UpdatedAt     string                 `json:"updatedAt"`
}
