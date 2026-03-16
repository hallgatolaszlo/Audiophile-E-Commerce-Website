import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import styles from "@/ui/CategoryHeader/CategoryHeader.module.css";

export default function CategoryHeader({ text }: { text: string }) {
	const { view } = useMediaQueryContext();

	return (
		<>
			<div className={styles["category-header-container"]}></div>
			<header className={styles["category-header"]}>
				{view === "mobile" ? <h4>{text}</h4> : <h2>{text}</h2>}
			</header>
		</>
	);
}
