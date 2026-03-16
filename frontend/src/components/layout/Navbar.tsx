"use client";

import styles from "@/components/layout/styles/Navbar.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavLinks({ style }: { style?: React.CSSProperties }) {
	return (
		<div className={styles["nav-links"]} style={style}>
			<Link className={`${styles["nav-link"]} sub-title`} href="/">
				Home
			</Link>
			<Link
				className={`${styles["nav-link"]} sub-title`}
				href="/headphones"
			>
				Headphones
			</Link>
			<Link
				className={`${styles["nav-link"]} sub-title`}
				href="/speakers"
			>
				Speakers
			</Link>
			<Link
				className={`${styles["nav-link"]} sub-title`}
				href="/earphones"
			>
				Earphones
			</Link>
		</div>
	);
}

export function AudiophileLogo() {
	return (
		<figure>
			<Link style={{ display: "flex", alignItems: "center" }} href="/">
				<Image
					style={{ cursor: "pointer" }}
					src="/shared/desktop/logo.svg"
					alt="Audiophile Logo"
					width={143}
					height={25}
				/>
			</Link>
		</figure>
	);
}

function CartLogo() {
	const [cartIcon, setCartIcon] = useState("/shared/desktop/icon-cart.svg");

	return (
		<Image
			onMouseOver={() =>
				setCartIcon("/shared/desktop/icon-cart-active.svg")
			}
			onMouseOut={() => setCartIcon("/shared/desktop/icon-cart.svg")}
			style={{ cursor: "pointer" }}
			src={cartIcon}
			alt="Cart"
			width={23}
			height={20}
		/>
	);
}

function HamburgerLogo() {
	const [hamburgerIcon, setHamburgerIcon] = useState(
		"/shared/tablet/icon-hamburger.svg",
	);

	return (
		<Image
			onMouseOver={() =>
				setHamburgerIcon("/shared/tablet/icon-hamburger-active.svg")
			}
			onMouseOut={() =>
				setHamburgerIcon("/shared/tablet/icon-hamburger.svg")
			}
			style={{ cursor: "pointer" }}
			src={hamburgerIcon}
			alt="Hamburger Menu"
			width={16}
			height={15}
		/>
	);
}

export default function Navbar() {
	const { view } = useMediaQueryContext();
	const pathname = usePathname();
	const isHomePage = pathname === "/";
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const navbarClass = `${styles["navbar"]} ${
		isHomePage && !isScrolled ? styles["navbar-home-top"] : styles["navbar"]
	}`;

	if (view == "desktop") {
		return (
			<nav className={navbarClass}>
				<div className={styles["navbar-content-container"]}>
					<AudiophileLogo />
					<CartLogo />
				</div>
				<NavLinks />
			</nav>
		);
	}

	if (view == "tablet") {
		return (
			<nav className={navbarClass}>
				<div className={styles["navbar-content-container"]}>
					<div
						style={{
							display: "flex",
							gap: "32px",
							alignItems: "center",
						}}
					>
						<HamburgerLogo />
						<AudiophileLogo />
					</div>
					<CartLogo />
				</div>
			</nav>
		);
	}

	if (view == "mobile") {
		return (
			<nav className={navbarClass}>
				<div className={styles["navbar-content-container"]}>
					<HamburgerLogo />
					<AudiophileLogo />
					<CartLogo />
				</div>
			</nav>
		);
	}
}
