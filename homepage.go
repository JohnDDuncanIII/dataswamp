package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("starting")
	http.Handle("/", http.FileServer(http.Dir(".")))
	http.ListenAndServe(":8080", nil)
}
