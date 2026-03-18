import styles from "@/components/product-page/styles/ProductDetailsCard.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import { Product } from "@/types/product";
import AddToCartButton from "@/ui/AddToCartButton/AddToCartButton";
import Image from "next/image";
import { useState, type CSSProperties } from "react";

const HEIGHT_DESKTOP = 560;
const HEIGHT_TABLET = 671;
const HEIGHT_MOBILE = 724;

const GAP_DESKTOP = 125;
const GAP_TABLET = 52;
const GAP_MOBILE = 32;

type View = "desktop" | "tablet" | "mobile";

type ProductCardViewConfig = {
	container: CSSProperties;
	image: {
		width: number;
		height: number;
		style?: CSSProperties;
	};
	content: CSSProperties;
};

const VIEW_STYLES: Record<View, ProductCardViewConfig> = {
	desktop: {
		container: {
			height: HEIGHT_DESKTOP,
			gap: GAP_DESKTOP,
			flexDirection: "row",
		},
		image: {
			width: 560,
			height: 560,
		},
		content: {},
	},
	tablet: {
		container: {
			height: HEIGHT_TABLET,
			gap: GAP_TABLET,
			flexDirection: "row",
		},
		image: {
			width: 280,
			height: 480,
			style: { width: "100%", objectFit: "cover" },
		},
		content: { maxWidth: "572px" },
	},
	mobile: {
		container: {
			height: HEIGHT_MOBILE,
			gap: GAP_MOBILE,
			flexDirection: "column",
		},
		image: {
			width: 327,
			height: 327,
		},
		content: {},
	},
};

function NumberSelect() {
	const [number, setNumber] = useState(1);

	return (
		<div className={styles["number-select"]}>
			<button
				onClick={() => setNumber(Math.max(1, number - 1))}
				className={styles["number-select-button"]}
			>
				<span style={{ opacity: 0.25 }}>-</span>
			</button>
			<span className={styles["number-select-text"]}>{number}</span>
			<button
				onClick={() => setNumber(number + 1)}
				className={styles["number-select-button"]}
			>
				<span style={{ opacity: 0.25 }}>+</span>
			</button>
		</div>
	);
}

function ProductPurchaseSection({ product }: { product: Product }) {
	return (
		<div className={styles["purchase-section"]}>
			<h6>{`$ ${product.Price.toLocaleString()}`}</h6>
			<div className={styles["add-to-cart-section"]}>
				<NumberSelect />
				<AddToCartButton slug={product.Slug} />
			</div>
		</div>
	);
}

export default function ProductDetailsCard({ product }: { product: Product }) {
	const { view } = useMediaQueryContext();
	const viewStyles = VIEW_STYLES[view];

	const containerStyle: CSSProperties = {
		...viewStyles.container,
	};

	return (
		<article className={styles["product-card"]} style={containerStyle}>
			<figure style={{ display: "contents" }}>
				<Image
					className={styles["product-card-image"]}
					style={viewStyles.image.style}
					src={`/product-${product.Slug}/${view}/image-product.jpg`}
					alt={product.Name}
					width={viewStyles.image.width}
					height={viewStyles.image.height}
				/>
			</figure>
			<section
				className={styles["product-card-content"]}
				style={viewStyles.content}
			>
				{product.New && (
					<p
						className="overline"
						style={{ color: "var(--raw-sienna)" }}
					>
						New product
					</p>
				)}
				<header style={{ display: "contents" }}>
					<h2 style={{ marginTop: "16px" }}>{product.Name}</h2>
				</header>
				<p
					style={{
						marginTop: "32px",
						marginBottom: "40px",
						opacity: 0.5,
					}}
				>
					{product.Description}
				</p>
				<ProductPurchaseSection product={product} />
			</section>
		</article>
	);
}
