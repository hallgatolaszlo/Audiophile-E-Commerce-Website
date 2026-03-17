"use client";

import { getProductBySlug } from "@/api/products";
import ProductCard from "@/components/general/ProductCard/ProductCard";
import styles from "@/components/layout/styles/Page.module.css";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "next/error";
import { useParams } from "next/navigation";
import { Helmet } from "react-helmet-async";

export default function ProductPage() {
	const { category, slug } = useParams<{ category: string; slug: string }>();

	const { data, isLoading, isError } = useQuery({
		queryKey: ["product", slug],
		queryFn: async () => getProductBySlug(`/${category}/${slug}`),
	});

	if (isError) {
		return <ErrorPage statusCode={404} />;
	}

	if (isLoading || !data) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Helmet>
				<title>{`${data?.Name || ""} | audiophile`}</title>
			</Helmet>
			<main className={styles["page"]}>
				<div className={styles["page-content"]}>
					<ProductCard product={data!} isPurchaseSection={true} />
				</div>
			</main>
		</>
	);
}
