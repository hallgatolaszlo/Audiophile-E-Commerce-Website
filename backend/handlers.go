package main

import (
	"encoding/json"
	"net/http"
)

func productsHandler(w http.ResponseWriter, r *http.Request) {

	products, err := getProducts()

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(products)
}
