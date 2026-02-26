package views

type TrafficAnalyticsResponse struct {
	Sources []TrafficSource `json:"sources"`
	Total   int64           `json:"total"`
}

type TrafficSource struct {
	Source string `json:"source"`
	Count  int64  `json:"count"`
	Percentage float64 `json:"percentage"`
}

type RetentionCohortResponse struct {
	Cohorts []CohortData `json:"cohorts"`
}

type CohortData struct {
	CohortDate string  `json:"cohortDate"`
	Users      int     `json:"users"`
	Retention  []int   `json:"retention"`
}

type FeatureUsageResponse struct {
	Features []FeatureUsage `json:"features"`
}

type FeatureUsage struct {
	Feature    string  `json:"feature"`
	UsageCount int64   `json:"usageCount"`
	Percentage float64 `json:"percentage"`
}

type RevenueDataResponse struct {
	Monthly []RevenueData `json:"monthly"`
	Total   float64       `json:"total"`
}

type RevenueData struct {
	Month string  `json:"month"`
	MRR   float64 `json:"mrr"`
	ARR   float64 `json:"arr"`
}
