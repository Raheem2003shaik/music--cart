import React from "react";
import styles from "./Signup.module.css";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mobimg from "../../assets/heading.png";
import Footer from "../../components/footer/Footer";

const SignUp = () => {
  const navigate = useNavigate();
  const showToastSuccess = (message) => {
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
  const showToastError = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  

  const [formValues, setFormValues] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, mobile, email, password } = formValues;

    if (!name.trim() || !mobile.trim() || !email.trim() || !password.trim()) {
      showToastError('Please fill out all fields.');
      return;
    }

    // Validate email format (you can use a more sophisticated validation)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToastError('Please enter a valid email address.');
      return;
    }

    // Password length validation (you can customize this)
    if (password.length < 6) {
      showToastError('Password must be at least 6 characters long.');
      return;
    }

    // If all validations pass, make API call
    axios.post(`https://musicart-80cn.onrender.com/register`, {
      name: formValues.name,
      mobile: formValues.mobile,
      email: formValues.email,
      password: formValues.password,
    })
    .then((response) => {
      if (response.data.token) {
        // Registration successful
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", formValues.email);
        navigate('/');
        showToastSuccess('Registration successful.');
      } else if (response.data.error && response.data.error.includes("duplicate key")) {
        // User already exists
        showToastError('User with the same email already exists.');
      } else {
        // Other error
        showToastError('Registration failed. Please try again later.');
      }
    })
    .catch((error) => {
      // API call failed
      showToastError('Registration failed. Please try again later.');
    });
  };
  
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <>
    <ToastContainer/>
    {isSmallScreen?(<div className={styles.mobContainer}>
        <div className={styles.mobCenterContainer}>
          <div className={styles.mobLogo}>
            <img src={mobimg} alt="logo" />
            <p>Musicart</p>
          </div>
        </div>
        <h1 className={styles.mobWelcome}>Welcome</h1>
          <div className={styles.mobSigninDiv}>
            <p >Create Account</p>
            <div>
            <p className={styles.label}>Your Name</p>
            <input
              type="text"
              className={styles.inputs}
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className={styles.label}>Mobile Number</p>
            <input
              type="number"
              className={styles.inputs}
              name="mobile"
              autoComplete="current-password"
              value={formValues.mobile}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className={styles.label}>Email Id</p>
            <input
              type="email"
              className={styles.inputs}
              name="email"
              autoComplete="current-password"
              value={formValues.email}
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
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>
          <p> By enrolling your mobile phone number, you consent to receive automated
        security notifications via text message from Musicart. Message and data
        rates may apply.</p>
          <button className={styles.continueBtn} onClick={handleSubmit}>
            Continue
          </button>
          <p className={styles.policy}>
            By continuing, you agree to Musicart privacy notice and conditions of
            use.
          </p> 
          </div>
          <p>Already have an account?<button className={styles.siginBtn} onClick={()=>navigate('/login')}>Sign in</button> </p>

        
        <Footer />
      </div>):

    (<div className={styles.container}>
    <div className={styles.centerContainer}>
      <div className={styles.logo}>
        <img src={mobimg} alt="logo" />
      </div>
    </div>
    <div className={styles.signinDiv}>
      <h1>Create Account</h1>
      <div>
        <p className={styles.label}>Your Name</p>
        <input
          type="text"
          className={styles.inputs}
          onChange={(e) => handleInputChange(e)}
          name="name"
          autoComplete="name"
          value={formValues.name}
        />
      </div>
      <div>
        <p className={styles.label}>Mobile Number</p>
        <input
          type="number"
          className={styles.inputs}
          name="mobile"
          onChange={(e) => handleInputChange(e)}
          value={formValues.mobile}
        />
      </div>
      <div>
          <p className={styles.label}>Email Id</p>
          <input
            type="email"
            className={styles.inputs}
            onChange={(e) => handleInputChange(e)}
            name="email"
            autoComplete="email"
            value={formValues.email}
          />
        </div>
        <div>
        <p className={styles.label}>Password</p>
        <input
          className={styles.inputs}
          onChange={(e) => handleInputChange(e)}
          type="password"
          name="password"
          autoComplete="current-password"
          value={formValues.password}
        />
        </div>
      <p>
        By enrolling your mobile phone number, you consent to receive automated
        security notifications via text message from Musicart. Message and data
        rates may apply.
      </p>
      <button className={styles.continueBtn} onClick={handleSubmit}>Continue</button>
      <p className={styles.policy}>
        By continuing, you agree to Musicart privacy notice and conditions of
        use.
      </p>
    </div>
    <p>Already have an account?<button className={styles.siginBtn} onClick={()=>navigate('/login')}>Sign in</button> </p>
    <Footer />
  </div>)}
  
  </>
  );
};

export default SignUp;