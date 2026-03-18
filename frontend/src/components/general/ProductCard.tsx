import styles from "@/components/general/styles/ProductCard.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import { Product } from "@/types/product";
import Button1 from "@/ui/Button1/Button1";
import Image from "next/image";
import { type CSSProperties } from "react";

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
			flexDirection: "column",
			textAlign: "center",
		},
		image: {
			width: 689,
			height: 352,
			style: { width: "100%", objectFit: "cover" },
		},
		content: { maxWidth: "572px", alignItems: "center" },
	},
	mobile: {
		container: {
			height: HEIGHT_MOBILE,
			gap: GAP_MOBILE,
			flexDirection: "column",
			textAlign: "center",
		},
		image: {
			width: 327,
			height: 352,
		},
		content: { alignItems: "center" },
	},
};

function SeeProductButton({ product }: { product: Product }) {
	return (
		<Button1
			productSlug={{
				category: product.Category,
				slug: product.Slug,
			}}
		/>
	);
}

export default function ProductCard({
	product,
	reverse = false,
}: {
	product: Product;
	reverse?: boolean;
}) {
	const { view } = useMediaQueryContext();
	const viewStyles = VIEW_STYLES[view];

	const containerStyle: CSSProperties = {
		...viewStyles.container,
		flexDirection:
			view === "desktop" ? (reverse ? "row-reverse" : "row") : "column",
	};

	return (
		<article className={styles["product-card"]} style={containerStyle}>
			<figure style={{ display: "contents" }}>
				<Image
					className={styles["product-card-image"]}
					style={viewStyles.image.style}
					src={`/product-${product.Slug}/${view}/image-category-page-preview.jpg`}
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
				<SeeProductButton product={product} />
			</section>
		</article>
	);
}
