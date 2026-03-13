import styles from "@/components/home/styles/YX1HomeCard.module.css";
import Button2 from "@/ui/Button2/Button2";
import Image from "next/image";

export default function YX1HomeCard() {
	return (
		<article className={styles["yx1-home-card"]}>
			<figure>
				<Image
					className={styles["yx1-home-card-image"]}
					src="/home/desktop/image-earphones-yx1.jpg"
					alt="YX1 Earphones"
					width={540}
					height={320}
				/>
			</figure>
			<section className={styles["yx1-home-card-content"]}>
				<div className={styles["yx1-home-card-text"]}>
					<h4>YX1 Earphones</h4>
					<Button2 />
				</div>
			</section>
		</article>
	);
}
