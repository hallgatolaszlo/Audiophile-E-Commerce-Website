import styles from "@/components/general/styles/AboutSection.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import Image from "next/image";

const GAP_DESKTOP = 125;
const GAP_TABLET = 63;
const GAP_MOBILE = 40;

const IMAGE_WIDTH_DESKTOP = 540;
const IMAGE_WIDTH_TABLET = 689;
const IMAGE_WIDTH_MOBILE = 327;

const IMAGE_HEIGHT_DESKTOP = 588;
const IMAGE_HEIGHT_TABLET = 300;
const IMAGE_HEIGHT_MOBILE = 300;

const PADDING = 0;
const PADDING_TABLET = 58;

export default function AboutSection() {
	const { view } = useMediaQueryContext();
	const flexDirection = view === "desktop" ? "row" : "column-reverse";
	const gap =
		view === "desktop"
			? GAP_DESKTOP
			: view === "tablet"
				? GAP_TABLET
				: GAP_MOBILE;
	const imageWidth =
		view === "desktop"
			? IMAGE_WIDTH_DESKTOP
			: view === "tablet"
				? IMAGE_WIDTH_TABLET
				: IMAGE_WIDTH_MOBILE;
	const imageHeight =
		view === "desktop"
			? IMAGE_HEIGHT_DESKTOP
			: view === "tablet"
				? IMAGE_HEIGHT_TABLET
				: IMAGE_HEIGHT_MOBILE;
	const padding = view === "tablet" ? PADDING_TABLET : PADDING;

	return (
		<article
			className={styles["about-section"]}
			style={{ gap, flexDirection }}
		>
			<section
				className={styles["about-section-text"]}
				style={{ padding }}
			>
				{view === "mobile" ? (
					<h4>
						Bringing you the
						<span style={{ color: "var(--raw-sienna)" }}>
							{" "}
							best{" "}
						</span>
						audio gear
					</h4>
				) : (
					<h2>
						Bringing you the
						<span style={{ color: "var(--raw-sienna)" }}>
							{" "}
							best{" "}
						</span>
						audio gear
					</h2>
				)}

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
					src={`/home/${view}/image-model.jpg`}
					alt="Model"
					width={imageWidth}
					height={imageHeight}
				/>
			</figure>
		</article>
	);
}
