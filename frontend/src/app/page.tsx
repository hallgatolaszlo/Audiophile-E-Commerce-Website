"use client";

import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import { Helmet } from "react-helmet-async";
import NewProductSection from "./_components/NewProductSection";

export default function Home() {
	const { view } = useMediaQueryContext();
	const heroImageSrc =
		view == "desktop"
			? `/home/${view}/image-hero.jpg`
			: `/home/${view}/image-header.jpg`;

	return (
		<>
			<Helmet>
				<title>Home | audiophile</title>
			</Helmet>
			<div
				style={{
					padding: "0 20px",
					width: "100%",
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<img
					className="new-product-image"
					style={{
						height: view == "mobile" ? "600px" : "729px",
					}}
					src={heroImageSrc}
					alt="Hero Image"
				/>
				<div
					style={{
						width: "100%",
						maxWidth: "1110px",
						paddingTop: "var(--navbar-height)",
					}}
				>
					<NewProductSection />
					<div
						style={{
							marginTop: "120px",
							display: "flex",
							flexDirection: view == "mobile" ? "column" : "row",
							gap: "20px",
							width: "100%",
							height: "fit-content",
							flexWrap: "wrap",
						}}
					>
						<div
							style={{
								flex: 1,
								flexBasis: 0,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								height: "100%",
							}}
						>
							<img
								src="/shared/desktop/image-category-thumbnail-headphones.png"
								alt="Headphones"
								style={{
									maxHeight: "200px",
									height: "100%",
								}}
							/>
							<h6>Headphones</h6>

							<button className="button-3 sub-title">
								<span className="button-3-text">Shop</span>
								<span className="right-arrow">{">"}</span>
							</button>
						</div>
						<div
							style={{
								flex: 1,
								height: "100%",
								flexBasis: 0,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<img
								src="/shared/desktop/image-category-thumbnail-speakers.png"
								alt="Speakers"
								style={{
									maxHeight: "200px",
									height: "100%",
								}}
							/>
							<h6>Speakers</h6>
							<button className="button-3 sub-title">
								<span className="button-3-text">Shop</span>
								<span className="right-arrow">{">"}</span>
							</button>
						</div>
						<div
							style={{
								flex: 1,
								flexBasis: 0,
								height: "100%",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<img
								src="/shared/desktop/image-category-thumbnail-earphones.png"
								alt="Earphones"
								style={{
									maxHeight: "200px",
									height: "100%",
								}}
							/>
							<h6>Earphones</h6>
							<button className="button-3 sub-title">
								<span className="button-3-text">Shop</span>
								<span className="right-arrow">{">"}</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
