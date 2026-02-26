package handlers

import (
	"net/http"

	"backend/utils"
)

func GetTrafficAnalytics(w http.ResponseWriter, r *http.Request) {
	traffic := map[string]interface{}{
		"sources": []map[string]interface{}{
			{
				"name":  "Direct",
				"value": 4500,
				"percentage": 45,
			},
			{
				"name":  "Organic Search",
				"value": 3000,
				"percentage": 30,
			},
			{
				"name":  "Social Media",
				"value": 1500,
				"percentage": 15,
			},
			{
				"name":  "Referral",
				"value": 1000,
				"percentage": 10,
			},
		},
		"totalVisits": 10000,
		"uniqueVisitors": 7500,
		"bounceRate": 35.5,
		"avgSessionDuration": "2m 30s",
	}

	utils.SendSuccess(w, traffic)
}
