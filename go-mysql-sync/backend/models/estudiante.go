package models

type Estudiante struct {
    ID       string `gorm:"primaryKey"`
    Nombre   string
    FlagSync bool `gorm:"default:false"`
}
