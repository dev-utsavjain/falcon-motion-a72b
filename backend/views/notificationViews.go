package views

type MarkNotificationsReadRequest struct {
	NotificationIDs []string `json:"notificationIds"`
}

type NotificationResponse struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Message   string `json:"message"`
	Type      string `json:"type"`
	Read      bool   `json:"read"`
	ReadAt    string `json:"readAt,omitempty"`
	CreatedAt string `json:"createdAt"`
}

type NotificationListResponse struct {
	Notifications []NotificationResponse `json:"notifications"`
	Total         int64                  `json:"total"`
	UnreadCount   int64                  `json:"unreadCount"`
}
