package main

import (
	"fiber-madcow/handlers"
	"log"

	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
)

func main() {

	app := fiber.New(fiber.Config{
		JSONEncoder: json.Marshal,
		JSONDecoder: json.Unmarshal,
	})

	// Initializing Data
	if err := handlers.InitDatasources(); err != nil {
		log.Println(err)
	}

	v1 := app.Group("/api")

	v1.Post("/madcow", handlers.Madcow)
	v1.Get("/links", handlers.Links)

  app.Static("/", "./static/public")
  app.Static("/out/", "./out/")

  app.Use(handlers.NotFound)

	app.Listen(":8080")
}
