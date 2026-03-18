package main

type Product struct {
	ID          int
	Slug        string
	Name        string
	Category    string
	Description string
	Features    string
	Price       int
	New         bool
	Included    []IncludedItem
	Related     []RelatedProduct
}

type IncludedItem struct {
	ID       int
	Item     string
	Quantity int
}

type RelatedProduct struct {
	ID       int
	Slug     string
	Name     string
	Category string
}
