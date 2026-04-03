"use client";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import Summary from "@/components/checkout/Summary";
import checkoutStyles from "@/components/checkout/styles/CheckoutPage.module.css";
import styles from "@/components/layout/styles/Page.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import GoBackButton from "@/ui/GoBackButton/GoBackButton";
import { Helmet } from "react-helmet-async";

// TODO: Modal for confirming order after clicking the "Continue & Pay" button

export default function CheckoutPage() {
	const { view } = useMediaQueryContext();

	return (
		<>
			<Helmet>
				<title>Checkout | audiophile</title>
			</Helmet>
			<main
				className={`${styles["page"]} ${
					view === "desktop"
						? checkoutStyles.mainDesktop
						: checkoutStyles.mainMobile
				}`}
			>
				<div
					className={`${styles["page-content"]} ${checkoutStyles.pageContent}`}
				>
					<GoBackButton
						style={{
							marginTop: view === "mobile" ? "16px" : "79px",
						}}
					/>
					<div
						className={`${checkoutStyles.layout} ${
							view === "desktop"
								? checkoutStyles.layoutRow
								: checkoutStyles.layoutColumn
						}`}
					>
						<CheckoutForm />
						<Summary />
					</div>
				</div>
			</main>
		</>
	);
}
