import api from './api';

export const createOrder = async (items , shippingAddress) => {
    const response = await api.post('/orders', { items, shippingAddress} , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response.data;
};


export const getMyOrders = async () => {
    const response = await api.get('/orders/my-orders',{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response.data;
};