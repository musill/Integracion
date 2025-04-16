package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"api-mysql-go/models"
	"api-mysql-go/database"
)

// Obtener todos los profesores
func GetProfesores(c *gin.Context) {
	var profesores []models.Profesor
	database.DB.Find(&profesores)
	c.JSON(http.StatusOK, profesores)
}

// Crear un nuevo profesor
func CreateProfesor(c *gin.Context) {
	var profesor models.Profesor
	if err := c.ShouldBindJSON(&profesor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&profesor)
	c.JSON(http.StatusCreated, profesor)
}



// Obtener un profesor por ID
func GetProfesor(c *gin.Context) {
	id := c.Param("id")
	var profesor models.Profesor
	if err := database.DB.Where("id = ?", id).First(&profesor).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profesor no encontrado"})
		return
	}
	c.JSON(http.StatusOK, profesor)
}


// Actualizar un profesor por ID
func UpdateProfesor(c *gin.Context) {
	id := c.Param("id")
	var profesor models.Profesor
	if err := database.DB.Where("id = ?", id).First(&profesor).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profesor no encontrado"})
		return
	}
	if err := c.ShouldBindJSON(&profesor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := database.DB.Save(&profesor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar profesor"})
		return
	}
	c.JSON(http.StatusOK, profesor)
}

// Eliminar un profesor por ID
func DeleteProfesor(c *gin.Context) {
	id := c.Param("id")
	if err := database.DB.Where("id = ?", id).Delete(&models.Profesor{}).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profesor no encontrado"})
		return
	}
	c.JSON(http.StatusNoContent, gin.H{"message": "Profesor eliminado"})
}
