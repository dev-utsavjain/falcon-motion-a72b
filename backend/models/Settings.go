package models

import (
	"gorm.io/datatypes"
)

type Settings struct {
	ID            string              `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID        string              `gorm:"type:uuid;not null;uniqueIndex" json:"userId"`
	Theme         string              `gorm:"type:varchar(50);default:'light'" json:"theme"`
	Notifications datatypes.JSON      `gorm:"type:jsonb" json:"notifications"`
}

type NotificationSettings struct {
	Email bool `json:"email"`
	Push  bool `json:"push"`
}

func (Settings) TableName() string {
	return "settings"
}
