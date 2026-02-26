package models

import (
	"time"

	"gorm.io/gorm"
)

type Metric struct {
	ID        string         `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Date      time.Time      `gorm:"type:date;not null;index" json:"date"`
	Name      string         `gorm:"type:varchar(100);not null;index" json:"name"`
	Trend     string         `gorm:"type:varchar(10)" json:"trend"`
	Value     float64        `gorm:"type:numeric(10,2);not null" json:"value"`
	CreatedAt time.Time      `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime" json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Metric) TableName() string {
	return "metrics"
}
