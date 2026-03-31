export default function PaymentMethod({
	setPaymentMethod,
}: {
	setPaymentMethod: (method: string) => void;
}) {
	return (
		<div>
			<p
				className="sub-title"
				style={{
					color: "var(--raw-sienna)",
					marginTop: "61px",
					marginBottom: "16px",
				}}
			>
				Payment method
			</p>
		</div>
	);
}
