import styles from "@/ui/RadioInput/RadioInput.module.css";

export default function RadioInput({
	label,
	value,
	checked,
	onChange,
	style,
}: {
	label: string;
	value: string;
	checked: boolean;
	onChange: (value: string) => void;
	style?: React.CSSProperties;
}) {
	return (
		<div
			className={styles["radio"]}
			style={{
				borderColor: checked
					? "var(--raw-sienna)"
					: "var(--input-border)",
				...style,
			}}
		>
			<input
				className={styles["radio-input"]}
				style={{
					borderColor: checked
						? "var(--raw-sienna)"
						: "var(--input-border)",
				}}
				type="radio"
				id={label}
				checked={checked}
				value={value}
				onChange={() => onChange(value)}
			/>
			<label className={styles["radio-label"]} htmlFor={label}>
				{label}
			</label>
		</div>
	);
}
