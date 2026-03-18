"use client";

import { getProductsByCategory } from "@/api/products";
import AboutSection from "@/components/general/AboutSection";
import CategoriesSection from "@/components/general/CategoriesSection";
import ProductCard from "@/components/general/ProductCard";
import styles from "@/components/layout/styles/Page.module.css";
import { Product } from "@/types/product";
import CategoryHeader from "@/ui/CategoryHeader/CategoryHeader";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Helmet } from "react-helmet-async";

export default function CategoryPage() {
	const { category } = useParams<{ category: string }>();

	const { data, isLoading, isError } = useQuery({
		queryKey: ["products", category],
		queryFn: async () => getProductsByCategory(category),
	});

	return (
		<>
			<Helmet>
				<title>{`${category.charAt(0).toUpperCase() + category.slice(1)} | audiophile`}</title>
			</Helmet>
			<main className={styles["page"]}>
				<div className={styles["page-content"]}>
					<CategoryHeader
						text={
							category.charAt(0).toUpperCase() + category.slice(1)
						}
					/>
					{data?.map((product: Product, index: number) => (
						<ProductCard
							reverse={index % 2 === 1}
							key={product.ID}
							product={product}
						/>
					))}
					<CategoriesSection />
					<AboutSection />
				</div>
			</main>
		</>
	);
}
