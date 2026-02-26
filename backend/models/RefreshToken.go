package models

import (
	"time"

	"gorm.io/gorm"
)

type RefreshToken struct {
	ID        string         `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	ExpiresAt time.Time      `gorm:"type:timestamp;not null" json:"expiresAt"`
	Token     string         `gorm:"type:varchar(255);unique;not null;index" json:"token"`
	UserID    string         `gorm:"type:uuid;not null;index" json:"userId"`
	User      User           `gorm:"foreignKey:UserID" json:"user,omitempty"`
	CreatedAt time.Time      `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime" json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (RefreshToken) TableName() string {
	return "refresh_tokens"
}
