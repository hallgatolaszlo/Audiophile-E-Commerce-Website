import styles from "@/ui/Button4/Button4.module.css";
import Link from "next/link";

export default function Button4({
	content,
	productSlug,
}: {
	content?: string;
	productSlug: { category: string; slug: string };
}) {
	return (
		<Link href={`/${productSlug.category}/${productSlug.slug}`}>
			<button className={`${styles["button-4"]} sub-title`}>
				{content || "See Product"}
			</button>
		</Link>
	);
}
