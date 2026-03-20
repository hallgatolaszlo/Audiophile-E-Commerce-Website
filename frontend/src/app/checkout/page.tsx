"use client";

import styles from "@/components/layout/styles/Page.module.css";
import { Helmet } from "react-helmet-async";

export default function CheckoutPage() {
	return (
		<>
			<Helmet>
				<title>Checkout | audiophile</title>
			</Helmet>
			<main className={styles["page"]}>
				<div className={styles["page-content"]}></div>
			</main>
		</>
	);
}
