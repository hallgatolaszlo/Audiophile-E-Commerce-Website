"use client";

import CartModal from "@/components/layout/CartModal";
import styles from "@/components/layout/styles/Navbar.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CategoriesSection from "../general/CategoriesSection";

export function NavLinks({
	style,
	className,
}: {
	style?: React.CSSProperties;
	className?: string;
}) {
	return (
		<div
			className={`${styles["nav-links"]} ${className || ""}`}
			style={style}
		>
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

function CartLogo({ onClick }: { onClick?: () => void }) {
	const [cartIcon, setCartIcon] = useState("/shared/desktop/icon-cart.svg");

	return (
		<Image
			onClick={onClick}
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

function MenuModal({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	if (!isOpen) return null;
	if (typeof document === "undefined") return null;

	const { view } = useMediaQueryContext();
	const maxPanelHeight =
		view === "mobile"
			? "calc(100vh - var(--navbar-height))"
			: "min(340px, calc(100vh - var(--navbar-height)))";

	return createPortal(
		<div
			onMouseDown={() => {
				onClose();
			}}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				justifyContent: "center",
				alignItems: "flex-start",
				paddingTop: "var(--navbar-height)",
				zIndex: 1000,
			}}
		>
			<div
				onMouseDown={(e) => e.stopPropagation()}
				style={{
					width: "100%",
					maxHeight: maxPanelHeight,
					backgroundColor: "var(--white)",
					borderRadius:
						"0 0 var(--border-radius) var(--border-radius)",
					overflowY: "auto",
				}}
			>
				<div
					style={{
						width: "100%",
						maxWidth: "1110px",
						margin: "0 auto",
						padding: "24px 20px",
					}}
				>
					<CategoriesSection style={{ marginTop: 0 }} />
				</div>
			</div>
		</div>,
		document.body,
	);
}

function HamburgerLogo({
	onClick,
	pressed,
}: {
	onClick?: () => void;
	pressed?: boolean;
}) {
	const [hamburgerIcon, setHamburgerIcon] = useState<"active" | "inactive">(
		"inactive",
	);

	return (
		<Image
			onClick={onClick}
			onMouseOver={() => setHamburgerIcon("active")}
			onMouseOut={() => setHamburgerIcon("inactive")}
			style={{ cursor: "pointer" }}
			src={
				hamburgerIcon === "active" || pressed
					? "/shared/tablet/icon-hamburger-active.svg"
					: "/shared/tablet/icon-hamburger.svg"
			}
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
	const [showPopup, setShowPopup] = useState(false);
	const [showCartPopup, setShowCartPopup] = useState(false);

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
					<CartLogo onClick={() => setShowCartPopup(true)} />
					<CartModal
						isOpen={showCartPopup}
						onClose={() => setShowCartPopup(false)}
					/>
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
						<MenuModal
							isOpen={showPopup}
							onClose={() => setShowPopup(false)}
						/>
						<HamburgerLogo
							pressed={showPopup}
							onClick={() => {
								if (!showPopup) setShowPopup(true);
								else setShowPopup(false);
							}}
						/>
						<AudiophileLogo />
					</div>
					<CartLogo onClick={() => setShowCartPopup(true)} />
					<CartModal
						isOpen={showCartPopup}
						onClose={() => setShowCartPopup(false)}
					/>
				</div>
			</nav>
		);
	}

	if (view == "mobile") {
		return (
			<nav className={navbarClass}>
				<div className={styles["navbar-content-container"]}>
					<MenuModal
						isOpen={showPopup}
						onClose={() => setShowPopup(false)}
					/>
					<HamburgerLogo
						pressed={showPopup}
						onClick={() => {
							if (!showPopup) setShowPopup(true);
							else setShowPopup(false);
						}}
					/>
					<AudiophileLogo />
					<CartLogo onClick={() => setShowCartPopup(true)} />
					<CartModal
						isOpen={showCartPopup}
						onClose={() => setShowCartPopup(false)}
					/>
				</div>
			</nav>
		);
	}
}
