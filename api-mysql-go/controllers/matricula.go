package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"api-mysql-go/models"
	"api-mysql-go/database"
)

// Obtener todas las matriculas
func GetMatriculas(c *gin.Context) {
	var matriculas []models.Matricula
	database.DB.Find(&matriculas)
	c.JSON(http.StatusOK, matriculas)
}

// Crear una nueva matrícula
func CreateMatricula(c *gin.Context) {
	var matricula models.Matricula
	if err := c.ShouldBindJSON(&matricula); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&matricula)
	c.JSON(http.StatusCreated, matricula)
}
