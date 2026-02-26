package models

import (
	"time"
	"gorm.io/gorm"
)

type BillingHistory struct {
	gorm.Model
	ID            string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID        string    `gorm:"type:uuid;not null;index" json:"userId"`
	Amount        float64   `gorm:"type:numeric(10,2);not null" json:"amount"`
	Currency      string    `gorm:"type:varchar(3);default:'USD'" json:"currency"`
	Description   string    `gorm:"type:text" json:"description"`
	Status        string    `gorm:"type:varchar(50);index" json:"status"`
	BillingDate   time.Time `gorm:"type:timestamp" json:"billingDate"`
}

func (BillingHistory) TableName() string {
	return "billing_histories"
}
