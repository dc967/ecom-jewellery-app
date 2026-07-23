import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../services/orderService';

function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getMyOrders();
                setOrders(data.orders);
            } catch (error) {
                console.log('Failed to fetch orders', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (orders.length === 0) {
        return (
            <div className="text-center mt-20">
                <p className="text-xl text-gray-600 mb-4">You have no orders yet</p>
                <Link to="/" className="text-pink-600 hover:underline">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="px-6 py-10 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-gray-500">
                                Order #{order._id.slice(-8)}
                            </p>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-100 text-pink-600 capitalize">
                                {order.status}
                            </span>
                        </div>

                        <div className="space-y-2 mb-4">
                            {order.items.map((orderItem, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                    <span>{orderItem.item?.name || 'Product'} × {orderItem.quantity}</span>
                                    <span>₹{orderItem.price * orderItem.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 flex justify-between items-center">
                            <p className="text-sm text-gray-500">{order.shippingAddress}</p>
                            <p className="font-bold text-pink-600">₹{order.totalPrice}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyOrdersPage;