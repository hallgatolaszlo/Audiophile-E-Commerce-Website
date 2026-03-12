import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import Navbar from "./_components/Navbar";
import Providers from "./_components/Providers";
import "./globals.css";

export const metadata: Metadata = {
	icons: {
		icon: "/favicon-32x32.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
