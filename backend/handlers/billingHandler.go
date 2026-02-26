package handlers

import (
	"backend/utils"
	"net/http"
)

func GetBilling(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "User ID is required", http.StatusBadRequest)
		return
	}

	billingInfo := map[string]interface{}{
		"subscriptionId": "sub_123456789",
		"plan": "Pro",
		"status": "active",
		"currentPeriodStart": "2024-01-01T00:00:00Z",
		"currentPeriodEnd": "2024-01-31T23:59:59Z",
		"amount": 9900,
		"currency": "usd",
		"paymentMethod": "card_123456789",
		"nextBillingDate": "2024-02-01T00:00:00Z",
		"features": []string{
			"Unlimited users",
			"Advanced analytics",
			"Priority support",
			"Custom integrations",
		},
		"usage": map[string]interface{}{
			"users": 45,
			"usersLimit": 100,
			"apiCalls": 23456,
			"apiCallsLimit": 100000,
		},
	}

	utils.SendSuccess(w, billingInfo)
}
