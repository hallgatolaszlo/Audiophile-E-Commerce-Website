export type CartItem = { slug: string; quantity: number; price: number };

function getBrowserLocalStorage(): Storage | null {
	if (typeof window === "undefined") return null;

	// Accessing localStorage can throw in some environments (e.g. privacy modes).
	try {
		const storage = window.localStorage;
		if (!storage) return null;
		if (typeof storage.getItem !== "function") return null;
		if (typeof storage.setItem !== "function") return null;
		if (typeof storage.removeItem !== "function") return null;
		return storage;
	} catch {
		return null;
	}
}

export function GetLocalStorageCart(): CartItem[] {
	const storage = getBrowserLocalStorage();
	if (!storage) return [];

	try {
		const raw = storage.getItem("cart");
		if (!raw) return [];
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];

		return parsed
			.filter((item): item is CartItem => {
				if (typeof item !== "object" || item === null) return false;
				const maybe = item as Partial<CartItem>;
				return (
					typeof maybe.slug === "string" &&
					typeof maybe.quantity === "number" &&
					Number.isFinite(maybe.quantity) &&
					typeof maybe.price === "number" &&
					Number.isFinite(maybe.price)
				);
			})
			.map((item) => ({
				slug: item.slug,
				quantity: item.quantity,
				price: item.price,
			}));
	} catch {
		return [];
	}
}

export function SetLocalStorageCart(items: CartItem[]) {
	const storage = getBrowserLocalStorage();
	if (!storage) return;

	try {
		if (!items || items.length === 0) {
			storage.removeItem("cart");
			return;
		}
		storage.setItem("cart", JSON.stringify(items));
	} catch {
		// ignore
	}
}

export function AddToLocalStorageCart({
	slug,
	quantity,
	price,
}: {
	slug: string;
	quantity: number;
	price: number;
}) {
	const cartItems = GetLocalStorageCart();
	if (!cartItems.some((item) => item.slug === slug)) {
		cartItems.push({ slug: slug, quantity: quantity, price: price });
		SetLocalStorageCart(cartItems);
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
		SetLocalStorageCart(updatedCartItems);
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
	const cartItems = GetLocalStorageCart();

	const updatedCartItems = cartItems.map((item) => {
		if (item.slug === slug && quantity === 0) {
			return null; // Mark for deletion
		}

		return item.slug === slug ? { ...item, quantity, price } : item;
	});

	const filteredCartItems = updatedCartItems.filter((item) => item !== null);
	if (filteredCartItems.length === 0) {
		SetLocalStorageCart([]);
		return;
	}

	SetLocalStorageCart(filteredCartItems as CartItem[]);
}
