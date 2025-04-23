package models

type Asignatura struct {
    IDAsignatura int    `gorm:"primaryKey"`
    Nombre       string
    FlagSync     bool `gorm:"default:false"`
}
