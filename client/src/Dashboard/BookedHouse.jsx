import React, { useEffect, useState } from 'react';
import { MdSystemUpdateAlt, MdDelete } from "react-icons/md";
import userHook from './../hooks/userHook';

const BookedHouse = () => {
    const [user] = userHook()
    const [isLoading, setIsLoading] = useState(false)
    const [houseData, setHouseData] = useState([])


    useEffect(() => {
        const userJson = localStorage.getItem("user");
        const usertwo = JSON.parse(userJson);
        fetch(`http://localhost:5000/bookings?email=${usertwo.email}`)
            .then(res => res.json())
            .then(data => {
                setHouseData(data);
                // console.log(user.email);
                setIsLoading(false)
            })
    }, []);


    return (
        <div className='w-full'>
            {
                isLoading ? <p>Loading...</p> :
                    <div className="overflow-x-auto">
                        <h2 className='text-center font-bold text-4xl mb-6'>Booked House</h2>
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image, Name, and City</th>
                                    <th>Bedroom, Bathroom</th>
                                    <th>Rent</th>
                                    <th>Area</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    houseData?.map((singleHouse, index) => <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={singleHouse.picture} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{singleHouse.name}</div>
                                                    <div className="text-sm opacity-50">{singleHouse.city}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{singleHouse.bedrooms}, {singleHouse.bathrooms}</td>
                                        <td>{singleHouse.rent} tk</td>
                                        <td>{singleHouse.size} sqft</td>
                                        <td className='flex gap-2 mt-3 items-center'>
                                            <div onClick={() => handleUpdate(singleHouse)} className='cursor-pointer'><MdSystemUpdateAlt size={24}></MdSystemUpdateAlt></div>
                                            <div className='cursor-pointer'><MdDelete size={24}></MdDelete></div>
                                        </td>
                                    </tr>)

                                }
                            </tbody>

                        </table>
                    </div>
            }
        </div>
    );
};

export default BookedHouse;