import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import CategoryPage from "./pages/CategoryPage";


function App() {
  

  return (
    <BrowserRouter>
       <Navbar/>
       <Routes>
         <Route path="/" element={<HomePage/>}/>
         <Route path="/login" element={<LoginPage/>}/>
         <Route path="/category/:categoryName" element={<CategoryPage/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
