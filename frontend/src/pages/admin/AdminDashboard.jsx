import { Link } from "react-router-dom";

function AdminDashboard(){
    return (
      <div className="px-6 py-10 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>


          <div className="grid md:grid-cols-2 gap-6">
          <Link 
             to="/admin/products"
             className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition text-center"  
             >
                <p className="text-xl font-semibold text-pink-600">Manage Products</p>
                <p className="text-gray-500 mt-2">Add, edit, or delete products</p>
          </Link>

          <Link
             to="/admin/orders"
             className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition text-center"   
             >
              <p className="text-xl font-semibold text-pink-600">Manage Orders</p>
              <p className="text-gray-500 mt-2">View and update order status</p>
          </Link>
          </div>
      </div>
    )
}

export default AdminDashboard;