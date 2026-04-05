import styles from "@/components/checkout/styles/PaymentMethod.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import InputField from "@/ui/InputField/InputField";
import RadioInput from "@/ui/RadioInput/RadioInput";
import Image from "next/image";
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
			<p className={`sub-title ${styles["section-title"]}`}>
				Payment details
			</p>
			<div className={styles["container"]}>
				<div
					className={`${styles["method-row"]} ${
						view === "mobile" ? styles["column"] : styles["row"]
					}`}
				>
					<p className={styles["method-label"]}>Payment Method</p>
					<Controller
						name="paymentDetails.paymentMethod"
						control={control}
						render={({ field: { onChange, value } }) => (
							<div className={styles["radio-list"]}>
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
						className={`${styles["e-money-row"]} ${
							view === "mobile" ? styles["column"] : styles["row"]
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
				{selectedPaymentMethod === "Cash on Delivery" && (
					<div className={`${styles["cod-container"]}`}>
						<Image
							src="/checkout/icon-cash-on-delivery.svg"
							alt="Cash on Delivery"
							width={50}
							height={50}
						/>
						<p className={`${styles["cod-text"]}`}>
							{
								"The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled."
							}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
