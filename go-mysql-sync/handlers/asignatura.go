package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go-mysql-sync/database"
	"go-mysql-sync/models"
)

// Crear asignatura (equivalente a create_asignatura)
func CreateAsignatura(c *gin.Context) {
	var input models.Asignatura
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&input)
	c.JSON(http.StatusOK, input)
}

// Obtener todas las asignaturas (equivalente a get_asignaturas)
func GetAsignaturas(c *gin.Context) {
	var asignaturas []models.Asignatura
	database.DB.Find(&asignaturas)
	c.JSON(http.StatusOK, asignaturas)
}

// Obtener asignatura por ID (equivalente a get_asignatura_by_id)
func GetAsignaturaByID(c *gin.Context) {
	id := c.Param("id")
	var asignatura models.Asignatura
	if err := database.DB.First(&asignatura, "id_asignatura = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asignatura no encontrada"})
		return
	}
	c.JSON(http.StatusOK, asignatura)
}

// Actualizar asignatura (equivalente a update_asignatura)
func UpdateAsignatura(c *gin.Context) {
	id := c.Param("id")
	var existing models.Asignatura
	if err := database.DB.First(&existing, "id_asignatura = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asignatura no encontrada"})
		return
	}

	var input models.Asignatura
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	existing.Nombre = input.Nombre
	existing.FlagSync = false
	database.DB.Save(&existing)
	c.JSON(http.StatusOK, existing)
}

// Eliminar asignatura (equivalente a delete_asignatura)
func DeleteAsignatura(c *gin.Context) {
	id := c.Param("id")
	var asignatura models.Asignatura
	if err := database.DB.First(&asignatura, "id_asignatura = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asignatura no encontrada"})
		return
	}
	database.DB.Delete(&asignatura)
	c.JSON(http.StatusOK, asignatura)
}

// Obtener asignaturas pendientes de sincronización (equivalente a get_pending_asignaturas)
func GetAsignaturasPendientes(c *gin.Context) {
	var asignaturas []models.Asignatura
	database.DB.Where("flag_sync = ?", false).Find(&asignaturas)
	c.JSON(http.StatusOK, asignaturas)
}

// Marcar asignatura como sincronizada (equivalente a update_flag_asignatura)
func UpdateFlagAsignatura(c *gin.Context) {
    id := c.Param("id")
    var asignatura models.Asignatura
    if err := database.DB.First(&asignatura, "id_asignatura = ?", id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Asignatura no encontrada"})
        return
    }
    asignatura.FlagSync = true
    database.DB.Save(&asignatura)
    c.JSON(http.StatusOK, asignatura)
}

