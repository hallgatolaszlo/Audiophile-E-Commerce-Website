import BillingDetails from "@/components/checkout/BillingDetails";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import ShippingInfo from "@/components/checkout/ShippingInfo";
import styles from "@/components/checkout/styles/CheckoutForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

// TODO: More specific validation for phone, zip code, e-Money number and pin
// TODO: Responsive design for checkout form

const paymentMethods = ["e-Money", "Cash on Delivery"] as const;

const checkoutFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.email("Wrong format"),
	phone: z.string().min(1, "Phone number is required"),
	address: z.string().min(1, "Address is required"),
	zipCode: z.string().min(1, "ZIP code is required"),
	city: z.string().min(1, "City is required"),
	country: z.string().min(1, "Country is required"),
	paymentDetails: z.object({
		paymentMethod: z.enum(paymentMethods, {}),
		eMoneyNumber: z
			.string()
			.min(9, "e-Money number must be 9 characters long")
			.optional(),
		eMoneyPin: z
			.string()
			.min(4, "e-Money pin must be 4 characters long")
			.optional(),
	}),
});

function onSubmit(data: z.infer<typeof checkoutFormSchema>) {
	console.log(data);
}

export default function CheckoutForm() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof checkoutFormSchema>>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			address: "",
			zipCode: "",
			city: "",
			country: "",
			paymentDetails: {
				paymentMethod: "e-Money",
				eMoneyNumber: "",
				eMoneyPin: "",
			},
		},
	});

	return (
		<div className={styles.container}>
			<h3>Checkout</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<BillingDetails
					onSubmit={handleSubmit(onSubmit)}
					control={control}
					errors={errors}
				/>
				<ShippingInfo
					onSubmit={handleSubmit(onSubmit)}
					control={control}
					errors={errors}
				/>
				<PaymentMethod control={control} errors={errors} />
			</form>
		</div>
	);
}
