import BillingDetails from "@/components/checkout/BillingDetails";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import ShippingInfo from "@/components/checkout/ShippingInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const checkoutFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.email("Wrong format"),
	phone: z.string().min(1, "Phone number is required"),
	address: z.string().min(1, "Address is required"),
	zipCode: z.string().min(1, "ZIP code is required"),
	city: z.string().min(1, "City is required"),
	country: z.string().min(1, "Country is required"),
});

export default function CheckoutForm() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			address: "",
			zipCode: "",
			city: "",
			country: "",
		},
	});

	return (
		<div
			style={{
				marginTop: "38px",
				padding: "48px",
				backgroundColor: "var(--white)",
				height: "1126px",
				borderRadius: "var(--border-radius)",
			}}
		>
			<h3>Checkout</h3>
			<form onSubmit={handleSubmit(() => {})}>
				<BillingDetails
					onSubmit={handleSubmit(() => {})}
					control={control}
					errors={errors}
				/>
				<ShippingInfo
					onSubmit={handleSubmit(() => {})}
					control={control}
					errors={errors}
				/>
				<PaymentMethod
					onSubmit={handleSubmit(() => {})}
					control={control}
					errors={errors}
				/>
			</form>
		</div>
	);
}
