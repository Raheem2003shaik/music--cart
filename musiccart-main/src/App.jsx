import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ServerStatus from './components/serverStatus/ServerStatus';
import NotFound from './components/Error/NotFound';
import Home from "./pages/Home/Home";
import ProductView from './components/productCard/ProductCard';
import Success from './components/success/Success';
import ViewCart from './components/cart/ViewCart';
import { MyContext } from './context/MyContext';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import ProductViewMobile from './components/productCard/ProductviewMobile';
 import Login from './pages/Login/Login';
 import SignUp from './pages/Signup/Signup';
import Cart from './components/cart/Cart';
import Checkout from './pages/Checkout/Checkout';

function App() {
  const [loggedIn , setLoggedIn] = useState(true);
  const [currentPage, setCurrentpage] = useState("home");
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  return (
    <MyContext.Provider value={{loggedIn , setLoggedIn,currentPage, setCurrentpage}}  >
      
      <Router>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={ <Login/> } />
          <Route path="/register" element={ <SignUp/> } />
          <Route path="/" element={<Home />} />
          <Route path="/health" element={<ServerStatus />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/viewProduct" element={ isDesktopOrLaptop ?<ProductView/> : <ProductViewMobile/>} />
          <Route path="/viewCart" element={<ViewCart />} />
          <Route path="/Cart-items" element={<Cart/>}  />
          <Route path="/checkout" element={<Checkout/>}  />
          <Route path="/congrats" element={<Success />} />

        </Routes>
        
      </Router>
      </MyContext.Provider>
 
  );
}

export default App;