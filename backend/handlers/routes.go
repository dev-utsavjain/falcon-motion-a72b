package handlers

import "net/http"

// RegisterRoutes registers all generated API routes
func RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /api/metrics", GetMetrics)
	mux.HandleFunc("GET /api/revenue", GetRevenue)
	mux.HandleFunc("GET /api/users", GetUsers)
	mux.HandleFunc("PUT /api/users/{id}", UpdateUser)
	mux.HandleFunc("GET /api/analytics/traffic", GetTrafficAnalytics)
	mux.HandleFunc("GET /api/analytics/retention", GetRetentionCohorts)
	mux.HandleFunc("GET /api/analytics/features", GetFeatureUsage)
	mux.HandleFunc("GET /api/notifications", GetNotifications)
	mux.HandleFunc("GET /api/settings", GetSettings)
	mux.HandleFunc("PUT /api/settings", UpdateSettings)
	mux.HandleFunc("GET /api/billing", GetBilling)
	mux.HandleFunc("GET /api/team", GetTeamMembers)
	mux.HandleFunc("GET /api/integrations", GetIntegrations)
	mux.HandleFunc("GET /api/auth/me", GetMe)
}
