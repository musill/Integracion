package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go-mysql-sync/database"
	"go-mysql-sync/models"
)

func CreateProfeCiclo(c *gin.Context) {
	var input models.Profeciclo
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&input)
	c.JSON(http.StatusOK, input)
}

func GetProfeCiclos(c *gin.Context) {
	var profeciclos []models.Profeciclo
	database.DB.Find(&profeciclos)
	c.JSON(http.StatusOK, profeciclos)
}

func GetProfeCicloByID(c *gin.Context) {
	id := c.Param("id")
	var profeciclo models.Profeciclo
	if err := database.DB.First(&profeciclo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ProfeCiclo no encontrado"})
		return
	}
	c.JSON(http.StatusOK, profeciclo)
}

func UpdateProfeCiclo(c *gin.Context) {
	id := c.Param("id")
	var existing models.Profeciclo
	if err := database.DB.First(&existing, id).Error; err != nil {
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

func DeleteProfeCiclo(c *gin.Context) {
	id := c.Param("id")
	var profeciclo models.Profeciclo
	if err := database.DB.First(&profeciclo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ProfeCiclo no encontrado"})
		return
	}
	database.DB.Delete(&profeciclo)
	c.JSON(http.StatusOK, profeciclo)
}

func GetProfeCiclosPendientes(c *gin.Context) {
	var profeciclos []models.Profeciclo
	database.DB.Where("flag_sync = ?", false).Find(&profeciclos)
	c.JSON(http.StatusOK, profeciclos)
}

func UpdateFlagProfeCiclo(c *gin.Context) {
	id := c.Param("id")
	var profeciclo models.Profeciclo
	if err := database.DB.First(&profeciclo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ProfeCiclo no encontrado"})
		return
	}
	profeciclo.FlagSync = true
	database.DB.Save(&profeciclo)
	c.JSON(http.StatusOK, profeciclo)
}
