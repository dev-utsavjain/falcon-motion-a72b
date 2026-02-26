package views

type InviteTeamMemberRequest struct {
	Email string `json:"email"`
	Role  string `json:"role"`
}

type TeamMemberResponse struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	Role      string `json:"role"`
	Status    string `json:"status"`
	JoinedAt  string `json:"joinedAt"`
}

type TeamListResponse struct {
	Members []TeamMemberResponse `json:"members"`
	Total   int64                `json:"total"`
}
