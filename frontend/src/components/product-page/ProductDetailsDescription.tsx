import styles from "@/components/product-page/styles/ProductDetailsDescription.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import { Product } from "@/types/product";

const GAP_DESKTOP = 125;
const GAP_TABLET = 120;
const GAP_MOBILE = 88;

export default function ProductDetailsDescription({
	product,
}: {
	product: Product;
}) {
	const features = product.Features.split("\\n\\n").map((feature, index) => (
		<p className={styles["product-features"]} key={index}>
			{feature}
		</p>
	));

	const includes = product.Included.map((item, index) => (
		<div className={styles["product-includes-item-container"]} key={index}>
			<span className={styles["product-includes-quantity"]}>
				{item.Quantity}x
			</span>
			<span className={styles["product-includes-item-name"]}>
				{item.Item}
			</span>
		</div>
	));

	const { view } = useMediaQueryContext();

	const minWidth = view === "desktop" ? "635px" : "0px";
	const productDetailsFlexDirection = view === "desktop" ? "row" : "column";
	const inTheBoxFlexDirection = view === "tablet" ? "row" : "column";
	const inTheBoxGap = view === "tablet" ? 0 : 32;
	const justifyContent = view === "tablet" ? "space-between" : "flex-start";
	const gap =
		view === "desktop"
			? GAP_DESKTOP
			: view === "tablet"
				? GAP_TABLET
				: GAP_MOBILE;

	return (
		<article
			style={{ flexDirection: productDetailsFlexDirection, gap }}
			className={styles["product-details"]}
		>
			<section
				style={{ minWidth }}
				className={styles["product-features"]}
			>
				<header>
					<h3>Features</h3>
				</header>
				{features}
			</section>
			<section
				style={{
					flexDirection: inTheBoxFlexDirection,
					gap: inTheBoxGap,
					justifyContent,
				}}
				className={styles["product-in-the-box"]}
			>
				<header>
					<h3>In the box</h3>
				</header>
				<div className={styles["product-includes-items"]}>
					{includes}
				</div>
			</section>
		</article>
	);
}
