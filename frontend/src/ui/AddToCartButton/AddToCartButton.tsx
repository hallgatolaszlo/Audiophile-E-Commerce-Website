"use client";

import styles from "@/ui/AddToCartButton/AddToCartButton.module.css";

function AddToLocalStorageCart({ slug }: { slug: string }) {}

export default function AddToCartButton({ slug }: { slug: string }) {
	return (
		<button
			onClick={() => {}}
			className={`${styles["add-to-cart-button"]} sub-title`}
		>
			{"Add to cart"}
		</button>
	);
}
