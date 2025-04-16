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



// Obtener un ciclo de profesor por ID
func GetProfeciclo(c *gin.Context) {
	id := c.Param("id")
	var profeciclo models.Profeciclo
	if err := database.DB.Where("id = ?", id).First(&profeciclo).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Ciclo de profesor no encontrado"})
		return
	}
	c.JSON(http.StatusOK, profeciclo)
}



// Actualizar un ciclo de profesor por ID
func UpdateProfeciclo(c *gin.Context) {
	id := c.Param("id")
	var profeciclo models.Profeciclo
	if err := database.DB.Where("id = ?", id).First(&profeciclo).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Ciclo de profesor no encontrado"})
		return
	}
	if err := c.ShouldBindJSON(&profeciclo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := database.DB.Save(&profeciclo).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar ciclo de profesor"})
		return
	}
	c.JSON(http.StatusOK, profeciclo)
}

// Eliminar un ciclo de profesor por ID
func DeleteProfeciclo(c *gin.Context) {
	id := c.Param("id")
	if err := database.DB.Where("id = ?", id).Delete(&models.Profeciclo{}).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Ciclo de profesor no encontrado"})
		return
	}
	c.JSON(http.StatusNoContent, gin.H{"message": "Ciclo de profesor eliminado"})
}
