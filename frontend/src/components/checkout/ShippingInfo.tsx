import styles from "@/components/checkout/styles/ShippingInfo.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import InputField from "@/ui/InputField/InputField";
import { Controller } from "react-hook-form";

export default function ShippingInfo({
	control,
	errors,
	onSubmit,
}: {
	control: any;
	errors: any;
	onSubmit: () => void;
}) {
	const { view } = useMediaQueryContext();

	return (
		<div
			onKeyDown={(e) => {
				if (e.key === "Enter") onSubmit();
			}}
		>
			<div>
				<p className={`sub-title ${styles.sectionTitle}`}>
					Shipping info
				</p>
			</div>
			<div>
				<Controller
					control={control}
					name="address"
					render={({ field: { value, onChange } }) => (
						<InputField
							label="Address"
							type="text"
							value={value}
							onChange={onChange}
							error={errors.address?.message}
							placeholder="1137 Williams Avenue"
						/>
					)}
				/>
			</div>
			<div
				className={`${styles.twoColRow} ${
					view === "mobile" ? styles.rowColumn : styles.rowRow
				}`}
			>
				<Controller
					control={control}
					name="zipCode"
					render={({ field: { value, onChange } }) => (
						<InputField
							label="ZIP Code"
							type="text"
							value={value}
							onChange={onChange}
							error={errors.zipCode?.message}
							placeholder="10001"
						/>
					)}
				/>
				<Controller
					control={control}
					name="city"
					render={({ field: { value, onChange } }) => (
						<InputField
							label="City"
							type="text"
							value={value}
							onChange={onChange}
							error={errors.city?.message}
							placeholder="New York"
						/>
					)}
				/>
			</div>
			<div className={styles.bottomRow}>
				<div className={styles.half}>
					<Controller
						control={control}
						name="country"
						render={({ field: { value, onChange } }) => (
							<InputField
								label="Country"
								type="text"
								value={value}
								onChange={onChange}
								error={errors.country?.message}
								placeholder="United States"
							/>
						)}
					/>
				</div>
				{view !== "mobile" && <div className={styles.half}></div>}
			</div>
		</div>
	);
}
