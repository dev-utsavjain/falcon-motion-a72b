package views

type UpdateUserRequest struct {
	Name      string `json:"name,omitempty"`
	Email     string `json:"email,omitempty"`
	Avatar    string `json:"avatar,omitempty"`
	Role      string `json:"role,omitempty"`
	Status    string `json:"status,omitempty"`
}

type UserResponse struct {
	ID            string `json:"id"`
	Name          string `json:"name"`
	Email         string `json:"email"`
	Avatar        string `json:"avatar"`
	Role          string `json:"role"`
	Status        string `json:"status"`
	EmailVerified bool   `json:"emailVerified"`
	LastActive    string `json:"lastActive,omitempty"`
	CreatedAt     string `json:"createdAt"`
}

type UserListResponse struct {
	Users      []UserResponse `json:"users"`
	Total      int64          `json:"total"`
	Page       int            `json:"page"`
	Limit      int            `json:"limit"`
	TotalPages int            `json:"totalPages"`
}

type SearchUsersRequest struct {
	Query string `json:"query"`
}

type BulkUserActionRequest struct {
	UserIDs []string `json:"userIds"`
	Action  string   `json:"action"`
	Value   string   `json:"value,omitempty"`
}