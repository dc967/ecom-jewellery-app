import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item, quantity = 1) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i._id === item._id);

            if (existingItem) {
                return prevItems.map((i) =>
                    i._id === item._id
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            } else {
                return [...prevItems, { ...item, quantity }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((i) => i._id !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((i) =>
                i._id === itemId ? { ...i, quantity } : i
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const cartCount = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}