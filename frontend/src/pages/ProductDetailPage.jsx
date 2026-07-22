import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getItemById } from "../services/itemService";

function ProductDetailPage(){
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoding] = useState(true);

     useEffect(() => {
        const fetchItem = async () => {
            try {
                const data = await getItemById(id);
                setItem(data.item);
            } catch (error) {
                 console.log('Failed to fetch item', error);
                 
            }finally{
                setLoding(false);
            }
        };
            fetchItem();
     },[id]);
    
     if(loading){
        return <p className="text-center mt-10">Loading...</p>
     }
    
     if(!item){
        return <p className="text-center mt-10">Product not found</p>
     }

     return (
       
         <div className="px-6 py-10 max-w-4xl mx-auto">
            <Link to="/" className="text-pink-600 mb-6 inline-block">← Back to Home</Link>

            <div className="grid md:grid-cols-2 gap-10">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-80 object-cover rounded-lg" 
                />

                <div>
                    <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
                    <p className="text-gray-500 capitalize mb-4">{item.category}</p>
                    <p className="text-2xl font-semibold text-pink-600 mb-4">₹{item.price}</p>
                    <p className="text-gray-700 mb-6">{item.description}</p>
                    <p className="text-sm text-gray-500 mb-6">
                        {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                    </p>

                    <button 
                        disabled={item.stock === 0}
                        className="bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700 transition disabled:bg-gray-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
     )

}

export default ProductDetailPage;