export type IncludedItem = {
	ID: number;
	Item: string;
	Quantity: number;
};

export type RelatedProduct = {
	ID: number;
	Slug: string;
	Name: string;
	Category: string;
};

export type Product = {
	ID: number;
	Slug: string;
	Name: string;
	Category: string;
	New: boolean;
	Price: number;
	Description: string;
	Features: string;
	Included: IncludedItem[];
	Related: RelatedProduct[];
};
