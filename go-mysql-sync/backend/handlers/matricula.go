package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go-mysql-sync/database"
	"go-mysql-sync/models"
)

// Crear matrícula
func CreateMatricula(c *gin.Context) {
	var input models.Matricula
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&input)
	c.JSON(http.StatusOK, input)
}

// Obtener todas las matrículas
func GetMatriculas(c *gin.Context) {
	var matriculas []models.Matricula
	database.DB.Find(&matriculas)
	c.JSON(http.StatusOK, matriculas)
}

// Obtener matrícula por ID
func GetMatriculaByID(c *gin.Context) {
	id := c.Param("id")
	var matricula models.Matricula
	if err := database.DB.First(&matricula, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Matrícula no encontrada"})
		return
	}
	c.JSON(http.StatusOK, matricula)
}

// Actualizar matrícula
func UpdateMatricula(c *gin.Context) {
	id := c.Param("id")
	var existing models.Matricula
	if err := database.DB.First(&existing, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Matrícula no encontrada"})
		return
	}

	var input models.Matricula
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	existing.IDEstudiante = input.IDEstudiante
	existing.IDAsignatura = input.IDAsignatura
	existing.IDCiclo = input.IDCiclo
	existing.NotaUno = input.NotaUno
	existing.NotaDos = input.NotaDos
	existing.Supletorio = input.Supletorio
	existing.FlagSync = false

	database.DB.Save(&existing)
	c.JSON(http.StatusOK, existing)
}

// Eliminar matrícula
func DeleteMatricula(c *gin.Context) {
	id := c.Param("id")
	var matricula models.Matricula
	if err := database.DB.First(&matricula, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Matrícula no encontrada"})
		return
	}
	database.DB.Delete(&matricula)
	c.JSON(http.StatusOK, matricula)
}

// Obtener matrículas pendientes de sincronización
func GetMatriculasPendientes(c *gin.Context) {
	var matriculas []models.Matricula
	database.DB.Where("flag_sync = ?", false).Find(&matriculas)
	c.JSON(http.StatusOK, matriculas)
}

// Marcar matrícula como sincronizada
func UpdateFlagMatricula(c *gin.Context) {
	id := c.Param("id")
	var matricula models.Matricula
	if err := database.DB.First(&matricula, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Matrícula no encontrada"})
		return
	}
	matricula.FlagSync = true
	database.DB.Save(&matricula)
	c.JSON(http.StatusOK, matricula)
}
