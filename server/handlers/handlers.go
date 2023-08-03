package handlers

import (
	"fiber-madcow/database"
	"fiber-madcow/models"

	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
)

var store *session.Store
var ipcheck map[string]int
var ipcheckResetted bool
var qno *database.QueueNo
var ch chan models.MdcwData

func InitDatasources() error {
	var err error
	bench := time.Now()

	// Initalize the ip checker
	ipcheckResetted = false
	ipcheck = make(map[string]int)

	//Initialize the queue counter
	qno = &database.QueueNo{}

	// Initialize the channel
	ch = make(chan models.MdcwData)

	// Start worker
	go database.Worker(ch, qno)

	if store, err = database.CreateSessions(); err != nil {
		log.Println("Failed to connect to sessions")
		return err
	}
	log.Println(bench.Sub(time.Now()))
	return nil
}

func Madcow(c *fiber.Ctx) error {
	min := time.Now().Minute()
	if !ipcheckResetted && min >= 0 && min < 5 {
		ipcheck = make(map[string]int)
		ipcheckResetted = true
	}
	if ipcheckResetted && min > 5 {
		ipcheckResetted = false
	}

	session, err := store.Get(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON("Service Problem")
	}

	// Check whether IP has made 2 requests
	ip := c.IP()
	val, ok := ipcheck[ip]
	if !ok {
		ipcheck[ip] = 2
		val = 2
	}
	if val == 0 {
		return c.Status(fiber.StatusTooManyRequests).JSON("1h ip cooldown")
	}

	// Check if the queue is already filled
	if qno.IsMaxed() {
		return c.Status(fiber.StatusServiceUnavailable).JSON("Queue is at max capacity")
	}

	// Parse data
	req := models.MdcwData{}
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON("Bad data")
	}
  // log.Print(req)
  // Check whether data is within acceptable bounds
  if err := req.Validate(); err != nil {
    // log.Print(err)
		return c.Status(fiber.StatusBadRequest).JSON("Bad input data")
  }

	req.Cookie = session.ID()
  go database.AddToQueue(ch, req, qno)
  ipcheck[ip] = val - 1

	if err := session.Save(); err != nil {
		log.Printf("Failed to save cookie %v", session)
		return fiber.ErrInternalServerError
	}

	return nil
}

func Links(c *fiber.Ctx) error {
	session, err := store.Get(c)
	if err != nil {
		return fiber.ErrInternalServerError
	}

  cookie := session.ID()

  // Check if there has been work sent by this cookie
  if session.Fresh() {
    return c.Status(fiber.StatusNotFound).JSON("No work has been sent by this cookie before")
  }
  if database.CheckNoWork(cookie) {
    return c.Status(fiber.StatusNotFound).JSON("No work has been sent by this cookie before")
  }

  // If its still on progress
  if database.InProgress(cookie) {
    return c.Status(fiber.StatusTooEarly).JSON("Still being processed")
  }

  links := database.ReturnLinkPath(cookie)
  return c.JSON(links)
}

// NotFound returns custom 404 page
func NotFound(c *fiber.Ctx) error {
	return c.Status(404).SendFile("./static/public/404.html")
}
