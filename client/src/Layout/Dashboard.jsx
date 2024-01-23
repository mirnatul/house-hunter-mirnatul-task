import React from 'react';
import userHook from '../hooks/userHook';
import { Link, Outlet } from 'react-router-dom'

const Dashboard = () => {
    const [user] = userHook();
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    {
                        user?.role === 'owner' ?
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                {/* Sidebar content here */}
                                <Link to='/dashboard/ownerhome' className='font-semibold text-lg mb-2 hover:bg-slate-200 p-2'>Owner Home</Link>
                                <Link to='/dashboard/managehouse' className='font-semibold text-lg mb-2 hover:bg-slate-200 p-2'>Manage House</Link>
                                <Link to='/dashboard/addnewhouse' className='font-semibold text-lg mb-2 hover:bg-slate-200 p-2'>Add New House</Link>
                                <div className='divider'></div>
                                <Link className='font-semibold text-lg mb-2 hover:bg-slate-200 p-2' to='/'>Home</Link>
                            </ul>
                            :
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                {/* Sidebar content here */}
                                <Link to='/dashboard/renterhome' className='font-semibold text-lg mb-2 hover:bg-slate-200 p-2'>Renter Home</Link>
                                <Link to='/dashboard/bookedhouse' className='font-semibold text-lg mb-2 hover:bg-slate-200 p-2'>Booked House</Link>
                                <div className='divider'></div>
                                <Link className='font-semibold text-lg mb-2 hover:bg-slate-200 p-2' to='/'>Home</Link>
                            </ul>
                    }
                </div>
            </div>
        </div>
    );
};

export default Dashboard;