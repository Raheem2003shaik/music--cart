
import React from 'react';
import { useContext } from "react";
import { MyContext } from '../../context/MyContext';
import { FaSearch } from "react-icons/fa";
import {MdOutlineAddShoppingCart} from "react-icons/md"
import {FaUserLarge} from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Navigate.css';
const NavigationIcons = () => {
    const loggedIn = localStorage.getItem("user");
    const {currentPage, setCurrentpage} = useContext(MyContext);
    const naviagte =  useNavigate();
    const {setLoggedIn} = useContext(MyContext);

    const showToastLoginMessage = () => {
        toast.warning("Login to view cart!", {
          position: toast.POSITION.TOP_CENTER,
        });
    }
    const handleIconChange =(icon)=>{
        naviagte('/');
        setCurrentpage(icon);
    }
    const gotoCart =()=>{
        if(loggedIn){
            handleIconChange('cart');
            naviagte('/Cart-items');
        }
        else{
            showToastLoginMessage();
            naviagte('/login');
        }
    }
    const logOut = ()=>{
        localStorage.removeItem("token");
          setLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    localStorage.removeItem("total"); 
    localStorage.clear();
    handleIconChange('login')
    }
    return (
        <div>
             <div className='bottom-navigation'  > 
                {/* <div>{GoHome} sita </div> */}
                 <div>
                     <a  onClick={() => {handleIconChange('home')}} className={currentPage === 'home' ? 'active' : ''} >    <GoHome/>  </a>
                     <p>Home</p>
                </div>
                <div>
                <a  onClick={() =>gotoCart()} className={currentPage === 'cart' ? 'active' : ''} ><MdOutlineAddShoppingCart/></a>
                    <p>Cart </p>
                </div>
               
                {loggedIn?
                
                <div>
                    <a  onClick={() => {logOut()}} className={currentPage === 'login' ? 'active' : ''} ><span>  <FaUserLarge/></span></a>
                  <p>Logout</p>
                </div>
                :<div>
                    <a  onClick={() =>{ handleIconChange('login'); naviagte('/login')}} className={currentPage === 'login' ? 'active' : ''} ><span>  <FaUserLarge/>!</span></a>    
                    <p> Login </p>
                 </div>}
               
                
              
             </div>
        </div>
    );
};

export default NavigationIcons;