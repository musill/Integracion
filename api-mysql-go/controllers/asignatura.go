package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"api-mysql-go/models"
	"api-mysql-go/database"
)

// Obtener todas las asignaturas
func GetAsignaturas(c *gin.Context) {
	var asignaturas []models.Asignatura
	database.DB.Find(&asignaturas)
	c.JSON(http.StatusOK, asignaturas)
}

// Crear una nueva asignatura
func CreateAsignatura(c *gin.Context) {
	var asignatura models.Asignatura
	if err := c.ShouldBindJSON(&asignatura); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&asignatura)
	c.JSON(http.StatusCreated, asignatura)
}
