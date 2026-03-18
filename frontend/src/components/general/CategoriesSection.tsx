import styles from "@/components/general/styles/CategoriesSection.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import Button3 from "@/ui/Button3/Button3";
import Image from "next/image";

function CategoryCard({
	imageSrc,
	altText,
	category,
}: {
	imageSrc: string;
	altText: string;
	category: string;
}) {
	return (
		<section className={styles["category-card"]}>
			<div className={styles["category-card-background"]}></div>
			<figure>
				<Image
					className={styles["category-image"]}
					src={imageSrc}
					alt={altText}
					width={200}
					height={200}
				/>
			</figure>
			<h6>{altText}</h6>
			<Button3 productSlug={{ category: category, slug: "" }} />
		</section>
	);
}

export default function CategoriesSection() {
	const { view } = useMediaQueryContext();

	return (
		<article
			className={styles["categories-container"]}
			style={{
				flexDirection: view == "mobile" ? "column" : "row",
			}}
		>
			<CategoryCard
				imageSrc="/shared/desktop/image-category-thumbnail-headphones.png"
				altText="Headphones"
				category="headphones"
			/>
			<CategoryCard
				imageSrc="/shared/desktop/image-category-thumbnail-speakers.png"
				altText="Speakers"
				category="speakers"
			/>
			<CategoryCard
				imageSrc="/shared/desktop/image-category-thumbnail-earphones.png"
				altText="Earphones"
				category="earphones"
			/>
		</article>
	);
}
