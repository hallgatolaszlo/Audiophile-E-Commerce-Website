import styles from "@/ui/InputField/InputField.module.css";

export default function InputField({
	type,
	label,
	value,
	onChange,
	style,
	error,
	placeholder,
}: {
	type: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
	style?: React.CSSProperties;
	error?: string;
	placeholder?: string;
}) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginBottom: "9px",
				}}
			>
				<label
					className={`${styles["input-label"]} ${error ? styles["error"] : ""}`}
					htmlFor="input-field"
				>
					{label}
				</label>
				{error && (
					<span className={styles["error-message"]}>{error}</span>
				)}
			</div>
			<input
				className={`${styles["input-field"]} ${error ? styles["error"] : ""}`}
				id="input-field"
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				style={style}
				placeholder={placeholder}
			/>
		</div>
	);
}
