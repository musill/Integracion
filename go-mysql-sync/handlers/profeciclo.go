package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go-mysql-sync/database"
	"go-mysql-sync/models"
)

// Crear ProfeCiclo
func CreateProfeCiclo(c *gin.Context) {
	var input models.Profeciclo
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&input)
	c.JSON(http.StatusOK, input)
}

// Obtener todos los ProfeCiclo
func GetProfeCiclos(c *gin.Context) {
	var profeciclos []models.Profeciclo
	database.DB.Find(&profeciclos)
	c.JSON(http.StatusOK, profeciclos)
}

// Obtener ProfeCiclo por ID
func GetProfeCicloByID(c *gin.Context) {
	id := c.Param("id")
	var profeciclo models.Profeciclo
	if err := database.DB.First(&profeciclo, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ProfeCiclo no encontrado"})
		return
	}
	c.JSON(http.StatusOK, profeciclo)
}

// Actualizar ProfeCiclo
func UpdateProfeCiclo(c *gin.Context) {
	id := c.Param("id")
	var existing models.Profeciclo
	if err := database.DB.First(&existing, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ProfeCiclo no encontrado"})
		return
	}

	var input models.Profeciclo
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	existing.Ciclo = input.Ciclo
	existing.IDProfesor = input.IDProfesor
	existing.IDAsignatura = input.IDAsignatura
	existing.FlagSync = false

	database.DB.Save(&existing)
	c.JSON(http.StatusOK, existing)
}

// Eliminar ProfeCiclo
func DeleteProfeCiclo(c *gin.Context) {
	id := c.Param("id")
	var profeciclo models.Profeciclo
	if err := database.DB.First(&profeciclo, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ProfeCiclo no encontrado"})
		return
	}
	database.DB.Delete(&profeciclo)
	c.JSON(http.StatusOK, profeciclo)
}

// Obtener ProfeCiclos pendientes de sincronización
func GetProfeCiclosPendientes(c *gin.Context) {
	var profeciclos []models.Profeciclo
	database.DB.Where("flag_sync = ?", false).Find(&profeciclos)
	c.JSON(http.StatusOK, profeciclos)
}

// Marcar ProfeCiclo como sincronizado
func UpdateFlagProfeCiclo(c *gin.Context) {
	id := c.Param("id")
	var profeciclo models.Profeciclo
	if err := database.DB.First(&profeciclo, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ProfeCiclo no encontrado"})
		return
	}
	profeciclo.FlagSync = true
	database.DB.Save(&profeciclo)
	c.JSON(http.StatusOK, profeciclo)
}
