import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css"; 
import Calllogo from '../../assets/Call.png';
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
import { useContext } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(MyContext);
  
  const logOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    localStorage.removeItem("total");
    localStorage.clear();
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [setLoggedIn]); // setLoggedIn is a dependency of useEffect

  return (
    <div className={styles.header}>
      <div className={styles["call-info"]}>
        <img src={Calllogo} alt='call-logo' />
        <div>912121131313 </div>
      </div>
      <span>Get 50% off on selected items &nbsp; | &nbsp; Shop Now</span>
      {loggedIn ? (
        <h3>
          <Link
            className={styles.header_login_links}
            onClick={() => {
              logOut();
            }}
          >
            Logout
          </Link>
        </h3>
      ) : (
        <div>
          <Link className={styles.header_login_links} to={'/login'}>Login</Link>
          <span className={styles.header_login_links}> &nbsp; &nbsp; | &nbsp;&nbsp; </span>
          <Link className={styles.header_login_links} to={'/register'}>SignUp</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
