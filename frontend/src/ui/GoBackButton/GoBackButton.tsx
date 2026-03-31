"use client";

import styles from "@/ui/GoBackButton/GoBackButton.module.css";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
	const router = useRouter();

	return (
		<span
			className={styles["go-back-button"]}
			onClick={() => router.back()}
		>
			Go Back
		</span>
	);
}
