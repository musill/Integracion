package models

type Estudiante struct {
	ID     string `gorm:"primaryKey" json:"id"`
	Nombre string `json:"nombre"`
	FlagSync     bool    `json:"flag_sync"`
}

type Asignatura struct {
	ID     uint   `gorm:"primaryKey" json:"id"`
	Nombre string `json:"nombre"`
	FlagSync     bool    `json:"flag_sync"`
}

type Profesor struct {
	ID     uint   `gorm:"primaryKey" json:"id"`
	Nombre string `json:"nombre"`
	FlagSync     bool    `json:"flag_sync"`
}

type Profeciclo struct {
	ID           uint   `gorm:"primaryKey" json:"id"`
	Ciclo        string `json:"ciclo"`
	ProfesorID   uint   `json:"profesor_id"`
	AsignaturaID uint   `json:"asignatura_id"`
	FlagSync     bool    `json:"flag_sync"`
}

type Matricula struct {
	EstudianteID string  `json:"estudiante_id"`
	AsignaturaID uint    `json:"asignatura_id"`
	CicloID      uint    `json:"ciclo_id"`
	NotaUno      float64 `json:"nota_uno"`
	NotaDos      float64 `json:"nota_dos"`
	Supletorio   float64 `json:"supletorio"`
	
}
