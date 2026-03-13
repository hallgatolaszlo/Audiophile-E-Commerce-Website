import styles from "@/ui/Button4/Button4.module.css";

export default function Button4({ content }: { content?: string }) {
	return (
		<button className={`${styles["button-4"]} sub-title`}>
			{content || "See Product"}
		</button>
	);
}
