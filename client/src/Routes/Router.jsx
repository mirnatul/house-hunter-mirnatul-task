import { createBrowserRouter } from "react-router-dom";
import AddNewHouse from "../Dashboard/AddNewHouse";
import BookedHouse from "../Dashboard/BookedHouse";
import ManageHouse from "../Dashboard/ManageHouse";
import OwnerHome from "../Dashboard/OwnerHome";
import RenterHome from "../Dashboard/RenterHome";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'ownerhome',
                element: <OwnerHome></OwnerHome>
            },
            {
                path: 'renterhome',
                element: <RenterHome></RenterHome>
            },
            {
                path: 'addnewhouse',
                element: <AddNewHouse></AddNewHouse>
            },
            {
                path: 'bookedhouse',
                element: <BookedHouse></BookedHouse>
            },
            {
                path: 'managehouse',
                element: <ManageHouse></ManageHouse>
            }
        ]
    }
]);