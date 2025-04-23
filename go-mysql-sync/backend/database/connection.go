package database

import (
	
	"log"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"api-mysql-go/models"
)

var DB *gorm.DB

func Connect() {
	dsn := "root:1850350552@tcp(localhost:3306)/colegio?charset=utf8mb4&parseTime=True&loc=Local"

	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("No se pudo conectar a la base de datos:", err)
	}

	DB = database

	// Migración automática
	database.AutoMigrate(
		&models.Estudiante{},
		&models.Matricula{},
		&models.Profesor{},
		&models.Profeciclo{},
		&models.Asignatura{},
	)
}
