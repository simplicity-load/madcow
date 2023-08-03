package database

import (
	"errors"
	"fiber-madcow/models"
	"io/fs"
	"log"
	"os"
	"os/exec"
	"sync"

	"github.com/goccy/go-json"
)

const TMP_DIR string = "out/"

func AddToQueue(ch chan models.MdcwData, d models.MdcwData, q *QueueNo) {
	q.inc()
	setUpEnv(d)
	ch <- d
}

func Worker(ch chan models.MdcwData, q *QueueNo) {
	for i := range ch {
		// Generate the pdf and the png
		exec.Command("/bin/sh", "./generator.sh", TMP_DIR, i.Cookie+"/").Run()
		// After finishing create an empty DONE file
		f, _ := os.Create(TMP_DIR + i.Cookie + "/DONE")
		f.Close()

		q.dec()
	}
}

func setUpEnv(d models.MdcwData) {
  cki_dir := d.Cookie + "/"
	// Create output dir
	os.MkdirAll(TMP_DIR + cki_dir, 0755)
	// Create input.json file
	j, _ := json.Marshal(d)
	os.WriteFile(TMP_DIR + cki_dir + "input.json", j, 0644)
}

// True if there is no work
func CheckNoWork(cookie string) bool {
	_, err := os.Stat(TMP_DIR + cookie)
	return os.IsNotExist(err)
}

// True if work isnt done
func InProgress(cookie string) bool {
	_, err := os.Stat(TMP_DIR + cookie + "/DONE")
	return errors.Is(err, fs.ErrNotExist)
}

// If has not finished
func ReturnLinkPath(cookie string) map[string]string {
	return map[string]string{
		"pdf": TMP_DIR + cookie + "/output.pdf",
		"png": TMP_DIR + cookie + "/output.png",
	}
}

type QueueNo struct {
	no int
	mu sync.Mutex
}

func (q *QueueNo) IsMaxed() bool {
	q.mu.Lock()
	defer q.mu.Unlock()
	log.Println("Queue number:", q.no)
	return q.no == 100
}

func (q *QueueNo) inc() {
	q.mu.Lock()
	defer q.mu.Unlock()
	q.no = q.no + 1
}

func (q *QueueNo) dec() {
	q.mu.Lock()
	defer q.mu.Unlock()
	q.no = q.no - 1
}
