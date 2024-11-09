import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import './ProductCard.css';
import heading from '../../assets/heading.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer.jsx';
import { ToastContainer, toast } from "react-toastify";


const ProductCard = () => {
    const navigate = useNavigate();
    const loggedIn = localStorage.getItem("user");
    const [data, setData] = useState({})
    const [about,setAbout] = useState([]); 
    const[rate,setRate] = useState();
    const[count,setCount] = useState()
    useEffect(() => {
        axios.get(`https://musicart-80cn.onrender.com/musicProducts/?_id=${localStorage.getItem("id")}`)
            .then((response) => { 
                setData(response.data);
                setAbout(response.data.about); 
                const fetched_rate =  parseInt(response.data.rating.rate, 10);
                const fetched_count =  parseInt(response.data.rating.count, 10);
                console.log(fetched_rate , typeof(fetched_rate));
                console.log(fetched_count, typeof(fetched_count));

                setRate( fetched_rate) ; 
                setCount(fetched_count);
                localStorage.setItem("check-img",JSON.stringify(response.data.main_image));
          localStorage.setItem("check-color",JSON.stringify(response.data.color));
          localStorage.setItem("check-name",JSON.stringify(response.data.name));
          localStorage.setItem("check-price",JSON.stringify(response.data.price));
            })
            .catch((err) => { console.log("error fetching product card ..", err) })
    }, [])

    const addCart = ()=>{
        
        const user = localStorage.getItem("user");
        try {
            axios.put(`https://musicart-80cn.onrender.com/musicProducts/${data._id}/cart/${user}`)
                .then((response) => { 
                    console.log(response)
                })                
        } catch (error) {
            console.log(error);
        }

    }
    const showToastLoginMessage = () => {
        toast.warning("Login to proceed to cart!", {
        });
    }

    return (
        <div>
            <ToastContainer/>
            <Navbar />
            <div className='view-product'>
                <div className='heading'>
                    <div className="heading-section" style={{width:"400px"}}>
                        <img src={heading} alt="Music Art" className="heading-img" />
                        <p>Home / {data.name}</p>
                    </div>
                    <div>
                        <button>Cart</button>
                    </div>
                </div>
                <div className='back-to-home'>
                    <button onClick={() => { navigate('/') }}>Back to Products</button>
                </div>
                <div className='product-description'>
                    <p>{data.description}</p>
                </div>
                <br></br>
                <div id="prodetails" className="section-p1">
                    <div className="single-pro-image">
                        <img src={data.main_image} alt=""width="100%" id="mainImg" />
                        <div className="small-img-group">
                            <div className="small-img-col">
                                <img src={data.left_view} alt="" width="100%" className="small-img" />
                            </div>
                            <div className="small-img-col">
                                <img src={data.top_view} alt="" width="100%" className="small-img" />
                            </div>
                            <div className="small-img-col">
                                <img src={data.right_view} alt="" width="100%" className="small-img" />
                            </div>
                        </div>
                    </div>
                    <div className="single-pro-details">
                        <h1>{data.name}</h1>
                        <div className='product-sub-details'>
                        {/* <p>
                            {[...Array(Math.ceil(parseInt(rate)))].map((_, i) => (
                          <span key={i}>⭐</span>
                             ))}
                             ({parseInt(count, 10)} customers)
                        </p> */}

                        <p>
                        { [...new Array(rate)].map( (e,i)=>(
                                <span key={i}>⭐</span>
                                
                            ) ) }({count} customers)
                        </p>
                           
                        </div>
                        <h3>Price - ₹ {data.price}</h3>
                        <p>{data.color} | {data.type} headphone</p>
                        <p className='details'>About this Product <br></br>
                        <ul>
                            {about.map((item,index)=>{
                                return (<li key={index}>{item}</li>)
                            })}
                        </ul>
                            
                        </p>
                        
                        <p><b>Available</b> - {data.available}</p>
                        <p><b>Brand</b> - {data.brand}</p>
                        <div className="buttons">
                        <button className='add-to-cart' onClick={()=>{
                            if(!loggedIn){
                                showToastLoginMessage();
                                return;
                            }
                            addCart();navigate('/viewCart')}}>Add to Cart</button>
                        <button className='buy-now' onClick={()=>{
                             if(!loggedIn){
                                showToastLoginMessage();
                                return;
                            }
                            addCart();navigate('/viewCart')}} >Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
            
          <Footer/>              
        </div>
    );
};

export default ProductCard;