"use client";

import { AudiophileLogo, NavLinks } from "@/components/layout/Navbar";
import styles from "@/components/layout/styles/Footer.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import Image from "next/image";
import { useState } from "react";

const DESCRIPTION_TEXT =
	"Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.";

const COPYRIGHT_TEXT = "Copyright 2021. All Rights Reserved";

function Logo({
	logoSrc,
	activeLogoSrc,
	altText = "Logo",
}: {
	logoSrc: string;
	activeLogoSrc: string;
	altText?: string;
}) {
	const [icon, setIcon] = useState(logoSrc);

	return (
		<Image
			onMouseOver={() => setIcon(activeLogoSrc)}
			onMouseOut={() => setIcon(logoSrc)}
			style={{ cursor: "pointer" }}
			src={icon}
			alt={altText}
			width={24}
			height={24}
		/>
	);
}

function Logos() {
	return (
		<div className={styles["social-logos"]}>
			<Logo
				logoSrc="/shared/desktop/icon-facebook.svg"
				activeLogoSrc="/shared/desktop/icon-facebook-active.svg"
				altText="Facebook"
			/>
			<Logo
				logoSrc="/shared/desktop/icon-twitter.svg"
				activeLogoSrc="/shared/desktop/icon-twitter-active.svg"
				altText="Twitter"
			/>
			<Logo
				logoSrc="/shared/desktop/icon-instagram.svg"
				activeLogoSrc="/shared/desktop/icon-instagram-active.svg"
				altText="Instagram"
			/>
		</div>
	);
}

export default function Footer() {
	const { view } = useMediaQueryContext();

	if (view === "desktop") {
		return (
			<footer className={`${styles.footer} ${styles["desktop-footer"]}`}>
				<div className={styles["content-container"]}>
					<div className={styles["desktop-header-row"]}>
						<div
							className={`${styles["brand-column"]} ${styles["brand-column-desktop"]}`}
						>
							<div className={styles["accent-bar"]} />
							<AudiophileLogo />
						</div>
						<NavLinks style={{ position: "relative" }} />
					</div>
					<div className={styles["desktop-body-row"]}>
						<p
							className={`${styles.description} ${styles["description-desktop"]}`}
						>
							{DESCRIPTION_TEXT}
						</p>
						<Logos />
					</div>
					<div className={styles["copyright-row-desktop"]}>
						<p className={styles.copyright}>{COPYRIGHT_TEXT}</p>
					</div>
				</div>
			</footer>
		);
	}

	if (view === "tablet") {
		return (
			<footer className={`${styles.footer} ${styles["tablet-footer"]}`}>
				<div className={styles["content-container"]}>
					<div
						className={`${styles["brand-column"]} ${styles["brand-column-tablet"]}`}
					>
						<div className={styles["accent-bar"]} />
						<AudiophileLogo />
					</div>
					<NavLinks
						style={{ position: "relative", marginTop: "32px" }}
					/>
					<p
						className={`${styles.description} ${styles["description-tablet"]}`}
					>
						{DESCRIPTION_TEXT}
					</p>
					<div className={styles["tablet-bottom-row"]}>
						<p className={styles.copyright}>{COPYRIGHT_TEXT}</p>
						<Logos />
					</div>
				</div>
			</footer>
		);
	}

	if (view === "mobile") {
		return (
			<footer className={`${styles.footer} ${styles["mobile-footer"]}`}>
				<div
					className={`${styles["content-container"]} ${styles["mobile-content-container"]}`}
				>
					<div
						className={`${styles["brand-column"]} ${styles["brand-column-mobile"]}`}
					>
						<div className={styles["accent-bar"]} />
						<AudiophileLogo />
					</div>
					<NavLinks
						style={{
							position: "relative",
							flexDirection: "column",
							gap: "16px",
						}}
					/>
					<p
						className={`${styles.description} ${styles["description-mobile"]}`}
					>
						{DESCRIPTION_TEXT}
					</p>
					<p className={styles.copyright}>{COPYRIGHT_TEXT}</p>
					<Logos />
				</div>
			</footer>
		);
	}
}
