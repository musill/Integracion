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

// Obtener una asignatura por ID
func GetAsignatura(c *gin.Context) {
	id := c.Param("id")
	var asignatura models.Asignatura
	if err := database.DB.Where("id = ?", id).First(&asignatura).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asignatura no encontrada"})
		return
	}
	c.JSON(http.StatusOK, asignatura)
}

// Actualizar una asignatura por ID
func UpdateAsignatura(c *gin.Context) {
	id := c.Param("id")
	var asignatura models.Asignatura
	if err := database.DB.Where("id = ?", id).First(&asignatura).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asignatura no encontrada"})
		return
	}
	if err := c.ShouldBindJSON(&asignatura); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := database.DB.Save(&asignatura).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar asignatura"})
		return
	}
	c.JSON(http.StatusOK, asignatura)
}

// Eliminar una asignatura por ID
func DeleteAsignatura(c *gin.Context) {
	id := c.Param("id")
	if err := database.DB.Where("id = ?", id).Delete(&models.Asignatura{}).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asignatura no encontrada"})
		return
	}
	c.JSON(http.StatusNoContent, gin.H{"message": "Asignatura eliminada"})
}
