import styles from "@/components/home/styles/ZX9HomeCard.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import Button4 from "@/ui/Button4/Button4";
import Image from "next/image";

const CONTENT = {
	desktop: {
		imageSrc: "/home/desktop/image-speaker-zx9.png",
		imageWidth: 375,
		imageHeight: 450,
		circlesWidth: 944,
		circlesHeight: 944,
	},
	tablet: {
		imageSrc: "/home/tablet/image-speaker-zx9.png",
		imageWidth: 197,
		imageHeight: 237,
		circlesWidth: 944,
		circlesHeight: 944,
	},
	mobile: {
		imageSrc: "/home/mobile/image-speaker-zx9.png",
		imageWidth: 172,
		imageHeight: 207,
		circlesWidth: 558,
		circlesHeight: 558,
	},
};

function ZX9Card({ view }: { view: string }) {
	const content = CONTENT[view as keyof typeof CONTENT];

	return (
		<article
			className={`${styles["zx9-home-card"]} ${styles[`zx9-${view}`]}`}
		>
			<figure>
				<Image
					src={content.imageSrc}
					alt="ZX9 Speaker"
					className={styles["zx9-home-card-image"]}
					width={content.imageWidth}
					height={content.imageHeight}
				/>
			</figure>
			<Image
				src="/home/desktop/pattern-circles.svg"
				alt="circles"
				className={styles["zx9-home-card-circles"]}
				width={content.circlesWidth}
				height={content.circlesHeight}
			/>
			<section className={styles["zx9-home-card-content"]}>
				<h1>ZX9 Speaker</h1>
				<p>
					Upgrade to premium speakers that are phenomenally built to
					deliver truly remarkable sound.
				</p>
				<Button4 />
			</section>
		</article>
	);
}

export default function ZX9HomeCard() {
	const { view } = useMediaQueryContext();

	return (
		<>
			<ZX9Card view={view} />
			<div className={styles["zx9-home-card-bottom-spacer"]}></div>
		</>
	);
}
