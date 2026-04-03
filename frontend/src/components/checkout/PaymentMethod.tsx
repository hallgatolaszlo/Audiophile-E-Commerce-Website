import styles from "@/components/checkout/styles/PaymentMethod.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import InputField from "@/ui/InputField/InputField";
import RadioInput from "@/ui/RadioInput/RadioInput";
import { Controller, useWatch } from "react-hook-form";

const paymentMethods = ["e-Money", "Cash on Delivery"] as const;

export default function PaymentMethod({
	control,
	errors,
}: {
	control: any;
	errors: any;
}) {
	const { view } = useMediaQueryContext();

	const selectedPaymentMethod = useWatch({
		control,
		name: "paymentDetails.paymentMethod",
	});

	return (
		<div>
			<p className={`sub-title ${styles.sectionTitle}`}>
				Payment details
			</p>
			<div className={styles.container}>
				<div
					className={`${styles.methodRow} ${
						view === "mobile" ? styles.column : styles.row
					}`}
				>
					<p className={styles.methodLabel}>Payment Method</p>
					<Controller
						name="paymentDetails.paymentMethod"
						control={control}
						render={({ field: { onChange, value } }) => (
							<div className={styles.radioList}>
								{paymentMethods.map((method, index) => (
									<RadioInput
										key={index}
										checked={value === method}
										value={method}
										onChange={() => onChange(method)}
										label={method}
									/>
								))}
							</div>
						)}
					/>
				</div>

				{selectedPaymentMethod === "e-Money" && (
					<div
						className={`${styles.eMoneyRow} ${
							view === "mobile" ? styles.column : styles.row
						}`}
					>
						<Controller
							name="paymentDetails.eMoneyNumber"
							control={control}
							render={({ field: { onChange, value } }) => (
								<InputField
									type="text"
									label="e-Money Number"
									value={value}
									onChange={onChange}
									placeholder="123456789"
									error={
										errors.paymentDetails?.eMoneyNumber
											?.message
									}
								/>
							)}
						/>
						<Controller
							name="paymentDetails.eMoneyPin"
							control={control}
							render={({ field: { onChange, value } }) => (
								<InputField
									type="password"
									label="e-Money Pin"
									value={value}
									onChange={onChange}
									placeholder="1234"
									error={
										errors.paymentDetails?.eMoneyPin
											?.message
									}
								/>
							)}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
