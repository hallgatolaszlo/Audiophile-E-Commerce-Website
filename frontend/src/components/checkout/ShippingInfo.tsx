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
	return (
		<div
			onKeyDown={(e) => {
				if (e.key === "Enter") onSubmit();
			}}
		>
			<div>
				<p
					className="sub-title"
					style={{
						color: "var(--raw-sienna)",
						marginTop: "53px",
						marginBottom: "16px",
					}}
				>
					Shipping information
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
				style={{
					display: "flex",
					gap: "16px",
					width: "100%",
					marginTop: "24px",
				}}
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
			<div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
				<div style={{ flex: 1 }}>
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
				<div style={{ flex: 1 }}></div>
			</div>
		</div>
	);
}
