import api from './api';

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
});

export const getAllOrders = async () => {
    const response = await api.get('/orders', authHeader());
    return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}`, { status }, authHeader());
    return response.data;
};