package main

import (
	"github.com/gin-gonic/gin"
	"api-mysql-go/database"
	"api-mysql-go/routes"
)

func main() {
	r := gin.Default()
	database.Connect() // Conectar a la base de datos MySQL
	routes.SetupRoutes(r) // Configurar las rutas
	r.Run(":8080") // Ejecutar el servidor en el puerto 8080
}
