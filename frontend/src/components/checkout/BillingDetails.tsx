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
						marginTop: "41px",
						marginBottom: "16px",
					}}
				>
					Billing details
				</p>
			</div>
			<div
				style={{
					display: "flex",
					gap: "16px",
					width: "100%",
				}}
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
			<div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
				<div style={{ flex: 1 }}>
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
				<div style={{ flex: 1 }}></div>
			</div>
		</div>
	);
}
