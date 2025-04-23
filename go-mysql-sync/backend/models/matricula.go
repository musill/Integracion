package models

type Matricula struct {
    ID           int     `gorm:"primaryKey"`
    IDEstudiante string
    IDAsignatura int
    IDCiclo      int
    NotaUno      float64
    NotaDos      float64
    Supletorio   float64
    FlagSync     bool `gorm:"default:false"`
}
