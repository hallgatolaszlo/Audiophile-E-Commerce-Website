import styles from "@/components/home/styles/AboutSection.module.css";
import Image from "next/image";

export default function AboutSection() {
	return (
		<article className={styles["about-section"]}>
			<section className={styles["about-section-text"]}>
				<h2>
					Bringing you the
					<span style={{ color: "var(--raw-sienna)" }}> best </span>
					audio gear
				</h2>
				<p style={{ opacity: 0.5 }}>
					Located at the heart of New York City, Audiophile is the
					premier store for high end headphones, speakers, and audio
					accessories. We have a large collection of headphones,
					speakers and accessories. Stop by our store to meet some of
					the fantastic people who make Audiophile the best place to
					buy your portable audio equipment.
				</p>
			</section>
			<figure>
				<Image
					className={styles["about-section-image"]}
					src="/home/desktop/image-model.jpg"
					alt="Model"
					width={540}
					height={588}
				/>
			</figure>
		</article>
	);
}
