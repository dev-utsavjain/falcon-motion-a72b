package models

import (
	"time"
	"gorm.io/gorm"
)

type TeamMember struct {
	gorm.Model
	ID        string    `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Email     string    `gorm:"type:varchar(255);not null;uniqueIndex" json:"email"`
	Name      string    `gorm:"type:varchar(255)" json:"name"`
	Role      string    `gorm:"type:varchar(50);not null" json:"role"`
	Status    string    `gorm:"type:varchar(50);default:'invited'" json:"status"`
	InvitedAt time.Time `gorm:"type:timestamp" json:"invitedAt"`
	JoinedAt  time.Time `gorm:"type:timestamp" json:"joinedAt"`
	InvitedBy string    `gorm:"type:uuid" json:"invitedBy"`
}

func (TeamMember) TableName() string {
	return "team_members"
}
