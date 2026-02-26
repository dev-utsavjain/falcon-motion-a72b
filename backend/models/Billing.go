package models

import (
	"time"
	"gorm.io/gorm"
)

type Billing struct {
	ID            string         `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID        string         `gorm:"type:uuid;not null;uniqueIndex" json:"userId"`
	CustomerID    string         `gorm:"type:varchar(255);unique" json:"customerId"`
	Plan          string         `gorm:"type:varchar(50);not null" json:"plan"`
	Status        string         `gorm:"type:varchar(50);not null" json:"status"`
	CurrentPeriod string         `gorm:"type:varchar(50)" json:"currentPeriod"`
	Amount        float64        `gorm:"type:numeric(10,2)" json:"amount"`
	Currency      string         `gorm:"type:varchar(3);default:'USD'" json:"currency"`
	CreatedAt     time.Time      `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt     time.Time      `gorm:"autoUpdateTime" json:"updatedAt"`
	DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Billing) TableName() string {
	return "billings"
}