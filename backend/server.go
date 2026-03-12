package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	connectToDB()
	router := mux.NewRouter()
	router.HandleFunc("/products", productsHandler).Methods("GET")

	log.Fatal(http.ListenAndServe(":8080", router))
}
