import styles from "@/components/product-page/styles/RelatedProducts.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import { Product } from "@/types/product";
import Button1 from "@/ui/Button1/Button1";
import Image from "next/image";

function RelatedProductCard({
	slug,
	name,
	category,
}: {
	slug: string;
	name: string;
	category: string;
}) {
	const { view } = useMediaQueryContext();

	return (
		<section className={styles["related-product"]}>
			<figure>
				<Image
					className={styles["related-product-image"]}
					src={`/shared/${view}/image-${slug}.jpg`}
					alt={name}
					width={350}
					height={318}
				/>
			</figure>
			<h5>{name.replace("Headphones", "")}</h5>
			<Button1 productSlug={{ category: category, slug: slug }} />
		</section>
	);
}

export default function RelatedProducts({ product }: { product: Product }) {
	const { view } = useMediaQueryContext();
	const flexDirection = view === "mobile" ? "column" : "row";

	return (
		<article className={styles["related-products-container"]}>
			<header>
				<h3>You may also like</h3>
			</header>
			<div
				style={{ flexDirection }}
				className={styles["related-products"]}
			>
				{product.Related.map((relatedProduct) => (
					<RelatedProductCard
						key={relatedProduct.Slug}
						slug={relatedProduct.Slug}
						name={relatedProduct.Name}
						category={relatedProduct.Category}
					/>
				))}
			</div>
		</article>
	);
}
