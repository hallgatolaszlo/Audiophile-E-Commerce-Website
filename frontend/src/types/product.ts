export type IncluedItem = {
	id: number;
	item: string;
	quantity: number;
};

export type RelatedProduct = {
	id: number;
	slug: string;
	name: string;
};

export type Product = {
	id: number;
	slug: string;
	name: string;
	included: IncluedItem[];
	related: RelatedProduct[];
};
