package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"api-mysql-go/models"
	"api-mysql-go/database"
)

// Obtener todos los estudiantes
func GetEstudiantes(c *gin.Context) {
	var estudiantes []models.Estudiante
	database.DB.Find(&estudiantes)
	c.JSON(http.StatusOK, estudiantes)
}

// Obtener un estudiante por ID
func GetEstudiante(c *gin.Context) {
	id := c.Param("id")
	var estudiante models.Estudiante
	if err := database.DB.Where("id = ?", id).First(&estudiante).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Estudiante no encontrado"})
		return
	}
	c.JSON(http.StatusOK, estudiante)
}

// Crear un nuevo estudiante
func CreateEstudiante(c *gin.Context) {
	var estudiante models.Estudiante
	if err := c.ShouldBindJSON(&estudiante); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&estudiante)
	c.JSON(http.StatusCreated, estudiante)
}

// Actualizar un estudiante por ID
func UpdateEstudiante(c *gin.Context) {
	id := c.Param("id")
	var estudiante models.Estudiante
	if err := database.DB.Where("id = ?", id).First(&estudiante).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Estudiante no encontrado"})
		return
	}
	if err := c.ShouldBindJSON(&estudiante); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := database.DB.Save(&estudiante).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar estudiante"})
		return
	}
	c.JSON(http.StatusOK, estudiante)
}

// Eliminar un estudiante por ID
func DeleteEstudiante(c *gin.Context) {
	id := c.Param("id")
	if err := database.DB.Where("id = ?", id).Delete(&models.Estudiante{}).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Estudiante no encontrado"})
		return
	}
	c.JSON(http.StatusNoContent, gin.H{"message": "Estudiante eliminado"})
}
