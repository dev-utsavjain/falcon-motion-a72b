package models

import (
	"time"

	"gorm.io/gorm"
)

type Subscription struct {
	ID        string         `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	EndDate   *time.Time     `gorm:"type:date" json:"endDate"`
	MRR       float64        `gorm:"type:numeric(10,2)" json:"mrr"`
	Plan      string         `gorm:"type:varchar(50);not null" json:"plan"`
	StartDate *time.Time     `gorm:"type:date" json:"startDate"`
	Status    string         `gorm:"type:varchar(50);not null" json:"status"`
	UserID    string         `gorm:"type:uuid;not null;index" json:"userId"`
	User      User           `gorm:"foreignKey:UserID" json:"user,omitempty"`
	CreatedAt time.Time      `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime" json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Subscription) TableName() string {
	return "subscriptions"
}
