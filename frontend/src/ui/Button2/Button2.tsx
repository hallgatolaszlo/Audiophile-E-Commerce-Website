import styles from "@/ui/Button2/Button2.module.css";

export default function Button2({ content }: { content?: string }) {
	return (
		<button className={`${styles["button-2"]} sub-title`}>
			{content || "See Product"}
		</button>
	);
}
