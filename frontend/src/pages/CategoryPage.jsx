import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllItems } from "../services/itemService";
import { Link } from 'react-router-dom';

function CategoryPage(){
    const { categoryName } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoding] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getAllItems(categoryName);
                setItems(data.items);
            } catch (error) {
                 console.log('Failed to fetch items', error);
                 
            } finally{
                setLoding(false);
            }
        };
        fetchItems();
    }, [categoryName]);

    return (

      <div className="px-6 py-10">
        <h1 className="text-3xl font-bold text-center capitalize">
            {categoryName} 
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {items.map((item) => (
    <Link key={item._id} to={`/product/${item._id}`}>
        <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded" />
            <p className="font-semibold mt-2">{item.name}</p>
            <p className="text-pink-600">₹{item.price}</p>
        </div>
    </Link>
            ))}
        </div>
      </div> 
    );
}
export default CategoryPage