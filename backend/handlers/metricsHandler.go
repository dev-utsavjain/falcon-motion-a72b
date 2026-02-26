package handlers

import (
	"backend/db"
	"backend/models"
	"backend/utils"
	"net/http"
	"time"
)

func GetMetrics(w http.ResponseWriter, r *http.Request) {
	var metrics []models.Metric
	if err := db.DB.Where("date >= ?", time.Now().AddDate(0, -1, 0)).Find(&metrics).Error; err != nil {
		utils.SendError(w, "Failed to fetch metrics", http.StatusInternalServerError)
		return
	}

	kpis := map[string]interface{}{
		"totalUsers":      int64(1250),
		"activeUsers":     int64(892),
		"totalRevenue":    float64(45678.90),
		"monthlyGrowth":   float64(12.5),
		"conversionRate":  float64(3.2),
		"avgSessionTime":  "4m 32s",
		"bounceRate":      float64(34.1),
		"customerSatisfaction": float64(4.7),
	}

	utils.SendSuccess(w, kpis)
}
