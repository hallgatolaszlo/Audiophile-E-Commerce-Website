import { getProductBySlug } from "@/api/products";
import CheckoutModal from "@/components/checkout/CheckoutModal";
import styles from "@/components/checkout/styles/Summary.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import Button1 from "@/ui/Button1/Button1";
import {
	GetLocalStorageCart,
	type CartItem,
} from "@/utils/LocalStorageManager";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CART_CHANGE_EVENT = "cart-change";

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
		<div className={styles["product-row"]}>
			<div className={styles["product-row-inner"]}>
				<Image
					src={`/cart/image-${data.Slug}.jpg`}
					alt={data.Name}
					width={64}
					height={64}
					className={styles["product-image"]}
				/>
				<div className={styles["product-details"]}>
					<div className={styles["product-text"]}>
						<p className={styles["product-name"]}>
							{data.NameShort}
						</p>
						<p
							className={styles["product-price"]}
						>{`$ ${data.Price}`}</p>
					</div>
					<p
						className={styles["product-quantity"]}
					>{`x${quantity}`}</p>
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
		<div className={styles["price-row"]}>
			<p className={styles["price-label"]}>{label}</p>
			<h6
				className={`${styles["price-value"]} ${valueClassName ?? ""}`}
			>{`$ ${value.toFixed(0)}`}</h6>
		</div>
	);
}

function CheckoutModalContent({
	cartContent,
	grandTotal,
}: {
	cartContent: CartItem[];
	grandTotal: number;
}) {
	const [showMore, setShowMore] = useState(false);
	const { view } = useMediaQueryContext();

	return (
		<div>
			<Image
				src="/checkout/icon-order-confirmation.svg"
				alt="Order Confirmation"
				width={64}
				height={64}
				className={styles["modal-icon"]}
			/>
			<h3 className={styles["modal-title"]}>
				Thank you
				<br /> for your order
			</h3>
			<p className={styles["modal-description"]}>
				You will receive an email confirmation shortly.
			</p>
			<div
				className={`${styles["modal-summary"]} ${
					view === "mobile" ? styles["modal-summary-mobile"] : ""
				}`}
			>
				<div className={styles["modal-summary-items"]}>
					{cartContent
						.slice(0, showMore ? cartContent.length : 1)
						.map((item) => (
							<SummaryProduct
								key={item.slug}
								slug={item.slug}
								quantity={item.quantity}
							/>
						))}
					<span className={styles["modal-summary-divider"]} />
					<p
						className={styles["view-more"]}
						onClick={() => setShowMore(!showMore)}
					>
						{showMore
							? "View less"
							: `and ${cartContent.length - 1} other item(s)`}
					</p>
				</div>
				<div
					className={`${styles["modal-summary-total"]} ${
						showMore ? styles["modal-summary-total-expanded"] : ""
					}`}
				>
					<p className={styles["modal-summary-total-label"]}>
						Grand total
					</p>
					<h6
						className={styles["modal-summary-total-value"]}
					>{`$ ${grandTotal.toFixed(0)}`}</h6>
				</div>
			</div>
			<Link href="/" className={styles["back-home-link"]}>
				<Button1
					className={styles["back-home-button"]}
					content="Back to home"
				/>
			</Link>
		</div>
	);
}

export default function Summary() {
	const { view } = useMediaQueryContext();
	const [cartContent, setCartContent] = useState<CartItem[]>([]);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		const refreshCart = () => {
			setCartContent(GetLocalStorageCart());
		};

		refreshCart();
		window.addEventListener(CART_CHANGE_EVENT, refreshCart);
		window.addEventListener("storage", refreshCart);

		return () => {
			window.removeEventListener(CART_CHANGE_EVENT, refreshCart);
			window.removeEventListener("storage", refreshCart);
		};
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
			className={`${styles["container"]} ${
				view === "desktop" ? styles["desktop"] : ""
			}`}
		>
			<h6>Summary</h6>
			<div className={styles["items-list"]}>
				{cartContent.map((item) => (
					<SummaryProduct
						key={item.slug}
						slug={item.slug}
						quantity={item.quantity}
					/>
				))}
			</div>
			<div className={styles["totals"]}>
				<div className={styles["total-rows"]}>
					<PriceRow label="Total" value={total} />
					<PriceRow label="Shipping" value={50} />
					<PriceRow label="VAT (Included)" value={total * 0.2} />
				</div>
				<div>
					<PriceRow
						label="Grand Total"
						value={total * 1.2 + 50}
						valueClassName={styles["grand-total-value"]}
					/>
				</div>
			</div>
			<Button1
				className={styles["continue-button"]}
				content="Continue & Pay"
				onClick={() => setModalOpen(true)}
			/>
			<CheckoutModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				content={
					<CheckoutModalContent
						cartContent={cartContent}
						grandTotal={total * 1.2 + 50}
					/>
				}
			/>
		</div>
	);
}
