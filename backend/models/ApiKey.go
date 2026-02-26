package models

import (
	"time"

	"gorm.io/gorm"
)

type ApiKey struct {
	ID        string         `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Key       string         `gorm:"type:varchar(255);unique;not null" json:"key"`
	Name      string         `gorm:"type:varchar(100);not null" json:"name"`
	UserID    string         `gorm:"type:uuid;not null;index" json:"userId"`
	User      User           `gorm:"foreignKey:UserID" json:"user,omitempty"`
	LastUsed  *time.Time     `gorm:"type:timestamp" json:"lastUsed"`
	ExpiresAt *time.Time     `gorm:"type:timestamp" json:"expiresAt"`
	CreatedAt time.Time      `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime" json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (ApiKey) TableName() string {
	return "api_keys"
}
