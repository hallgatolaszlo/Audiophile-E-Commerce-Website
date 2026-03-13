"use client";

import styles from "@/components/home/styles/NewProductSection.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import Button1 from "@/ui/Button1/Button1";
import Image from "next/image";

export function NewProductSection() {
	const { view } = useMediaQueryContext();

	return (
		<div
			className={styles["new-product-text-container"]}
			style={{
				height:
					view == "mobile"
						? "calc(600px - var(--navbar-height))"
						: "calc(729px - var(--navbar-height))",
				justifyContent: view == "desktop" ? "flex-start" : "center",
			}}
		>
			<NewProductText />
		</div>
	);
}

export function NewProductImage() {
	const { view } = useMediaQueryContext();
	const heroImageSrc =
		view == "desktop"
			? `/home/${view}/image-hero.jpg`
			: `/home/${view}/image-header.jpg`;

	return (
		<figure className={styles["new-product-image-container"]}>
			<Image
				className={styles["new-product-image"]}
				style={{
					height: view == "mobile" ? "600px" : "729px",
				}}
				src={heroImageSrc}
				alt="Hero Image"
				width={1440}
				height={729}
			/>
		</figure>
	);
}

function NewProductText() {
	const { view } = useMediaQueryContext();

	return (
		<article
			className={styles["new-product-text"]}
			style={{
				alignItems: view == "desktop" ? "flex-start" : "center",
			}}
		>
			<p
				className="overline"
				style={{
					color: "var(--white)",
					opacity: "49.64%",
				}}
			>
				New product
			</p>
			<h1
				style={{
					color: "var(--white)",
					fontSize: view == "mobile" ? "36px" : "56px",
					lineHeight: view == "mobile" ? "40px" : "58px",
				}}
			>
				XX99 mark II headphones
			</h1>
			<p
				style={{
					color: "var(--white)",
					opacity: "75%",
				}}
			>
				Experience natural, lifelike audio and exceptional build quality
				made for the passionate music enthusiast.
			</p>
			<Button1 />
		</article>
	);
}
