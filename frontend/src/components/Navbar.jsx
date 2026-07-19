import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md px-6 py-4">
            <div className="flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-pink-600">
                    Jewel Nest
                </Link>

                
                <div className="hidden md:flex gap-6 text-gray-700">
                    <Link to="/category/earrings" className="hover:text-pink-600">Earrings</Link>
                    <Link to="/category/necklace" className="hover:text-pink-600">Necklace</Link>
                    <Link to="/category/bracelet" className="hover:text-pink-600">Bracelet</Link>
                    <Link to="/category/ring" className="hover:text-pink-600">Ring</Link>
                    <Link to="/category/anklet" className="hover:text-pink-600">Anklet</Link>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <Link to="/login" className="text-gray-700 hover:text-pink-600">Login</Link>
                    <Link to="/cart" className="text-gray-700 hover:text-pink-600">Cart</Link>
                </div>

                
                <button 
                    className="md:hidden" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            
            {isOpen && (
    <div className="md:hidden flex flex-col gap-3 mt-4 pb-4 text-gray-700">
        <Link to="/category/earrings" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Earrings</Link>
        <Link to="/category/necklace" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Necklace</Link>
        <Link to="/category/bracelet" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Bracelet</Link>
        <Link to="/category/ring" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Ring</Link>
        <Link to="/category/anklet" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Anklet</Link>
        <hr className="my-1" />
        <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Login</Link>
        <Link to="/cart" onClick={() => setIsOpen(false)} className="hover:text-pink-600">Cart</Link>
    </div>
)}
        </nav>
    );
}

export default Navbar;