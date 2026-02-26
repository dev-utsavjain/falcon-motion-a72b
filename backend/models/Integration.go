package models

import (
	"time"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Integration struct {
	ID          string                 `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Name        string                 `gorm:"type:varchar(100);not null" json:"name"`
	Type        string                 `gorm:"type:varchar(50);not null" json:"type"`
	Description string                 `gorm:"type:text" json:"description"`
	Logo        string                 `gorm:"type:varchar(255)" json:"logo"`
	Status      string                 `gorm:"type:varchar(50);default:'available'" json:"status"`
	Config      datatypes.JSON         `gorm:"type:jsonb" json:"config"`
	CreatedAt   time.Time              `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt   time.Time              `gorm:"autoUpdateTime" json:"updatedAt"`
	DeletedAt   gorm.DeletedAt         `gorm:"index" json:"-"`
}

func (Integration) TableName() string {
	return "integrations"
}
