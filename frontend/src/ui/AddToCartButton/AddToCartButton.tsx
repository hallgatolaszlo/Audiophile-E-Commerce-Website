"use client";

import styles from "@/ui/AddToCartButton/AddToCartButton.module.css";

function AddToLocalStorageCart({
	slug,
	quantity,
}: {
	slug: string;
	quantity: number;
}) {
	const localStorageCart = localStorage.getItem("cart");
	const cartItems: { slug: string; quantity: number }[] = localStorageCart
		? JSON.parse(localStorageCart)
		: [];
	if (!cartItems.some((item) => item.slug === slug)) {
		cartItems.push({ slug: slug, quantity: quantity });
		localStorage.setItem("cart", JSON.stringify(cartItems));
	} else {
		const updatedCartItems = cartItems.map((item) =>
			item.slug === slug
				? { ...item, quantity: item.quantity + quantity }
				: item,
		);
		localStorage.setItem("cart", JSON.stringify(updatedCartItems));
	}
}

export default function AddToCartButton({
	slug,
	quantity,
}: {
	slug: string;
	quantity: number;
}) {
	return (
		<button
			onClick={() => AddToLocalStorageCart({ slug, quantity })}
			className={`${styles["add-to-cart-button"]} sub-title`}
		>
			{"Add to cart"}
		</button>
	);
}
