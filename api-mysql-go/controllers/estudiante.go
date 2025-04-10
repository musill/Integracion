package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"api-mysql-go/models"
	"api-mysql-go/database"
)

func GetEstudiantes(c *gin.Context) {
	var estudiantes []models.Estudiante
	database.DB.Find(&estudiantes)
	c.JSON(http.StatusOK, estudiantes)
}

func CreateEstudiante(c *gin.Context) {
	var estudiante models.Estudiante
	if err := c.ShouldBindJSON(&estudiante); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&estudiante)
	c.JSON(http.StatusCreated, estudiante)
}
