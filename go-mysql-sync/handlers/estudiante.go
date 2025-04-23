package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go-mysql-sync/database"
	"go-mysql-sync/models"
)

// Crear estudiante (equivalente a create_estudiante)
func CreateEstudiante(c *gin.Context) {
	var input models.Estudiante
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&input)
	c.JSON(http.StatusOK, input)
}

// Obtener todos los estudiantes (equivalente a get_estudiantes)
func GetEstudiantes(c *gin.Context) {
	var estudiantes []models.Estudiante
	database.DB.Find(&estudiantes)
	c.JSON(http.StatusOK, estudiantes)
}

// Obtener estudiante por ID (equivalente a get_estudiante_by_id)
func GetEstudianteByID(c *gin.Context) {
	id := c.Param("id")
	var est models.Estudiante
	if err := database.DB.First(&est, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Estudiante no encontrado"})
		return
	}
	c.JSON(http.StatusOK, est)
}

// Actualizar estudiante (equivalente a update_estudiante)
func UpdateEstudiante(c *gin.Context) {
	id := c.Param("id")
	var existing models.Estudiante
	if err := database.DB.First(&existing, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Estudiante no encontrado"})
		return
	}

	var input models.Estudiante
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Solo actualizar los campos enviados (imitando el dict update en Python)
	existing.Nombre = input.Nombre
	existing.FlagSync = false
	database.DB.Save(&existing)
	c.JSON(http.StatusOK, existing)
}

// Eliminar estudiante (equivalente a delete_estudiante)
func DeleteEstudiante(c *gin.Context) {
	id := c.Param("id")
	var estudiante models.Estudiante
	if err := database.DB.First(&estudiante, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Estudiante no encontrado"})
		return
	}
	database.DB.Delete(&estudiante)
	c.JSON(http.StatusOK, estudiante)
}

// Obtener estudiantes pendientes de sincronización (equivalente a get_pending_estudiantes)
func GetEstudiantesPendientes(c *gin.Context) {
	var estudiantes []models.Estudiante
	database.DB.Where("flag_sync = ?", false).Find(&estudiantes)
	c.JSON(http.StatusOK, estudiantes)
}

// Marcar estudiante como sincronizado (equivalente a update_flag_estudiante)
func UpdateFlagEstudiante(c *gin.Context) {
	id := c.Param("id")
	var est models.Estudiante
	if err := database.DB.First(&est, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Estudiante no encontrado"})
		return
	}
	est.FlagSync = true
	database.DB.Save(&est)
	c.JSON(http.StatusOK, est)
}
