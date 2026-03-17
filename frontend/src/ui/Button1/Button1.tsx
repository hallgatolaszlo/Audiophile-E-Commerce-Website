"use client";

import styles from "@/ui/Button1/Button1.module.css";
import Link from "next/link";

export default function Button1({
	content,
	productSlug,
}: {
	content?: string;
	productSlug: { category: string; slug: string };
}) {
	return (
		<Link href={`/${productSlug.category}/${productSlug.slug}`}>
			<button className={`${styles["button-1"]} sub-title`}>
				{content || "See product"}
			</button>
		</Link>
	);
}
