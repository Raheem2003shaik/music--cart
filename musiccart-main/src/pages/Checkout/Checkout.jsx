import React, { useState } from "react";
import heading from "../../assets/heading.png";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import "./Checkout.css";

import Footer from "../../components/footer/Footer.jsx";
import NavigationIcons from "../../components/navigate/Navigate.jsx";
import NavbarHeader from "../NavbarHeader.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
const Checkout = (props) => {

    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'});
    const navigate = useNavigate();
    const checkImg = JSON.parse(localStorage.getItem("check-img"));
    const checkColor = JSON.parse(localStorage.getItem("check-color"));
    const checkName = JSON.parse(localStorage.getItem("check-name"));
  const user = localStorage.getItem("user");

  const placeOrder =()=>{
    localStorage.removeItem('current');
    localStorage.removeItem('check-img');
    localStorage.removeItem('check-name');
    localStorage.removeItem('check-color');
    axios.put(`https://musicart-80cn.onrender.com/musicProducts/clearCart/${user}`)
    .then((response) => { 
        console.log(response);
       
    })
    .catch((err) => { console.log("error sita ..", err) })
    
  }
  return (
    <div className="single-prod-cart" >
      {isDesktopOrLaptop ? <Navbar/>: <NavbarHeader/> }
      <div className="cart-section">
        <div className="heading-section">
          <img src={heading} alt="Music Art" className="heading-img" />
          <p>
            <b>Home/Checkout</b>
          </p>
        </div>

        <button  className="back-button"
         onClick={() => {
            navigate("/");
          }}
        >
            Back to Products
        </button>
        <div className='back' onClick={() => { navigate('/') }} >
            <br></br>
            <i className="ri-arrow-left-line" style={{ fontSize: '24px', color: 'black' }}></i>
        </div>
        <h3 className="chk-out"> <br></br> Checkout  </h3>
        
   
      <center>
        {" "}
        <h3>
          {" "}
          <u className="chk">Check out</u>{" "}
        </h3>
      </center>
      <br/>
      <div className="checkout-items-container">
      {isDesktopOrLaptop ?
        <table className="description-table">
          <thead></thead>
          <tbody>
            <tr >
              <td className="item-description-head">1. Delivery address</td>
              <td className="item-description-valur">
                Akash Patel <br></br>
                104 <br></br>
                kk hh nagar, Lucknow, <br></br>
                Uttar Pradesh 226025
              </td>
            </tr>
           
          
            <tr>
                <td colSpan="2"><hr></hr></td>
                
            </tr>
           
            <tr>
              <td className="item-description-head"> 2. Payment method </td>
              <td className="item-description-valur">
                {" "}
                Pay on delivery ( Cash/Card){" "}
              </td>
            </tr>
           
            <tr>
                <td colSpan="2"><hr></hr></td>
                
            </tr>
        
            <tr>
              <td className="item-description-head">
                {" "}
                3.Review items and delivery{" "}
              </td>
              <td className="item-description-valur">
                <div className="product-specs">
                  <img src={checkImg} alt="" />

                  
                    <h3>{checkName}</h3>
                   
                    
                    <p><b>{"Availabe : yes"}</b></p>
                 
                 
                    <p>
                      <b>Estimated delivary :</b>
                    </p>
                   
                    <p>
                      {" "}
                      <b>Monday free standard delivary</b>{" "}
                    </p>
                  
                </div>
              </td>
            </tr>
           <tr>
                <td colSpan="2"><hr></hr></td>
                
            </tr>
          </tbody>
        </table>
        :

        <div className="description-division">
            <div className="description-div-items">
                <p className="item-description-head"> 1.Delivery address </p>

                <p className="item-description-valur"> Akash Patel <br></br>
                104 <br></br>
                kk hh nagar, Lucknow, <br></br>
                Uttar Pradesh 226025</p>

            </div>
           
            <div className="description-div-items">
                <p className="item-description-head"> 1.Delivery address </p>

                <p className="item-description-valur"> 
                    Pay on delivery ( Cash/Card)
                </p>

            </div>
            <div className="description-div-items">
                <p className="item-description-head">   3.Review items and delivery </p>

                <div className="product-specs" id="item-description-valur">
                  <img src={checkImg} alt="" />

                  
                    <h3>{checkName}</h3>
                   
                    <p>Colour : {checkColor}</p>
                    
                    <p>{"Yes"}</p>
                 
                 
                    <p>
                      <b>Estimated delivery :</b>
                    </p>
                   
                    <p>
                      {" "}
                      <b>Monday free standard delivery</b>{" "}
                    </p>
                  
                </div>

            </div>

        </div>
        }

        
        <table className="total-table">
          <thead></thead>
          <tbody>
            <tr>
              <td colSpan="2">
                {" "}
                <button className="buy-now" onClick={()=>{placeOrder();navigate('/congrats')}} >Place order</button>
              </td>
            </tr>
            <tr className="row2">
              By placing your order, you agree to Musicart privacy notice and
              conditions of use.
            </tr>
            <tr className="row2">
              {" "}
              <td colSpan="2">
                {" "}
                <hr></hr>
              </td>
            </tr>
            <tr>
              <b>Order summary</b>
            </tr>
            <tr>
              <td>Items cost:</td>
              <td>{parseInt(localStorage.getItem("total")) - 45}</td>
            </tr>
            <tr>
              <td>Delivery:</td>
              <td>45</td>
            </tr>
            <tr>
              <td colSpan="2">
                {" "}
                <hr></hr>
              </td>
            </tr>
            <tr style={{ color: "red" }}>
              <td>
                <b> Order total : </b>
              </td>
              <td>
                <b>{localStorage.getItem("total")}</b>
              </td>
            </tr>

          </tbody>
        </table>
        
        <button className="buy-now" id="buy-now" onClick={()=>{placeOrder();navigate('/congrats')}} >Place order</button>
        <br></br>
        <br></br>
      </div>
      </div>
     
     {/* <NavigationIcons/> */}
     {isDesktopOrLaptop ? <Footer/>: <NavigationIcons/> }
    </div>
  );
};

export default Checkout;