import { useState, useEffect } from 'react';
import { getAllItems } from '../../services/itemService';
import { createItem, updateItem, deleteItem } from '../../services/adminItemService';
import { Trash2, Edit } from 'lucide-react';

function ManageProducts() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: '', image: '', stock: ''
    });
    const [error, setError] = useState('');

    const fetchItems = async () => {
        try {
            const data = await getAllItems();
            setItems(data.items);
        } catch (error) {
            console.log('Failed to fetch items', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', price: '', category: '', image: '', stock: '' });
        setEditingId(null);
        setShowForm(false);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock)
            };

            if (editingId) {
                await updateItem(editingId, payload);
            } else {
                await createItem(payload);
            }

            resetForm();
            fetchItems();
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to save product');
        }
    };

    const handleEdit = (item) => {
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            image: item.image,
            stock: item.stock
        });
        setEditingId(item._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await deleteItem(id);
            fetchItems();
        } catch (error) {
            console.log('Failed to delete item', error);
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="px-6 py-10 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Products</h1>
                <button
                    onClick={() => { resetForm(); setShowForm(!showForm); }}
                    className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
                >
                    {showForm ? 'Cancel' : '+ Add Product'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-8 space-y-4">
                    <h2 className="text-xl font-semibold">{editingId ? 'Edit Product' : 'New Product'}</h2>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                        rows={3}
                        className="w-full border rounded px-3 py-2"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price"
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                        <input
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="Stock"
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Select Category</option>
                        <option value="earrings">Earrings</option>
                        <option value="necklace">Necklace</option>
                        <option value="bracelet">Bracelet</option>
                        <option value="ring">Ring</option>
                        <option value="anklet">Anklet</option>
                    </select>
                    <input
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        required
                        className="w-full border rounded px-3 py-2"
                    />

                    <button
                        type="submit"
                        className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
                    >
                        {editingId ? 'Update Product' : 'Create Product'}
                    </button>
                </form>
            )}

            <div className="space-y-3">
                {items.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-500 capitalize">{item.category} • ₹{item.price} • Stock: {item.stock}</p>
                        </div>
                        <button onClick={() => handleEdit(item)} className="text-blue-500">
                            <Edit size={20} />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="text-red-500">
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageProducts;