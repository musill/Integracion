package models

type Estudiante struct {
	ID     string `gorm:"primaryKey" json:"id"`
	Nombre string `json:"nombre"`
}

type Asignatura struct {
	ID     uint   `gorm:"primaryKey" json:"id"`
	Nombre string `json:"nombre"`
}

type Profesor struct {
	ID     uint   `gorm:"primaryKey" json:"id"`
	Nombre string `json:"nombre"`
}

type Profeciclo struct {
	ID           uint   `gorm:"primaryKey" json:"id"`
	Ciclo        string `json:"ciclo"`
	ProfesorID   uint   `json:"profesor_id"`
	AsignaturaID uint   `json:"asignatura_id"`
}

type Matricula struct {
	EstudianteID string  `json:"estudiante_id"`
	AsignaturaID uint    `json:"asignatura_id"`
	CicloID      uint    `json:"ciclo_id"`
	NotaUno      float64 `json:"nota_uno"`
	NotaDos      float64 `json:"nota_dos"`
	Supletorio   float64 `json:"supletorio"`
}
