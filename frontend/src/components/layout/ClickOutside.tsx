import { useEffect, useRef } from "react";

interface ClickOutsideProps {
	children: React.ReactNode;
	exceptionRef?: React.RefObject<HTMLElement>;
	onClick: () => void;
	className?: string;
}

export default function ClickOutside({
	children,
	exceptionRef,
	onClick,
	className,
}: ClickOutsideProps) {
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickListener = (event: MouseEvent) => {
			const target = event.target as Node | null;
			if (!wrapperRef.current) return;

			let clickedInside = false;

			if (exceptionRef) {
				const exceptionEl = exceptionRef.current;
				clickedInside =
					wrapperRef.current.contains(target) ||
					exceptionEl === target ||
					!!(exceptionEl && exceptionEl.contains(target));
			} else {
				clickedInside = wrapperRef.current.contains(target);
			}

			if (!clickedInside) onClick();
		};

		document.addEventListener("mousedown", handleClickListener);
		return () => {
			document.removeEventListener("mousedown", handleClickListener);
		};
	}, [exceptionRef, onClick]);

	return (
		<div
			style={{ display: "contents" }}
			ref={wrapperRef}
			className={className || ""}
		>
			{children}
		</div>
	);
}
