package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"os"
)

type User struct {
	FirstName string
	LastName string
	Sex string
	Age int
	Attr []bool
}

var templates = template.Must(template.ParseFiles("tmpl/attrs.html"))

func handleFunc (path string, fn func(http.ResponseWriter, *http.Request, string)) {
	lenPath := len(path)
	handler := func(w http.ResponseWriter, r *http.Request) {
		title := r.URL.Path[lenPath:]
		/*if !titleValidator.MatchString(title) {
			http.NotFound(w, r)
			return
		}*/
		fn(w, r, title)
	}

	http.HandleFunc(path, handler)
}

func saveHandler(w http.ResponseWriter, r *http.Request) {
	j := r.FormValue("json")
	if len(j) > 0 {

		if _, err := os.Stat("data"); os.IsNotExist(err) {
			os.Mkdir("data", 0644)
		}

		err := ioutil.WriteFile("data/users.json", []byte(j), 0644)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

	}

	http.Redirect(w, r, "/load/", http.StatusFound)
}

func loadHandler(w http.ResponseWriter, r *http.Request) {
	var users []User

	j, err := ioutil.ReadFile("data/users.json")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	err = json.Unmarshal([]byte(j), &users)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	fmt.Println(users)

	http.Redirect(w, r, "/", http.StatusFound)
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	var output bytes.Buffer
	err := templates.ExecuteTemplate(&output, "attrs.html", nil)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	w.Write(output.Bytes())
}

func main() {
	// start the server
	fmt.Println("starting")
	// dynamic content
	http.HandleFunc("/", rootHandler)
	http.HandleFunc("/save/", saveHandler)
	http.HandleFunc("/load/", loadHandler)
	// static content
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
	http.Handle("/data/", http.StripPrefix("/data/", http.FileServer(http.Dir("data"))))
	http.ListenAndServe(":8080", nil)
}
