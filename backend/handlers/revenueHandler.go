package handlers

import (
	"backend/db"
	"backend/models"
	"backend/utils"
	"backend/views"
	"net/http"
	"time"
)

func GetRevenue(w http.ResponseWriter, r *http.Request) {
	var subscriptions []models.Subscription
	if err := db.DB.Where("status = ?", "active").Find(&subscriptions).Error; err != nil {
		utils.SendError(w, "Failed to fetch revenue data", http.StatusInternalServerError)
		return
	}

	monthlyData := make(map[string]float64)
	for _, sub := range subscriptions {
		if sub.StartDate != nil {
			month := sub.StartDate.Format("2006-01")
			monthlyData[month] += sub.MRR
		}
	}

	revenueData := make([]views.RevenueData, 0, len(monthlyData))
	for month, mrr := range monthlyData {
		revenueData = append(revenueData, views.RevenueData{
			Month: month,
			MRR:   mrr,
			ARR:   mrr * 12,
		})
	}

	var total float64
	for _, mrr := range monthlyData {
		total += mrr
	}

	response := views.RevenueDataResponse{
		Monthly: revenueData,
		Total:   total,
	}

	utils.SendSuccess(w, response)
}
