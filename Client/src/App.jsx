import Footer from "./components/footer";
import Header from "./components/header";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import ProductsDetails from "./pages/ProductsDetails";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        
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

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
