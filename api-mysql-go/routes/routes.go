package routes

import (
	"github.com/gin-gonic/gin"
	"api-mysql-go/controllers"
)

func SetupRoutes(r *gin.Engine) {
	// Rutas de estudiantes
	r.GET("/estudiantes", controllers.GetEstudiantes)
	r.GET("/estudiantes/:id", controllers.GetEstudiante)  // Nuevo endpoint para obtener estudiante por ID
	r.POST("/estudiantes", controllers.CreateEstudiante)
	r.PUT("/estudiantes/:id", controllers.UpdateEstudiante)  // Nuevo endpoint para actualizar estudiante por ID
	r.DELETE("/estudiantes/:id", controllers.DeleteEstudiante)  // Nuevo endpoint para eliminar estudiante por ID

	// Rutas de asignaturas
	r.GET("/asignaturas", controllers.GetAsignaturas)
	r.GET("/asignaturas/:id", controllers.GetAsignatura)  // Nuevo endpoint para obtener asignatura por ID
	r.POST("/asignaturas", controllers.CreateAsignatura)
	r.PUT("/asignaturas/:id", controllers.UpdateAsignatura)  // Nuevo endpoint para actualizar asignatura por ID
	r.DELETE("/asignaturas/:id", controllers.DeleteAsignatura)  // Nuevo endpoint para eliminar asignatura por ID

	// Rutas de profesores
	r.GET("/profesores", controllers.GetProfesores)
	r.GET("/profesores/:id", controllers.GetProfesor)  // Nuevo endpoint para obtener profesor por ID
	r.POST("/profesores", controllers.CreateProfesor)
	r.PUT("/profesores/:id", controllers.UpdateProfesor)  // Nuevo endpoint para actualizar profesor por ID
	r.DELETE("/profesores/:id", controllers.DeleteProfesor)  // Nuevo endpoint para eliminar profesor por ID

	// Rutas de ciclos de profesores
	r.GET("/profeciclo", controllers.GetProfeciclos)
	r.GET("/profeciclo/:id", controllers.GetProfeciclo)  // Nuevo endpoint para obtener profeciclo por ID
	r.POST("/profeciclo", controllers.CreateProfeciclo)
	r.PUT("/profeciclo/:id", controllers.UpdateProfeciclo)  // Nuevo endpoint para actualizar profeciclo por ID
	r.DELETE("/profeciclo/:id", controllers.DeleteProfeciclo)  // Nuevo endpoint para eliminar profeciclo por ID

	// Rutas de matriculas
	r.GET("/matricula", controllers.GetMatriculas)
	r.GET("/matricula/:id", controllers.GetMatricula)  // Nuevo endpoint para obtener matrícula por ID
	r.POST("/matricula", controllers.CreateMatricula)
	r.PUT("/matricula/:id", controllers.UpdateMatricula)  // Nuevo endpoint para actualizar matrícula por ID
	r.DELETE("/matricula/:id", controllers.DeleteMatricula)  // Nuevo endpoint para eliminar matrícula por ID
}
