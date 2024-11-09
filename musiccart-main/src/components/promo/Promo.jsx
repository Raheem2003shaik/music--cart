import React from "react";
import "./Promo.css";
import heading from '../../assets/heading.png';
import bannerImage from '../../assets/banner.png';
import { useNavigate } from 'react-router-dom';
const Promo = () => {
  const navigate = useNavigate()
  return (
    <div className="banner">
      <div className="heading-section">
        <div className="banner-icon">
        <img src={heading} alt="Music Art" className="heading-img"/>
        <span className="home"><b>Home</b></span>
        </div>
      
        <button className="view-cart-btn" onClick={()=>{navigate('cart-items')}} > View Cart</button>
      </div>
      <div className="banner_image">
        <img src={bannerImage} alt="" />
      </div>
    </div>
  );
};

export default Promo;