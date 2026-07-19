import api from "./api";

export const getAllItems = async (category) => {
    const url = category ? `/items?category=${category}` : '/items';
    const response = await api.get(url);
    return response.data;
};

export const getItemById = async (id) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
}