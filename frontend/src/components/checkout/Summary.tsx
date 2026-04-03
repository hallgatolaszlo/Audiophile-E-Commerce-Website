import { getProductBySlug } from "@/api/products";
import styles from "@/components/checkout/styles/Summary.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import Button1 from "@/ui/Button1/Button1";
import {
	GetLocalStorageCart,
	type CartItem,
} from "@/utils/LocalStorageManager";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

function SummaryProduct({
	slug,
	quantity,
}: {
	slug: string;
	quantity: number;
}) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["product", slug],
		queryFn: async () => getProductBySlug(slug),
	});

	if (isLoading || !data) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.productRow}>
			<div className={styles.productRowInner}>
				<Image
					src={`/cart/image-${data.Slug}.jpg`}
					alt={data.Name}
					width={64}
					height={64}
					className={styles.productImage}
				/>
				<div className={styles.productDetails}>
					<div className={styles.productText}>
						<p className={styles.productName}>{data.NameShort}</p>
						<p
							className={styles.productPrice}
						>{`$ ${data.Price}`}</p>
					</div>
					<p className={styles.productQuantity}>{`x${quantity}`}</p>
				</div>
			</div>
		</div>
	);
}

function PriceRow({
	label,
	value,
	valueClassName,
}: {
	label: string;
	value: number;
	valueClassName?: string;
}) {
	return (
		<div className={styles.priceRow}>
			<p className={styles.priceLabel}>{label}</p>
			<h6
				className={`${styles.priceValue} ${valueClassName ?? ""}`}
			>{`$ ${value.toFixed(0)}`}</h6>
		</div>
	);
}

export default function Summary() {
	const { view } = useMediaQueryContext();
	const [cartContent, setCartContent] = useState<CartItem[]>([]);

	useEffect(() => {
		setCartContent(GetLocalStorageCart());
	}, []);

	const [total, setTotal] = useState(0);
	useEffect(() => {
		setTotal(
			cartContent.reduce(
				(total, item) => total + item.price * item.quantity,
				0,
			),
		);
	}, [cartContent]);

	return (
		<div
			className={`${styles.container} ${
				view === "desktop" ? styles.desktop : ""
			}`}
		>
			<h6>Summary</h6>
			<div className={styles.itemsList}>
				{cartContent.map((item) => (
					<SummaryProduct
						key={item.slug}
						slug={item.slug}
						quantity={item.quantity}
					/>
				))}
			</div>
			<div className={styles.totals}>
				<div className={styles.totalRows}>
					<PriceRow label="Total" value={total} />
					<PriceRow label="Shipping" value={50} />
					<PriceRow label="VAT (Included)" value={total * 0.2} />
				</div>
				<div>
					<PriceRow
						label="Grand Total"
						value={total * 1.2 + 50}
						valueClassName={styles.grandTotalValue}
					/>
				</div>
			</div>
			<Button1
				className={styles.continueButton}
				content="Continue & Pay"
			/>
		</div>
	);
}
