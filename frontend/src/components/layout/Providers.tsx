"use client";

import MediaQueryProvider from "@/contexts/useMediaQueryContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";

export default function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	function ScrollToTopOnRouteChange() {
		const pathname = usePathname();

		useEffect(() => {
			window.scrollTo({ top: 0, left: 0, behavior: "auto" });
		}, [pathname]);

		return null;
	}

	return (
		<div
			style={{
				minHeight: "calc(100vh - var(--navbar-height))",
			}}
		>
			<HelmetProvider>
				<MediaQueryProvider>
					<QueryClientProvider client={queryClient}>
						<ScrollToTopOnRouteChange />
						{children}
					</QueryClientProvider>
				</MediaQueryProvider>
			</HelmetProvider>
		</div>
	);
}
