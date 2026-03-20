export function AddToLocalStorageCart({
	slug,
	quantity,
	price,
}: {
	slug: string;
	quantity: number;
	price: number;
}) {
	const localStorageCart = localStorage.getItem("cart");
	const cartItems: { slug: string; quantity: number; price: number }[] =
		localStorageCart ? JSON.parse(localStorageCart) : [];
	if (!cartItems.some((item) => item.slug === slug)) {
		cartItems.push({ slug: slug, quantity: quantity, price: price });
		localStorage.setItem("cart", JSON.stringify(cartItems));
	} else {
		const updatedCartItems = cartItems.map((item) =>
			item.slug === slug
				? {
						...item,
						quantity: item.quantity + quantity,
						price: item.price,
					}
				: item,
		);
		localStorage.setItem("cart", JSON.stringify(updatedCartItems));
	}
}

export function ChangeLocalStorageCartItemQuantity({
	slug,
	quantity,
	price,
}: {
	slug: string;
	quantity: number;
	price: number;
}) {
	const localStorageCart = localStorage.getItem("cart");
	const cartItems: { slug: string; quantity: number; price: number }[] =
		localStorageCart ? JSON.parse(localStorageCart) : [];

	const updatedCartItems = cartItems.map((item) => {
		if (item.slug === slug && quantity === 0) {
			return null; // Mark for deletion
		}

		return item.slug === slug ? { ...item, quantity, price } : item;
	});

	const filteredCartItems = updatedCartItems.filter((item) => item !== null);
	if (filteredCartItems.length === 0) {
		localStorage.removeItem("cart");
		return;
	}

	localStorage.setItem("cart", JSON.stringify(filteredCartItems));
}
