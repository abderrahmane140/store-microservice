import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import ProductsDetails from "./pages/ProductsDetails";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="flex min-h-screen">
      <BrowserRouter>
      <div className='flex items-center'>
        <Nav/>

      </div>
        
        {/* Main Content - Fills available space */}
        <main className="flex-1 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home/>}/>

            <Route path="/products" element={<Products/>}/>

            <Route path="/orders" element={<Orders/>}/>

            <Route path="/product/:id" element={<ProductsDetails/>}/>

            <Route path="/login" element={<Login/>}/>

            <Route path="/signup" element={<SignUp/>}/>

          </Routes>
        </main>

      </BrowserRouter>
    </div>
  );
}

export default App;
