package models

type Profesor struct {
    IDProfesor int    `gorm:"primaryKey"`
    Nombre     string
    FlagSync   bool `gorm:"default:false"`
}
