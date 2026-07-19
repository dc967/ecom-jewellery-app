import { Link } from "react-router-dom"

const categories = [
    { name: "Earrings", path: "earrings"},
    { name: "Necklace", path: "necklace"},
    { name: "Bracelet", path: "bracelet"},
    { name: "Ring", path: "ring"},
    { name: "Anklet", path: "anklet"}
];

function HomePage(){
    return (
   <div className="px-6 py-10">

       <h1 className="text-2xl md:text-4xl font-bold text-center text-pink-600 mb-10">
          Welcome to Jewel Nest
       </h1>

       <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {categories.map((cat) => (
           
           <Link
               key={cat.path}
               to={`/category/${cat.path}`}
               className="bg-pink-50 hover:bg-pink-100 rounded-lg p-6 text-center shadow-sm transition"
            >

                <img 
                src={cat.image} 
                alt={cat.name}
                className="w-full h-40 object-cover"
                 />
                <p  className="text-lg font-semibold text-gray-800 text-center py-3">{cat.name}</p>

           </Link>
        ))}
       </div>
   </div>
    );
}

export default HomePage