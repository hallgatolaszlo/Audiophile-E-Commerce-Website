package main

type Product struct {
	ID       int
	Slug     string
	Name     string
	Included []IncludedItem
	Related  []RelatedProduct
}

type IncludedItem struct {
	ID       int
	Item     string
	Quantity int
}

type RelatedProduct struct {
	ID   int
	Slug string
	Name string
}
