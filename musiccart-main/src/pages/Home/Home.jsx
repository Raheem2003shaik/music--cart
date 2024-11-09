import React, { useEffect } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar"; 
import Promo from "../../components/promo/Promo";
import { useMediaQuery } from 'react-responsive';
import NavbarMobile from '../../components/Navbar/NavbarMobile';
import { MyContext } from "../../context/MyContext";
import { useContext } from "react";
import Body from "../../components/body/Body";
import BodyMobile from "../../components/body/BodyMobile";
import Footer from "../../components/footer/Footer";
import { ToastContainer } from "react-toastify";

const Home = () => {
  
  const { loggedIn, setLoggedIn } =useContext(MyContext);
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'});
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="mainHome">
      <ToastContainer/>
      {isDesktopOrLaptop ?<Body />: <BodyMobile/> }
      {isDesktopOrLaptop ?<Footer />: "" }
    </div>
  );
};

export default Home;