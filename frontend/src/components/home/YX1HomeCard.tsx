import styles from "@/components/home/styles/YX1HomeCard.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import Button2 from "@/ui/Button2/Button2";
import Image from "next/image";

const LEFT_POSITION_DESKTOP = "95px";
const LEFT_POSITION_TABLET = "41px";
const LEFT_POSITION_MOBILE = "24px";

const IMAGE_WIDTH_DESKTOP = 540;
const IMAGE_WIDTH_TABLET = 339;
const IMAGE_WIDTH_MOBILE = 327;

const IMAGE_HEIGHT_DESKTOP = 320;
const IMAGE_HEIGHT_TABLET = 320;
const IMAGE_HEIGHT_MOBILE = 200;

export default function YX1HomeCard() {
	const { view } = useMediaQueryContext();
	const leftPosition =
		view === "desktop"
			? LEFT_POSITION_DESKTOP
			: view === "tablet"
				? LEFT_POSITION_TABLET
				: LEFT_POSITION_MOBILE;

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

	return (
		<article className={styles["yx1-home-card"]}>
			<figure>
				<Image
					className={styles["yx1-home-card-image"]}
					src={`/home/${view}/image-earphones-yx1.jpg`}
					alt="YX1 Earphones"
					width={imageWidth}
					height={imageHeight}
				/>
			</figure>
			<section className={styles["yx1-home-card-content"]}>
				<div
					className={styles["yx1-home-card-text"]}
					style={{
						left: leftPosition,
					}}
				>
					<h4>YX1 Earphones</h4>
					<Button2
						productSlug={{
							category: "earphones",
							slug: "yx1-earphones",
						}}
					/>
				</div>
			</section>
		</article>
	);
}
