import { api } from "@/api/api";
import { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
	try {
		const response = await api.get<Product[]>("/products");
		return response.data;
	} catch (error) {
		console.error("Error fetching products:", error);
		throw error;
	}
}

export async function getProductsByCategory(
	category: string,
): Promise<Product[]> {
	try {
		const response = await api.get<Product[]>(`/products/${category}`);
		return response.data;
	} catch (error) {
		console.error(
			`Error fetching products for category ${category}:`,
			error,
		);
		throw error;
	}
}

export async function getProductBySlug(slug: string): Promise<Product> {
	try {
		const response = await api.get<Product>(`/products/product/${slug}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching product with slug ${slug}:`, error);
		throw error;
	}
}
