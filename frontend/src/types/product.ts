export type IncludedItem = {
	ID: number;
	Item: string;
	Quantity: number;
};

export type Product = {
	ID: number;
	Slug: string;
	Name: string;
	NameMedium: string;
	NameShort: string;
	Category: string;
	New: boolean;
	Price: number;
	Description: string;
	Features: string;
	Included: IncludedItem[];
	Related: Product[];
};
