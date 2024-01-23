import React, { useEffect, useState } from 'react';
import userHook from '../hooks/userHook';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'



const Navbar = () => {
    const [user] = userHook()

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login')
        alert('user is logged out')
    }

    const navOptions = <>
        <Link to="/"><a>Home</a></Link>
    </>

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div>
                        {
                            user ?
                                <div className='flex items-center gap-2'>
                                    <p>{user?.name}</p>
                                    <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
                                </div>
                                : <Link className='btn btn-primary' to='/login'>Login</Link>
                        }
                    </div>
                    {/* <p>{user?.name}</p> */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;