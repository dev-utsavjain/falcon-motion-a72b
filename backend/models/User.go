package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID                   string         `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Avatar               string         `gorm:"type:varchar(255)" json:"avatar"`
	CreatedAt            time.Time      `gorm:"autoCreateTime" json:"createdAt"`
	Email                string         `gorm:"type:varchar(255);unique;not null" json:"email"`
	EmailVerified        bool           `gorm:"default:false" json:"emailVerified"`
	LastActive           *time.Time     `gorm:"type:timestamp" json:"lastActive"`
	Name                 string         `gorm:"type:varchar(255);not null" json:"name"`
	Password             string         `gorm:"type:varchar(255)" json:"-"`
	Provider             string         `gorm:"type:varchar(50)" json:"provider"`
	ProviderID           string         `gorm:"type:varchar(255)" json:"providerId"`
	ResetPasswordExpires *time.Time     `gorm:"type:timestamp" json:"resetPasswordExpires"`
	ResetPasswordToken   string         `gorm:"type:varchar(255);index" json:"-"`
	Role                 string         `gorm:"type:varchar(50);default:'user'" json:"role"`
	Status               string         `gorm:"type:varchar(50);default:'active'" json:"status"`
	UpdatedAt            time.Time      `gorm:"autoUpdateTime" json:"updatedAt"`
	DeletedAt            gorm.DeletedAt `gorm:"index" json:"-"`
}

func (User) TableName() string {
	return "users"
}
