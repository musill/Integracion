package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"api-mysql-go/models"
	"api-mysql-go/database"
)

// Obtener todos los ciclos de profesores
func GetProfeciclos(c *gin.Context) {
	var profeciclos []models.Profeciclo
	database.DB.Find(&profeciclos)
	c.JSON(http.StatusOK, profeciclos)
}

// Crear un nuevo ciclo para profesor
func CreateProfeciclo(c *gin.Context) {
	var profeciclo models.Profeciclo
	if err := c.ShouldBindJSON(&profeciclo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&profeciclo)
	c.JSON(http.StatusCreated, profeciclo)
}
