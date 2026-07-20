import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { Eye, EyeOff } from 'lucide-react';

function LoginPage(){
   const [email, serEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);

   const handleSubmit = async (e) => {
     e.preventDefault();
     setError('');

     try {
        const data = await loginUser(email, password);
        localStorage.setItem('accessToken', data.accessToken);
        navigate('/');
     } catch (error) {
        setError(err.response?.data?.msg || 'Login failed');
     }
   };

   return (

       <div className="flex justify-center items-center min-h-[80vh] px-4">
         <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm"
         >
           
           <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">
            Login
           </h1>

            {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <label className="block text-gray-700 mb-1">Email</label>
            <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />


            <label className="block text-gray-700 mb-1">Password</label>
               <div className="relative mb-6">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

           <button
                 type="submit"
                 className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
           >
              Login
           </button>
         </form>
       </div>













   )












}

export default LoginPage