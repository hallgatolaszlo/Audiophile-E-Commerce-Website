import React, { createContext, useContext, useMemo } from "react";
import useMedia from "use-media";

interface Props {
	children: React.ReactNode;
}

type View = "desktop" | "tablet" | "mobile";

interface MediaQueryContextValue {
	view: View;
}

export const MediaQueryContext = createContext<MediaQueryContextValue | null>(
	null,
);

export default function MediaQueryProvider({ children }: Props) {
	const isDesktop = useMedia("(min-width: 1025px)");
	const isTablet = useMedia("(min-width: 601px)");

	const view: View = isDesktop ? "desktop" : isTablet ? "tablet" : "mobile";

	const value = useMemo(() => ({ view }), [view]);

	return (
		<MediaQueryContext.Provider value={value}>
			{children}
		</MediaQueryContext.Provider>
	);
}

export function useMediaQueryContext() {
	const context = useContext(MediaQueryContext);

	if (!context) {
		throw new Error(
			"useMediaQueryContext must be used within MediaQueryProvider",
		);
	}

	return context;
}
