"use client";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import styles from "@/components/layout/styles/Page.module.css";
import GoBackButton from "@/ui/GoBackButton/GoBackButton";
import { Helmet } from "react-helmet-async";

export default function CheckoutPage() {
	return (
		<>
			<Helmet>
				<title>Checkout | audiophile</title>
			</Helmet>
			<main className={styles["page"]}>
				<div className={styles["page-content"]}>
					<GoBackButton />
					<CheckoutForm />
				</div>
			</main>
		</>
	);
}
