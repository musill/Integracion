package models

type Profeciclo struct {
    ID           int    `gorm:"primaryKey"`
    Ciclo        string
    IDProfesor   int
    IDAsignatura int
    FlagSync     bool `gorm:"default:false"`
}
