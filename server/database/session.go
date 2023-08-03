package database

import (
	"github.com/gofiber/fiber/v2/middleware/session"
	"time"
)

// In minutes
const COOKIE_LIFESPAN = 20

func CreateSessions() (*session.Store, error) {

	store := session.New(session.Config{
		//Storage:    storage,
		Expiration: COOKIE_LIFESPAN * time.Minute,
		KeyLookup:  "cookie:mcw-cookie",
	})

	return store, nil
}
