import { createPortal } from "react-dom";

export default function CheckoutModal({
	isOpen,
	onClose,
	content,
}: {
	isOpen: boolean;
	onClose: () => void;
	content: React.ReactNode;
}) {
	if (!isOpen) return null;
	if (typeof document === "undefined") return null;

	return createPortal(
		<div
			onMouseDown={() => {
				onClose();
			}}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				padding: "0 20px",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				justifyContent: "center",
				zIndex: 1000,
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					position: "relative",
					maxWidth: "1110px",
					width: "100%",
				}}
			>
				<div
					onMouseDown={(e) => e.stopPropagation()}
					style={{
						position: "relative",
						maxWidth: "540px",
						width: "100%",
						backgroundColor: "var(--white)",
						padding: "48px",
						borderRadius: "var(--border-radius)",
					}}
				>
					{content}
				</div>
			</div>
		</div>,
		document.body,
	);
}
