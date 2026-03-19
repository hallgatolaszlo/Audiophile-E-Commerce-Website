import { createPortal } from "react-dom";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export default function CartModal({ isOpen, onClose, children }: ModalProps) {
	if (!isOpen) return null;

	return createPortal(
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				justifyContent: "center",
				zIndex: 1000,
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					position: "relative",
					maxWidth: "1110px",
					width: "100%",
					paddingTop: "var(--navbar-height)",
				}}
			>
				<div
					style={{
						position: "relative",
						top: "32px",
						maxWidth: "377px",
						width: "100%",
						maxHeight: "488px",
						height: "100%",
						background: "white",
						padding: "30px",
						borderRadius: "var(--border-radius)",
					}}
				>
					{children}
					<button onClick={onClose}>Close</button>
				</div>
			</div>
		</div>,
		document.body,
	);
}
