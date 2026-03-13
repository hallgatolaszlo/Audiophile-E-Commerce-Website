"use client";

import CategoriesSection from "@/components/home/CategoriesSection";
import {
	NewProductImage,
	NewProductSection,
} from "@/components/home/NewProductSection";
import styles from "@/components/home/styles/Home.module.css";
import { Helmet } from "react-helmet-async";

import AboutSection from "@/components/home/AboutSection";
import YX1HomeCard from "@/components/home/YX1HomeCard";
import ZX7HomeCard from "@/components/home/ZX7HomeCard";
import ZX9HomeCard from "@/components/home/ZX9HomeCard";
export default function Home() {
	return (
		<>
			<Helmet>
				<title>Home | audiophile</title>
			</Helmet>
			<main className={styles["home-page"]}>
				<NewProductImage />
				<div className={styles["home-page-content"]}>
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
