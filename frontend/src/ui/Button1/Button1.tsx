"use client";

import styles from "@/ui/Button1/Button1.module.css";
import Link from "next/link";

export default function Button1({
	content,
	productSlug,
	style,
	className,
}: {
	content?: string;
	productSlug?: { category: string; slug: string };
	style?: React.CSSProperties;
	className?: string;
}) {
	if (!productSlug) {
		return (
			<button
				className={`${styles["button-1"]} sub-title ${className ?? ""}`}
				style={style}
			>
				{content || "See product"}
			</button>
		);
	}

	return (
		<Link href={`/${productSlug.category}/${productSlug.slug}`}>
			<button
				className={`${styles["button-1"]} sub-title ${className ?? ""}`}
				style={style}
			>
				{content || "See product"}
			</button>
		</Link>
	);
}
