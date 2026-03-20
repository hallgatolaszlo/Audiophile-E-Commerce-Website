package main

type Product struct {
	ID          int
	Slug        string
	Name        string
	NameMedium  string
	NameShort   string
	Category    string
	Description string
	Features    string
	Price       int
	New         bool
	Included    []IncludedItem
	Related     []Product
}

type IncludedItem struct {
	ID       int
	Item     string
	Quantity int
}
