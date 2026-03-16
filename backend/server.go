package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func withCORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
        w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

        if r.Method == http.MethodOptions {
            w.WriteHeader(http.StatusNoContent)
            return
        }

        next.ServeHTTP(w, r)
    })
}

func main() {
	connectToDB()
	router := mux.NewRouter()
	router.HandleFunc("/products", productsHandler).Methods("GET")
	router.HandleFunc("/products/category/{category}", productsByCategoryHandler).Methods("GET")

	log.Fatal(http.ListenAndServe(":8080", withCORS(router)))
}
