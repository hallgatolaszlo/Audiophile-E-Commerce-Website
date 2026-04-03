import styles from "@/components/checkout/styles/BillingDetails.module.css";
import { useMediaQueryContext } from "@/contexts/useMediaQueryContext";
import InputField from "@/ui/InputField/InputField";
import { Controller } from "react-hook-form";

export default function BillingDetails({
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
					Billing details
				</p>
			</div>
			<div
				className={`${styles.row} ${
					view === "mobile" ? styles.rowColumn : styles.rowRow
				}`}
			>
				<Controller
					control={control}
					name="name"
					render={({ field: { value, onChange } }) => (
						<InputField
							label="Name"
							type="text"
							value={value}
							onChange={onChange}
							error={errors.name?.message}
							placeholder="Alexei Ward"
						/>
					)}
				/>
				<Controller
					control={control}
					name="email"
					render={({ field: { value, onChange } }) => (
						<InputField
							label="Email"
							type="email"
							value={value}
							onChange={onChange}
							error={errors.email?.message}
							placeholder="alexei@mail.com"
						/>
					)}
				/>
			</div>
			<div className={styles.phoneRow}>
				<div className={styles.half}>
					<Controller
						control={control}
						name="phone"
						render={({ field: { value, onChange } }) => (
							<InputField
								label="Phone Number"
								type="tel"
								value={value}
								onChange={onChange}
								error={errors.phone?.message}
								placeholder="+1 (202) 555-0136"
							/>
						)}
					/>
				</div>
				{view !== "mobile" && <div className={styles.half}></div>}
			</div>
		</div>
	);
}
