package routes

import (
	"github.com/gin-gonic/gin"
	"api-mysql-go/controllers"
)

func SetupRoutes(r *gin.Engine) {
	// Rutas de estudiantes
	r.GET("/estudiantes", controllers.GetEstudiantes)
	r.POST("/estudiantes", controllers.CreateEstudiante)

	// Rutas de asignaturas
	r.GET("/asignaturas", controllers.GetAsignaturas)
	r.POST("/asignaturas", controllers.CreateAsignatura)

	// Rutas de profesores
	r.GET("/profesores", controllers.GetProfesores)
	r.POST("/profesores", controllers.CreateProfesor)

	// Rutas de ciclos de profesores
	r.GET("/profeciclos", controllers.GetProfeciclos)
	r.POST("/profeciclos", controllers.CreateProfeciclo)

	// Rutas de matriculas
	r.GET("/matriculas", controllers.GetMatriculas)
	r.POST("/matriculas", controllers.CreateMatricula)
}
