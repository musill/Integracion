package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"api-mysql-go/models"
	"api-mysql-go/database"
)

// Obtener todos los profesores
func GetProfesores(c *gin.Context) {
	var profesores []models.Profesor
	database.DB.Find(&profesores)
	c.JSON(http.StatusOK, profesores)
}

// Crear un nuevo profesor
func CreateProfesor(c *gin.Context) {
	var profesor models.Profesor
	if err := c.ShouldBindJSON(&profesor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&profesor)
	c.JSON(http.StatusCreated, profesor)
}
