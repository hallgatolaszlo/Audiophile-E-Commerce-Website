"use client";

import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";

export default function NewProductSection() {
	const { view } = useMediaQueryContext();

	return (
		<div
			className="new-product-text-container"
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

function NewProductText() {
	const { view } = useMediaQueryContext();

	return (
		<div
			className="new-product-text"
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
				new product
			</p>
			<h1
				style={{
					color: "var(--white)",
					fontSize: view == "mobile" ? "36px" : "56px",
					lineHeight: view == "mobile" ? "40px" : "58px",
				}}
			>
				xx99 mark II headphones
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
			<button className="button-1 sub-title">see product</button>
		</div>
	);
}
