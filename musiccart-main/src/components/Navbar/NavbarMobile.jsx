import React from 'react';
import './NavbarMobile.css'
const NavbarMobile = () => {
    return (
        <div className='mobile-header'>
            <div className='search-item'> <span> <i className="ri-search-line">  </i> </span> <input type="search" className='mobile-search-bar' placeholder='Search Musicart' /> </div>
        </div>
    );
};

export default NavbarMobile;