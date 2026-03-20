import { getProductBySlug } from "@/api/products";
import styles from "@/components/layout/styles/CartModal.module.css";
import Button1 from "@/ui/Button1/Button1";
import { ChangeLocalStorageCartItemQuantity } from "@/utils/LocalStorageManager";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NumberSelect } from "../product-page/ProductDetailsCard";

function CartModalCard({
	slug,
	initialQuantity,
	price,
	onChange,
}: {
	slug: string;
	initialQuantity: number;
	price: number;
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
		<div
			style={{
				height: "64px",
				width: "100%",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
				<Image
					src={`/cart/image-${data.Slug}.jpg`}
					alt={data.Name}
					width={64}
					height={64}
					style={{ borderRadius: "var(--border-radius)" }}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					<p style={{ fontWeight: 700 }}>{data.NameShort}</p>
					<p
						style={{ opacity: 0.5, fontWeight: 700 }}
					>{`$ ${data.Price}`}</p>
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
						price,
					});
					onChange?.();
				}}
				canDelete
			/>
		</div>
	);
}

function CartModalContent({ onClose }: { onClose?: () => void }) {
	const [cartContent, setCartContent] = useState<
		{ slug: string; quantity: number; price: number }[]
	>(
		localStorage.getItem("cart")
			? JSON.parse(localStorage.getItem("cart")!)
			: [],
	);

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
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
				}}
			>
				<h6>Your cart is empty</h6>
			</div>
		);
	}

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<h6>Cart ({cartContent.length})</h6>
				<p className={styles["remove-all"]}>Remove all</p>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "24px",
					height: "240px",
					overflowY: "auto",
				}}
			>
				{cartContent.map((item) => (
					<CartModalCard
						key={item.slug}
						slug={item.slug}
						initialQuantity={item.quantity}
						price={item.price}
						onChange={() => {
							setCartContent(
								JSON.parse(
									localStorage.getItem("cart")
										? localStorage.getItem("cart")!
										: "[]",
								),
							);
						}}
					/>
				))}
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "24px",
				}}
			>
				<div
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					<p style={{ opacity: 0.5 }}>TOTAL</p>
					<p style={{ fontWeight: 700 }}>{`$ ${total}`}</p>
				</div>
				<Link
					onClick={onClose}
					style={{ width: "100%" }}
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
