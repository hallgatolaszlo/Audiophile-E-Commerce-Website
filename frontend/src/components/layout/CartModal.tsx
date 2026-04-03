import { getProductBySlug } from "@/api/products";
import styles from "@/components/layout/styles/CartModal.module.css";
import Button1 from "@/ui/Button1/Button1";
import {
	ChangeLocalStorageCartItemQuantity,
	GetLocalStorageCart,
	SetLocalStorageCart,
	type CartItem,
} from "@/utils/LocalStorageManager";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NumberSelect } from "../product-page/ProductDetailsCard";

function CartModalCard({
	slug,
	initialQuantity,
	onChange,
}: {
	slug: string;
	initialQuantity: number;
	onChange?: () => void;
}) {
	const [quantity, setQuantity] = useState(initialQuantity);
	const { data, isLoading, isError } = useQuery({
		queryKey: ["product", slug],
		queryFn: async () => getProductBySlug(slug),
	});

	if (isLoading || !data) {
		return <div>Loading...</div>;
	}

	if (quantity === 0) {
		return null;
	}

	return (
		<div className={styles.card}>
			<div className={styles.cardLeft}>
				<Image
					src={`/cart/image-${data.Slug}.jpg`}
					alt={data.Name}
					width={64}
					height={64}
					className={styles.productImage}
				/>
				<div className={styles.cardText}>
					<p className={styles.productName}>{data.NameShort}</p>
					<p className={styles.productPrice}>{`$ ${data.Price}`}</p>
				</div>
			</div>
			<NumberSelect
				width={96}
				height={32}
				number={quantity}
				setNumber={(newQuantity) => {
					if (newQuantity === 0) {
						if (
							!confirm(
								"Are you sure you want to remove this item from the cart?",
							)
						) {
							return;
						}
					}

					setQuantity(newQuantity);
					ChangeLocalStorageCartItemQuantity({
						slug,
						quantity: newQuantity,
						price: data.Price,
					});
					onChange?.();
				}}
				canDelete
			/>
		</div>
	);
}

function CartModalContent({ onClose }: { onClose?: () => void }) {
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

	if (cartContent.length === 0) {
		return (
			<div className={styles.empty}>
				<h6>Your cart is empty</h6>
			</div>
		);
	}

	return (
		<div className={styles.content}>
			<div className={styles.headerRow}>
				<h6>Cart ({cartContent.length})</h6>
				<p
					onClick={() => {
						setCartContent([]);
						SetLocalStorageCart([]);
					}}
					className={styles["remove-all"]}
				>
					Remove all
				</p>
			</div>

			<div className={styles.itemsList}>
				{cartContent.map((item) => (
					<CartModalCard
						key={item.slug}
						slug={item.slug}
						initialQuantity={item.quantity}
						onChange={() => {
							setCartContent(GetLocalStorageCart());
						}}
					/>
				))}
			</div>

			<div className={styles.summary}>
				<div className={styles.totalRow}>
					<p className={styles.totalLabel}>TOTAL</p>
					<p className={styles.totalValue}>{`$ ${total}`}</p>
				</div>
				<Link
					onClick={onClose}
					className={styles.checkoutLink}
					href="/checkout"
				>
					<Button1 style={{ width: "100%" }} content="Checkout" />
				</Link>
			</div>
		</div>
	);
}

export default function CartModal({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	if (!isOpen) return null;
	if (typeof document === "undefined") return null;

	return createPortal(
		<div
			onMouseDown={() => {
				onClose();
			}}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				padding: "0 20px",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				justifyContent: "center",
				zIndex: 1000,
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					position: "relative",
					maxWidth: "1110px",
					width: "100%",
					paddingTop: "var(--navbar-height)",
				}}
			>
				<div
					onMouseDown={(e) => e.stopPropagation()}
					style={{
						position: "relative",
						top: "32px",
						maxWidth: "377px",
						width: "100%",
						maxHeight: "488px",
						height: "100%",
						backgroundColor: "var(--white)",
						padding: "30px",
						borderRadius: "var(--border-radius)",
					}}
				>
					<CartModalContent onClose={onClose} />
				</div>
			</div>
		</div>,
		document.body,
	);
}
