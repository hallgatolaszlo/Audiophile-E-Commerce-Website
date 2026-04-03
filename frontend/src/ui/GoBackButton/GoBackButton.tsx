"use client";

import styles from "@/ui/GoBackButton/GoBackButton.module.css";
import { useRouter } from "next/navigation";

export default function GoBackButton({
	style,
}: {
	style?: React.CSSProperties;
}) {
	const router = useRouter();

	return (
		<span
			style={style}
			className={styles["go-back-button"]}
			onClick={() => router.back()}
		>
			Go Back
		</span>
	);
}
