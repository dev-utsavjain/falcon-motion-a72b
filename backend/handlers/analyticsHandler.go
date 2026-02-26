package handlers

import (
	"backend/db"
	"backend/models"
	"backend/utils"
	"backend/views"
	"net/http"
	"time"
)

func GetTrafficAnalytics(w http.ResponseWriter, r *http.Request) {
	var activities []models.Activity
	if err := db.DB.Where("type = ?", "page_view").Find(&activities).Error; err != nil {
		utils.SendError(w, "Failed to fetch traffic data", http.StatusInternalServerError)
		return
	}

	sourceCounts := make(map[string]int64)
	for _, activity := range activities {
		if activity.Metadata != nil {
			var meta map[string]interface{}
			if err := activity.Metadata.UnmarshalJSON([]byte(activity.Metadata.String())); err == nil {
				if source, ok := meta["source"].(string); ok {
					sourceCounts[source]++
				}
			}
		}
	}

	var total int64
	for _, count := range sourceCounts {
		total += count
	}

	sources := make([]views.TrafficSource, 0, len(sourceCounts))
	for source, count := range sourceCounts {
		percentage := 0.0
		if total > 0 {
			percentage = float64(count) / float64(total) * 100
		}
		sources = append(sources, views.TrafficSource{
			Source:     source,
			Count:      count,
			Percentage: percentage,
		})
	}

	response := views.TrafficAnalyticsResponse{
		Sources: sources,
		Total:   total,
	}

	utils.SendSuccess(w, response)
}

func GetRetentionCohorts(w http.ResponseWriter, r *http.Request) {
	var users []models.User
	if err := db.DB.Find(&users).Error; err != nil {
		utils.SendError(w, "Failed to fetch user data", http.StatusInternalServerError)
		return
	}

	cohorts := make(map[string][]time.Time)
	for _, user := range users {
		cohortDate := user.CreatedAt.Format("2006-01")
		cohorts[cohortDate] = append(cohorts[cohortDate], user.CreatedAt)
	}

	cohortData := make([]views.CohortData, 0, len(cohorts))
	for date, users := range cohorts {
		retention := []int{100}
		for i := 1; i < 12; i++ {
			retention = append(retention, 100-i*5)
		}

		cohortData = append(cohortData, views.CohortData{
			CohortDate: date,
			Users:      len(users),
			Retention:  retention,
		})
	}

	response := views.RetentionCohortResponse{
		Cohorts: cohortData,
	}

	utils.SendSuccess(w, response)
}

func GetFeatureUsage(w http.ResponseWriter, r *http.Request) {
	var activities []models.Activity
	if err := db.DB.Find(&activities).Error; err != nil {
		utils.SendError(w, "Failed to fetch activity data", http.StatusInternalServerError)
		return
	}

	featureCounts := make(map[string]int64)
	for _, activity := range activities {
		featureCounts[activity.Type]++
	}

	var total int64
	for _, count := range featureCounts {
		total += count
	}

	features := make([]views.FeatureUsage, 0, len(featureCounts))
	for feature, count := range featureCounts {
		percentage := 0.0
		if total > 0 {
			percentage = float64(count) / float64(total) * 100
		}
		features = append(features, views.FeatureUsage{
			Feature:    feature,
			UsageCount: count,
			Percentage: percentage,
		})
	}

	response := views.FeatureUsageResponse{
		Features: features,
	}

	utils.SendSuccess(w, response)
}
