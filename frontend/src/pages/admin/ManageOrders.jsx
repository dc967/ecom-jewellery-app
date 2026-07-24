import { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../services/adminOrderService';

function ManageOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const data = await getAllOrders();
            setOrders(data.orders);
        } catch (error) {
            console.log('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            fetchOrders();
        } catch (error) {
            console.log('Failed to update status', error);
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="px-6 py-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="font-semibold">{order.user?.name}</p>
                                <p className="text-sm text-gray-500">{order.user?.email}</p>
                            </div>
                            <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                className="border rounded px-3 py-1 text-sm capitalize"
                            >
                                <option value="pending">Pending</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="space-y-1 mb-4 text-sm text-gray-600">
                            {order.items.map((orderItem, index) => (
                                <p key={index}>
                                    {orderItem.item?.name || 'Product'} × {orderItem.quantity}
                                </p>
                            ))}
                        </div>

                        <div className="border-t pt-4 flex justify-between text-sm">
                            <p className="text-gray-500">{order.shippingAddress}</p>
                            <p className="font-bold text-pink-600">₹{order.totalPrice}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageOrders;