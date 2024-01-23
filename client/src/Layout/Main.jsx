import React from 'react';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import { Outlet, useLocation } from 'react-router-dom'

const Main = () => {
    const location = useLocation()
    console.log(location);
    return (
        <div>
            {/* here navbar re render */}
            {location.pathname === '/register' || location.pathname === '/login' || <Navbar></Navbar>}
            {/* here navbar do not re render */}
            {/* <Navbar></Navbar> */}

            <Outlet></Outlet>
            {location.pathname === '/register' || location.pathname === '/login' || <Footer></Footer>}
        </div>
    );
};

export default Main;