import styles from "@/ui/Button3/Button3.module.css";
import Image from "next/image";

export default function Button3({ content }: { content?: string }) {
	return (
		<button className={`${styles["button-3"]} sub-title`}>
			<span className={styles["button-3-text"]}>{content || "Shop"}</span>
			<Image
				className={styles["arrow-right"]}
				src="/shared/desktop/icon-arrow-right.svg"
				alt="Right Arrow"
				width={8}
				height={12}
			/>
		</button>
	);
}
