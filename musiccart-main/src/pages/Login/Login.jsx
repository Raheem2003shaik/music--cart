import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/footer/Footer";
import styles from "./Login.module.css"; 
import img from "../../assets/heading.png";
import mobimg from "../../assets/music-logo.png";

const Login = () => {
  const nav = useNavigate();

  const showToastSuccessMessage = (message) => {
    console.log("Toast called");
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showToastFailureMessage = () => {
    toast.error("Invalid Login!", {
    });
  };

  const [credentials, setCredentials] = useState({ input: "", password: "" });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = () => {
    const { input, password } = credentials;

    const loginData = { email: input, mobile: input, password };

    axios
      .post("https://musicart-80cn.onrender.com/login", loginData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", input);
        console.log(response.data);
        showToastSuccessMessage("Login Succcesful!");
        nav("/");
        
      })
      .catch((err) => {
        showToastFailureMessage();
        setError(err.response.data.error);
      });
  };

  function navigateRegister() {
    nav("/register");
  }
  const isSmallScreen = useMediaQuery({ query: "(max-width: 700px)" });
  return (
    <>
    <ToastContainer />
    {isSmallScreen ? ( 
      <div className={styles.mobContainer}>
        <div className={styles.mobCenterContainer}>
          <div className={styles.mobLogo}>
            <img src={mobimg} alt="logo" />
            <p>Musicart</p>
          </div>
        </div>
        <h1 className={styles.mobWelcome}>Welcome</h1>
          <div className={styles.mobSigninDiv}>
            <p >Sign In.</p>
            <div>
            <p className={styles.label}>Enter your Email or Mobile Number</p>
            <input
              type="text"
              className={styles.inputs}
              name="input"
              autoComplete="mail"
              value={credentials.input}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className={styles.label}>Password</p>
            <input
              type="password"
              className={styles.inputs}
              name="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
          <button className={styles.continueBtn} onClick={handleLogin}>
            Continue
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className={styles.policy}>
            By continuing, you agree to Musicart privacy notice and conditions of
            use.
          </p> 
          </div>
          <div className={styles.hrLines}>
          <hr className={styles.leftLine} />
          <span>New to Musicart?</span>
          <hr className={styles.rightLine} />
        </div>

        <button className={styles.mobCreateBtn} onClick={navigateRegister}>
          Create your Musicart account
        </button>
        <Footer />
      </div>
    ) : ( // Render for large screens
      <div className={styles.container}>
        <div className={styles.centerContainer}>
          <div className={styles.logo}>
            <img src={mobimg} alt="logo" /> 
            <p>Musicart</p>
          </div>
        </div>
        <div className={styles.signinDiv}>
          <h1>Sign In</h1>
          <div>
            <p className={styles.label}>Enter your Email or Mobile Number</p>
            <input
              type="text"
              className={styles.inputs}
              name="input"
              autoComplete="mail"
              value={credentials.input}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className={styles.label}>Password</p>
            <input
              type="password"
              className={styles.inputs}
              name="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
          <button className={styles.continueBtn} onClick={handleLogin}>
            Continue
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className={styles.policy}>
            By continuing, you agree to Musicart privacy notice and conditions of
            use.
          </p>
        </div>
        <div className={styles.hrLines}>
          <hr className={styles.leftLine} />
          <span>New to Musicart?</span>
          <hr className={styles.rightLine} />
        </div>

        <button className={styles.createBtn} onClick={navigateRegister}>
          Create your Musicart account
        </button>
        <Footer />
      </div>
    )}
     
  </>
  );
};

export default Login;
