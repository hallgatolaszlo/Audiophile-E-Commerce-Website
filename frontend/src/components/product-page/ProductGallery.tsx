import styles from "@/components/product-page/styles/ProductGallery.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import { Product } from "@/types/product";
import Image from "next/image";

export default function ProductGallery({ product }: { product: Product }) {
	const { view } = useMediaQueryContext();
	const flexDirection = view === "mobile" ? "column" : "row";

	return (
		<article
			style={{ flexDirection }}
			className={styles["product-gallery"]}
		>
			<div className={styles["product-gallery-first-column"]}>
				<Image
					className={styles["product-gallery-image"]}
					src={`/product-${product.Slug}/${view}/image-gallery-1.jpg`}
					alt={`${product.Name} gallery image 1`}
					width={445}
					height={280}
				/>
				<Image
					className={styles["product-gallery-image"]}
					src={`/product-${product.Slug}/${view}/image-gallery-2.jpg`}
					alt={`${product.Name} gallery image 2`}
					width={445}
					height={280}
				/>
			</div>
			<div className={styles["product-gallery-second-column"]}>
				<Image
					className={styles["product-gallery-image"]}
					src={`/product-${product.Slug}/${view}/image-gallery-3.jpg`}
					alt={`${product.Name} gallery image 3`}
					width={635}
					height={592}
				/>
			</div>
		</article>
	);
}
