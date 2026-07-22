import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";


function App() {
  

  return (
    <AuthProvider>
    <BrowserRouter>
       <Navbar/>
       <Routes>
         <Route path="/" element={<HomePage/>}/>
         <Route path="/login" element={<LoginPage/>}/>
         <Route path="/category/:categoryName" element={<CategoryPage/>}/>
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/product/:id" element={<ProductDetailPage/>}/>
       </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
