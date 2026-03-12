"use client";

import MediaQueryProvider from "@/contexts/useMediaQueryContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { HelmetProvider } from "react-helmet-async";

export default function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<div
			style={{
				minHeight: "calc(100vh - var(--navbar-height))",
			}}
		>
			<HelmetProvider>
				<MediaQueryProvider>
					<QueryClientProvider client={queryClient}>
						{children}
					</QueryClientProvider>
				</MediaQueryProvider>
			</HelmetProvider>
		</div>
	);
}
