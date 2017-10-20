package main

import (
	"fmt"
	"net/http"
	"github.com/nytimes/gziphandler"
)

func main() {
	fmt.Println("starting")
	http.Handle("/", gzip(http.FileServer(http.Dir("."))))
	http.ListenAndServe(":8080", nil)
}

func gzip(h http.Handler) http.Handler {
	return gziphandler.GzipHandler(h)
}
