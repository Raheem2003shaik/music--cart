import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import heading from "../../assets/heading.png";
import "./ViewCart.css";
import axios from "axios";
import Footer from "../footer/Footer.jsx";
import Navigator from "../navigate/Navigate.jsx";
import { useMediaQuery } from "react-responsive";
import NavbarMobile from "../Navbar/NavbarMobile.jsx";

const Cart = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const user = localStorage.getItem("user");
  const [itemQuantities, setItemQuantities] = useState({});
  let final_amount = 0;

  const placeOrder = () => {
    const totalAmount = final_amount;
    localStorage.setItem("total", totalAmount);
    navigate("/checkout");
  };

  useEffect(() => {
    axios
      .get(`https://musicart-80cn.onrender.com/musicProducts/getCart/${user}`)
      .then((response) => {
        setData(response.data);
        setItemQuantities(
          response.data.reduce((quantities, item) => {
            quantities[item._id] = 1; // Set default quantity to 1 for each item
            return quantities;
          }, {})
        );
        if (response.data.length > 0) {
          localStorage.setItem("check-img",JSON.stringify(response.data[0].main_image));
          localStorage.setItem("check-color",JSON.stringify(response.data[0].color));
          localStorage.setItem("check-name",JSON.stringify(response.data[0].name));
        }
      })
      
      .catch((err) => {
        console.log("error ..", err);
      });
  }, [user]);

  const handleQuantityChange = (itemId, quantity) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: quantity,
    }));
  };

  return (
    <div className="view-cart">
      {isDesktopOrLaptop ? <Navbar /> : <NavbarMobile />}
      {isDesktopOrLaptop ? (
        <div className="cart-section">
          <div className="heading">
            <div className="heading-section">
              <img src={heading} alt="Music Art" className="heading-img" />
              <p>Home/Cart</p>
            </div>
          </div>
          <div className="back-to-home">
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Back to Products
            </button>
          </div>
          <center>
            <div className="cart-symbol">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="49"
                viewBox="0 0 62 59"
                fill="none"
              ></svg>
              <h3>My Cart</h3>
            </div>
          </center>
          <div>
            <div className="wrapper">
              <div>
                {data.map((item, index) => {
                    console.log(item.quantity)
                    final_amount += itemQuantities[item._id] * item.price;
                  return (
                    <div className="cart-product-details" key={index}>
                      <div className="sita">
                        <img src={item.main_image} alt="" />
                        <table className="tabu">
                          <tbody>
                            <tr>
                              <td>
                                <h3>{item.name}</h3>
                                <br />
                              </td>
                              <td>
                                <p>
                                  <b>Price</b>
                                </p>
                                <br />
                              </td>
                              <td>
                                <label>
                                  <b>Quantity:</b>
                                </label>
                                <br />
                              </td>
                              <td>
                                <p>
                                  <b>Total</b>
                                </p>
                                <br />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p>Colour : {item.color}</p>
                                <br />
                                <p>{item.available}</p>
                              </td>
                              <td>
                                <p>₹ {item.price}</p>
                              </td>
                              <td>
                                <select
                                  value={itemQuantities[item._id]}
                                  onChange={(e) =>
                                    handleQuantityChange(item._id, parseInt(e.target.value, 10))
                                  }
                                >
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                </select>
                              </td>
                              <td>
                                <p>{itemQuantities[item._id] * item.price}</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
              {data.length > 0 && (
                <div className="table-details">
                  <table>
                    <thead>
                      <tr>
                        <td>
                          <b>PRICE DETAILS</b>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Total MRP</td>
                        <td>:₹{final_amount}</td>
                      </tr>
                      <tr>
                        <td>Discount on MRP</td>
                        <td> : ₹0</td>
                      </tr>
                      <tr>
                        <td>Convenience Fee</td>
                        <td> : ₹45</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>
                          <b>Total Amount</b>
                        </td>
                        <td>₹ {final_amount}</td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <button className="buy-now" onClick={placeOrder}>
                            Place order
                          </button>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mob-wrapper">
          <div
            className="back"
            onClick={() => {
              navigate("/");
            }}
          >
            <br />
            <i className="ri-arrow-left-line" style={{ fontSize: '24px', color: 'black' }}></i>
          </div>
          <div>
            {data.map((item, index) => {
              final_amount = final_amount + item.price + 45;
              return (
                <div className="mob-cart-container" key={index}>
                  <div className="mobile-cart-view">
                    <div>
                      <img
                        className="mobile-cart-img"
                        src={item.main_image}
                        alt=""
                      />
                    </div>
                    <div className="mob-cart-details">
                      <div>
                        <h3> {item.name}</h3>
                        <h3> {item.price}</h3>
                        <p>color : {item.color}</p>
                        <p> {item.available}</p>
                        <br />
                        <b> Price:₹ {item.price} </b>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
          <div className="mob-cart-sub-details">
            <p>Convenience Fee:45</p>
            <h3>Total amount :₹ {final_amount}</h3>
            <button className="buy-now" onClick={placeOrder}>
              PLACE ORDER
            </button>
          </div>
        </div>
      )}
      {isDesktopOrLaptop ? <Footer /> : <Navigator />}
    </div>
  );
};

export default Cart;
