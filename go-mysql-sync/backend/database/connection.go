package database

import (
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
    "log"
)

var DB *gorm.DB

func Connect() {
    dsn := "root:1850350552@tcp(127.0.0.1:3306)/colegio?charset=utf8mb4&parseTime=True&loc=Local"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Error al conectar a la base de datos:", err)
    }
    DB = db
}
