package main

import (
    "github.com/gin-gonic/gin"
    "go-mysql-sync/database"
    "go-mysql-sync/models"
    "go-mysql-sync/handlers"
	"github.com/gin-contrib/cors"

)

func main() {
    database.Connect()
    database.DB.AutoMigrate(&models.Estudiante{}, &models.Asignatura{}, &models.Profesor{}, &models.Profeciclo{}, &models.Matricula{})

    r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // o IP de la PC con el frontend
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

    r.POST("/estudiantes", handlers.CreateEstudiante)
	r.GET("/estudiantes", handlers.GetEstudiantes)
	r.GET("/estudiantes/:id", handlers.GetEstudianteByID)
	r.PUT("/estudiantes/:id", handlers.UpdateEstudiante)
	r.DELETE("/estudiantes/:id", handlers.DeleteEstudiante)
	r.GET("/estudiantes/pendientes", handlers.GetEstudiantesPendientes)
	r.PUT("/estudiantes/:id/sync", handlers.UpdateFlagEstudiante)


	r.POST("/asignaturas", handlers.CreateAsignatura)
	r.GET("/asignaturas", handlers.GetAsignaturas)
	r.GET("/asignaturas/:id", handlers.GetAsignaturaByID)
	r.PUT("/asignaturas/:id", handlers.UpdateAsignatura)
	r.DELETE("/asignaturas/:id", handlers.DeleteAsignatura)
	r.GET("/asignaturas/pendientes", handlers.GetAsignaturasPendientes)
	r.PUT("/asignaturas/:id/sync", handlers.UpdateFlagAsignatura)


	r.POST("/profesores", handlers.CreateProfesor)
	r.GET("/profesores", handlers.GetProfesores)
	r.GET("/profesores/:id", handlers.GetProfesorByID)
	r.PUT("/profesores/:id", handlers.UpdateProfesor)
	r.DELETE("/profesores/:id", handlers.DeleteProfesor)
	r.GET("/profesores/pendientes", handlers.GetProfesoresPendientes)
	r.PUT("/profesores/:id/sync", handlers.UpdateFlagProfesor)

	r.POST("/matricula", handlers.CreateMatricula)
	r.GET("/matricula", handlers.GetMatriculas)
	r.GET("/matricula/:id", handlers.GetMatriculaByID)
	r.PUT("/matricula/:id", handlers.UpdateMatricula)
	r.DELETE("/matricula/:id", handlers.DeleteMatricula)
	r.GET("/matricula/pendientes", handlers.GetMatriculasPendientes)
	r.PUT("/matricula/:id/sync", handlers.UpdateFlagMatricula)


	r.POST("/profeciclo", handlers.CreateProfeCiclo)
	r.GET("/profeciclo", handlers.GetProfeCiclos)
	r.GET("/profeciclo/:id", handlers.GetProfeCicloByID)
	r.PUT("/profeciclo/:id", handlers.UpdateProfeCiclo)
	r.DELETE("/profeciclo/:id", handlers.DeleteProfeCiclo)
	r.GET("/profeciclo/pendientes", handlers.GetProfeCiclosPendientes)
	r.PUT("/profeciclo/:id/sync", handlers.UpdateFlagProfeCiclo)
	

    r.Run(":8080")
}
