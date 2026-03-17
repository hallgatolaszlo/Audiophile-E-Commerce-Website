"use client";

import CategoriesSection from "@/components/general/CategoriesSection/CategoriesSection";
import {
	NewProductImage,
	NewProductSection,
} from "@/components/home/NewProductSection";
import styles from "@/components/layout/styles/Page.module.css";
import { Helmet } from "react-helmet-async";

import AboutSection from "@/components/general/AboutSection/AboutSection";
import YX1HomeCard from "@/components/home/YX1HomeCard";
import ZX7HomeCard from "@/components/home/ZX7HomeCard";
import ZX9HomeCard from "@/components/home/ZX9HomeCard";
export default function HomePage() {
	return (
		<>
			<Helmet>
				<title>Home | audiophile</title>
			</Helmet>
			<main className={styles["page"]}>
				<NewProductImage />
				<div className={styles["page-content"]}>
					<NewProductSection />
					<CategoriesSection />
					<ZX9HomeCard />
					<ZX7HomeCard />
					<YX1HomeCard />
					<AboutSection />
				</div>
			</main>
		</>
	);
}
