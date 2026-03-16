"use client";

import { getProductsByCategory } from "@/api/products";
import AboutSection from "@/components/general/AboutSection/AboutSection";
import CategoriesSection from "@/components/general/CategoriesSection/CategoriesSection";
import ProductCard from "@/components/general/ProductCard/ProductCard";
import styles from "@/components/layout/styles/Page.module.css";
import { Product } from "@/types/product";
import CategoryHeader from "@/ui/CategoryHeader/CategoryHeader";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

export default function Headphones() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["products", "headphones"],
		queryFn: async () => getProductsByCategory("headphones"),
	});

	return (
		<>
			<Helmet>
				<title>Headphones | audiophile</title>
			</Helmet>
			<main className={styles["page"]}>
				<div className={styles["page-content"]}>
					<CategoryHeader text="Headphones" />
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
