package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"api-mysql-go/models"
	"api-mysql-go/database"
)

// Obtener todas las matriculas
func GetMatriculas(c *gin.Context) {
	var matriculas []models.Matricula
	database.DB.Find(&matriculas)
	c.JSON(http.StatusOK, matriculas)
}

// Crear una nueva matrícula
func CreateMatricula(c *gin.Context) {
	var matricula models.Matricula
	if err := c.ShouldBindJSON(&matricula); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&matricula)
	c.JSON(http.StatusCreated, matricula)
}



// Obtener una matrícula por ID
func GetMatricula(c *gin.Context) {
	id := c.Param("id")
	var matricula models.Matricula
	if err := database.DB.Where("id = ?", id).First(&matricula).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Matrícula no encontrada"})
		return
	}
	c.JSON(http.StatusOK, matricula)
}



// Actualizar una matrícula por ID
func UpdateMatricula(c *gin.Context) {
	id := c.Param("id")
	var matricula models.Matricula
	if err := database.DB.Where("id = ?", id).First(&matricula).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Matrícula no encontrada"})
		return
	}
	if err := c.ShouldBindJSON(&matricula); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := database.DB.Save(&matricula).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar matrícula"})
		return
	}
	c.JSON(http.StatusOK, matricula)
}

// Eliminar una matrícula por ID
func DeleteMatricula(c *gin.Context) {
	id := c.Param("id")
	if err := database.DB.Where("id = ?", id).Delete(&models.Matricula{}).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Matrícula no encontrada"})
		return
	}
	c.JSON(http.StatusNoContent, gin.H{"message": "Matrícula eliminada"})
}
