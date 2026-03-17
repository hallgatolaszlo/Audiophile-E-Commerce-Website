import styles from "@/ui/Button2/Button2.module.css";
import Link from "next/link";

export default function Button2({
	content,
	productSlug,
}: {
	content?: string;
	productSlug: { category: string; slug: string };
}) {
	return (
		<Link href={`/${productSlug.category}/${productSlug.slug}`}>
			<button className={`${styles["button-2"]} sub-title`}>
				{content || "See Product"}
			</button>
		</Link>
	);
}
