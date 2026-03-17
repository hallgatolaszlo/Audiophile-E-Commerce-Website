import styles from "@/ui/Button3/Button3.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Button3({
	content,
	productSlug,
}: {
	content?: string;
	productSlug: { category: string; slug: string };
}) {
	return (
		<Link href={`/${productSlug.category}/${productSlug.slug}`}>
			<button className={`${styles["button-3"]} sub-title`}>
				<span className={styles["button-3-text"]}>
					{content || "Shop"}
				</span>
				<Image
					className={styles["arrow-right"]}
					src="/shared/desktop/icon-arrow-right.svg"
					alt="Right Arrow"
					width={8}
					height={12}
				/>
			</button>
		</Link>
	);
}
