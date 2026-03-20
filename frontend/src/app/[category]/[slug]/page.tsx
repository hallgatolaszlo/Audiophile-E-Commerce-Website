"use client";

import { getProductBySlug } from "@/api/products";
import AboutSection from "@/components/general/AboutSection";
import CategoriesSection from "@/components/general/CategoriesSection";
import styles from "@/components/layout/styles/Page.module.css";
import ProductDetailsCard from "@/components/product-page/ProductDetailsCard";
import ProductDetailsDescription from "@/components/product-page/ProductDetailsDescription";
import ProductGallery from "@/components/product-page/ProductGallery";
import RelatedProducts from "@/components/product-page/RelatedProducts";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "next/error";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Helmet } from "react-helmet-async";

export default function ProductPage() {
	const { category, slug } = useParams<{ category: string; slug: string }>();

	const { data, isLoading, isError } = useQuery({
		queryKey: ["product", slug],
		queryFn: async () => getProductBySlug(slug),
	});

	if (isError) {
		return <ErrorPage statusCode={404} />;
	}

	if (isLoading || !data) {
		return (
			<main className={styles["page"]}>
				<div className={styles["page-content"]}></div>
			</main>
		);
	}

	return (
		<>
			<Helmet>
				<title>{`${data.Name || ""} | audiophile`}</title>
			</Helmet>
			<main className={styles["page"]}>
				<div className={styles["page-content"]}>
					<Link
						style={{
							textDecoration: "none",
							display: "block",
							marginTop: "79px",
						}}
						href={`/${category}`}
					>
						<span
							style={{
								color: "var(--black)",
								opacity: 0.5,
							}}
						>
							Go Back
						</span>
					</Link>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<ProductDetailsCard product={data} />
						<ProductDetailsDescription product={data} />
						<ProductGallery product={data} />
						<RelatedProducts product={data} />
						<CategoriesSection />
						<AboutSection />
					</div>
				</div>
			</main>
		</>
	);
}
