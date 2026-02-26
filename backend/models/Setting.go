package models

import (
	"time"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Setting struct {
	ID        string                 `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID    string                 `gorm:"type:uuid;not null;uniqueIndex" json:"userId"`
	User      User                   `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Theme     string                 `gorm:"type:varchar(20);default:'light'" json:"theme"`
	Language  string                 `gorm:"type:varchar(10);default:'en'" json:"language"`
	Timezone  string                 `gorm:"type:varchar(50);default:'UTC'" json:"timezone"`
	Notifications datatypes.JSON     `gorm:"type:jsonb" json:"notifications"`
	Privacy   datatypes.JSON         `gorm:"type:jsonb" json:"privacy"`
	CreatedAt time.Time              `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt time.Time              `gorm:"autoUpdateTime" json:"updatedAt"`
	DeletedAt gorm.DeletedAt         `gorm:"index" json:"-"`
}

func (Setting) TableName() string {
	return "settings"
}
