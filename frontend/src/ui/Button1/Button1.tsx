import styles from "@/ui/Button1/Button1.module.css";

export default function Button1({ content }: { content?: string }) {
	return (
		<button className={`${styles["button-1"]} sub-title`}>
			{content || "See product"}
		</button>
	);
}
