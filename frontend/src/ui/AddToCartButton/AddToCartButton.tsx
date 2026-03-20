"use client";

import styles from "@/ui/AddToCartButton/AddToCartButton.module.css";
import { AddToLocalStorageCart } from "@/utils/LocalStorageManager";

export default function AddToCartButton({
	slug,
	quantity,
	price,
}: {
	slug: string;
	quantity: number;
	price: number;
}) {
	return (
		<button
			onClick={() => AddToLocalStorageCart({ slug, quantity, price })}
			className={`${styles["add-to-cart-button"]} sub-title`}
		>
			{"Add to cart"}
		</button>
	);
}
