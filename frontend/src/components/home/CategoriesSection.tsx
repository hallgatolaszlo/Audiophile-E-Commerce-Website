import styles from "@/components/home/styles/CategoriesSection.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import Button3 from "@/ui/Button3/Button3";
import Image from "next/image";

function CategoryCard({
	imageSrc,
	altText,
}: {
	imageSrc: string;
	altText: string;
}) {
	const { view } = useMediaQueryContext();

	return (
		<article className={styles["category-card"]}>
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
			<Button3 />
		</article>
	);
}

export default function CategoriesSection() {
	const { view } = useMediaQueryContext();

	return (
		<div
			className={styles["categories-container"]}
			style={{
				flexDirection: view == "mobile" ? "column" : "row",
			}}
		>
			<CategoryCard
				imageSrc="/shared/desktop/image-category-thumbnail-headphones.png"
				altText="Headphones"
			/>
			<CategoryCard
				imageSrc="/shared/desktop/image-category-thumbnail-speakers.png"
				altText="Speakers"
			/>
			<CategoryCard
				imageSrc="/shared/desktop/image-category-thumbnail-earphones.png"
				altText="Earphones"
			/>
		</div>
	);
}
