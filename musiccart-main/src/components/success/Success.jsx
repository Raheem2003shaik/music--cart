import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import './Success.css';
import heading from '../../assets/heading.png';
import confettiImage from '../../assets/confetti.png';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import NavbarHeader from '../../pages/NavbarHeader';

const Success = () => {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
    const navigate = useNavigate();
    const [confettiActive, setConfettiActive] = useState(false);

    useEffect(() => {
        setConfettiActive(true);
        // Hide confetti after 5 seconds
        const timer = setTimeout(() => {
            setConfettiActive(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="success-page">
            {isDesktopOrLaptop ? <div><img className="imgg" src={heading} /></div> : <NavbarHeader />}

            <center>
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={confettiActive ? 200 : 0}
                    recycle={false}
                />
                <div className="card">
                    <img src={confettiImage} alt="Confetti" />
                    <p><b>Order is placed successfully!</b></p>
                    <p>You will be receiving a confirmation email with order details</p>
                    <br></br>
                    <button className="btn" onClick={() => { navigate('/') }}><b>Go back to Home page</b></button>
                </div>
            </center>
        </div>
    );
};

export default Success;
