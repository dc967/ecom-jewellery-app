import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';
import { Trash2 } from 'lucide-react';

function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [shippingAddress, setShippingAddress] = useState('');
    const [error, setError] = useState('');
    const [showAddressForm, setShowAddressForm] = useState(false);

    const handleCheckoutClick = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setShowAddressForm(true);
    };

    const handlePlaceOrder = async () => {
        if (!shippingAddress.trim()) {
            setError('Please enter a shipping address');
            return;
        }

        try {
            const orderItems = cartItems.map((item) => ({
                item: item._id,
                quantity: item.quantity,
                price: item.price
            }));

            await createOrder(orderItems, shippingAddress);
            clearCart();
            navigate('/my-orders');
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to place order');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center mt-20">
                <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
                <Link to="/" className="text-pink-600 hover:underline">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="px-6 py-10 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-pink-600">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                className="border rounded px-2 py-1"
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="border rounded px-2 py-1"
                            >
                                +
                            </button>
                        </div>
                        <p className="font-semibold w-20 text-right">
                            ₹{item.price * item.quantity}
                        </p>
                        <button onClick={() => removeFromCart(item._id)} className="text-red-500">
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {showAddressForm && (
                <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                    <label className="block text-gray-700 mb-2">Shipping Address</label>
                    <textarea
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        rows={3}
                        placeholder="Enter your full address"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            )}

            <div className="mt-8 flex justify-between items-center border-t pt-6">
                <p className="text-xl font-bold">Total: ₹{cartTotal}</p>
                {!showAddressForm ? (
                    <button
                        onClick={handleCheckoutClick}
                        className="bg-pink-600 text-white px-8 py-3 rounded hover:bg-pink-700 transition"
                    >
                        Proceed to Checkout
                    </button>
                ) : (
                    <button
                        onClick={handlePlaceOrder}
                        className="bg-pink-600 text-white px-8 py-3 rounded hover:bg-pink-700 transition"
                    >
                        Place Order
                    </button>
                )}
            </div>
        </div>
    );
}

export default CartPage;