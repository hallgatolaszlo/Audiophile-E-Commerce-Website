"use client";

import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import Link from "next/link";
import { useState } from "react";

function NavLinks() {
	return (
		<div className="nav-links">
			<Link className="nav-link sub-title" href="/">
				Home
			</Link>
			<Link className="nav-link sub-title" href="/headphones">
				Headphones
			</Link>
			<Link className="nav-link sub-title" href="/speakers">
				Speakers
			</Link>
			<Link className="nav-link sub-title" href="/earphones">
				Earphones
			</Link>
		</div>
	);
}

function AudiophileLogo() {
	return (
		<figure>
			<Link style={{ display: "flex", alignItems: "center" }} href="/">
				<img
					style={{ cursor: "pointer" }}
					src="/shared/desktop/logo.svg"
					alt="Audiophile Logo"
				/>
			</Link>
		</figure>
	);
}

function CartLogo() {
	const [cartIcon, setCartIcon] = useState("/shared/desktop/icon-cart.svg");

	return (
		<img
			onMouseOver={() =>
				setCartIcon("/shared/desktop/icon-cart-active.svg")
			}
			onMouseOut={() => setCartIcon("/shared/desktop/icon-cart.svg")}
			style={{ cursor: "pointer" }}
			src={cartIcon}
			alt="Cart"
		/>
	);
}

function HamburgerLogo() {
	const [hamburgerIcon, setHamburgerIcon] = useState(
		"/shared/tablet/icon-hamburger.svg",
	);

	return (
		<img
			onMouseOver={() =>
				setHamburgerIcon("/shared/tablet/icon-hamburger-active.svg")
			}
			onMouseOut={() =>
				setHamburgerIcon("/shared/tablet/icon-hamburger.svg")
			}
			style={{ cursor: "pointer" }}
			src={hamburgerIcon}
			alt="Hamburger Menu"
		/>
	);
}

export default function Navbar() {
	const { view } = useMediaQueryContext();

	if (view == "desktop") {
		return (
			<nav className="navbar">
				<div className="navbar-content-container">
					<AudiophileLogo />
					<CartLogo />
				</div>
				<NavLinks />
			</nav>
		);
	}

	if (view == "tablet") {
		return (
			<nav className="navbar">
				<div className="navbar-content-container">
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
			<nav className="navbar">
				<div className="navbar-content-container">
					<HamburgerLogo />
					<AudiophileLogo />
					<CartLogo />
				</div>
			</nav>
		);
	}
}
