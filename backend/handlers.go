package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
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

func productsByCategoryHandler(w http.ResponseWriter, r *http.Request) {
	category := mux.Vars(r)["category"]

	products, err := getProductsByCategory(category)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(products)
}

func productBySlugHandler(w http.ResponseWriter, r *http.Request) {
	slug := mux.Vars(r)["slug"]

	product, err := getProductBySlug(slug)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(product)
}
