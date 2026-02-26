package models

import (
	"time"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Activity struct {
	ID          string                 `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	CreatedAt   time.Time              `gorm:"autoCreateTime" json:"createdAt"`
	Description string                 `gorm:"type:text" json:"description"`
	Metadata    datatypes.JSON         `gorm:"type:jsonb" json:"metadata"`
	Type        string                 `gorm:"type:varchar(50);not null;index" json:"type"`
	UserID      string                 `gorm:"type:uuid;not null;index" json:"userId"`
	User        User                   `gorm:"foreignKey:UserID" json:"user,omitempty"`
	UpdatedAt   time.Time              `gorm:"autoUpdateTime" json:"updatedAt"`
	DeletedAt   gorm.DeletedAt         `gorm:"index" json:"-"`
}

func (Activity) TableName() string {
	return "activities"
}
