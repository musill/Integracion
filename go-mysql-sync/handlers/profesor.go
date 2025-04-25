package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go-mysql-sync/database"
	"go-mysql-sync/models"
)

// Crear profesor (equivalente a create_profesor)
func CreateProfesor(c *gin.Context) {
	var input models.Profesor
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&input)
	c.JSON(http.StatusOK, input)
}

// Obtener todos los profesores (equivalente a get_profesores)
func GetProfesores(c *gin.Context) {
	var profesores []models.Profesor
	database.DB.Find(&profesores)
	c.JSON(http.StatusOK, profesores)
}

// Obtener profesor por ID (equivalente a get_profesor_by_id)
func GetProfesorByID(c *gin.Context) {
	id := c.Param("id")
	var profesor models.Profesor
	if err := database.DB.First(&profesor, "id_profesor = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profesor no encontrado"})
		return
	}
	c.JSON(http.StatusOK, profesor)
}

// Actualizar profesor (equivalente a update_profesor)
func UpdateProfesor(c *gin.Context) {
	id := c.Param("id")
	var existing models.Profesor
	if err := database.DB.First(&existing, "id_profesor = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profesor no encontrado"})
		return
	}

	var input models.Profesor
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	existing.Nombre = input.Nombre
	existing.FlagSync = false
	database.DB.Save(&existing)
	c.JSON(http.StatusOK, existing)
}

// Eliminar profesor (equivalente a delete_profesor)
func DeleteProfesor(c *gin.Context) {
	id := c.Param("id")
	var profesor models.Profesor
	if err := database.DB.First(&profesor, "id_profesor = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profesor no encontrado"})
		return
	}
	database.DB.Delete(&profesor)
	c.JSON(http.StatusOK, profesor)
}

// Obtener profesores pendientes de sincronización (equivalente a get_pending_profesores)
func GetProfesoresPendientes(c *gin.Context) {
	var profesores []models.Profesor
	database.DB.Where("flag_sync = ?", false).Find(&profesores)
	c.JSON(http.StatusOK, profesores)
}

// Marcar profesor como sincronizado (equivalente a update_flag_profesor)
func UpdateFlagProfesor(c *gin.Context) {
	id := c.Param("id")
	var profesor models.Profesor
	if err := database.DB.First(&profesor, "id_profesor = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profesor no encontrado"})
		return
	}
	profesor.FlagSync = true
	database.DB.Save(&profesor)
	c.JSON(http.StatusOK, profesor)
}
