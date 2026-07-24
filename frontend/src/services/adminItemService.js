import api from './api';

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
});

export const createItem = async (itemData) => {
    const response = await api.post('/items', itemData, authHeader());
    return response.data;
};

export const updateItem = async (id, itemData) => {
    const response = await api.put(`/items/${id}`, itemData, authHeader());
    return response.data;
};

export const deleteItem = async (id) => {
    const response = await api.delete(`/items/${id}`, authHeader());
    return response.data;
};