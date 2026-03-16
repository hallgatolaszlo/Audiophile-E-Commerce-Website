import styles from "@/components/home/styles/ZX7HomeCard.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import Button2 from "@/ui/Button2/Button2";

export default function ZX7HomeCard() {
	const { view } = useMediaQueryContext();
	const leftPosition =
		view === "desktop" ? "95px" : view === "tablet" ? "62px" : "24px";

	return (
		<article
			className={styles["zx7-home-card"]}
			style={{
				backgroundImage: `url(/home/${view}/image-speaker-zx7.jpg)`,
			}}
		>
			<section
				className={styles["zx7-home-card-content"]}
				style={{ left: leftPosition }}
			>
				<h4>ZX7 Speaker</h4>
				<Button2 />
			</section>
		</article>
	);
}
