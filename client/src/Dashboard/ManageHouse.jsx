import React, { useEffect, useState } from 'react';
import userHook from '../hooks/userHook';
import { MdSystemUpdateAlt, MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";

import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const ManageHouse = () => {
    const [user] = userHook()
    const [isLoading, setIsLoading] = useState(false)
    const [houseData, setHouseData] = useState([])

    const [modalData, setModalData] = useState({})



    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        data.email = user.email
        // console.log(data);

        fetch(`http://localhost:5000/newhouse/${modalData._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('data updated successfully')
                }
            })
    }


    useEffect(() => {
        const userJson = localStorage.getItem("user");
        const usertwo = JSON.parse(userJson);
        fetch(`http://localhost:5000/newhouse?email=${usertwo.email}`)
            .then(res => res.json())
            .then(data => {
                setHouseData(data);
                // console.log(user.email);
                setIsLoading(false)
            })
    }, []);



    const handleUpdate = (singleHouse) => {

        setModalData(singleHouse)
        document.getElementById('abc').showModal()
        // console.log(document.getElementById(id).showModal());

    }

    return (
        <div className='w-full'>
            {
                isLoading ? <p>Loading...</p> :
                    <div className="overflow-x-auto">
                        <h2 className='text-center font-bold text-4xl mb-6'>Manage House</h2>
                        <p>NB: You need to to close the modal manually after update data and also you have to touch all the field because of I am using defaultValue. I can fix that, but In a short time I am unable for now.</p>
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

            {/* modal */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_4').showModal()}>open modal</button> */}
            <dialog id='abc' className="modal">
                <div className="modal-box max-w-[700px]">
                    <div className="card shrink-0 w-[500px] shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body mx-auto w-full">

                            {/* name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">House Name:</span>
                                </label>
                                <input defaultValue={modalData.name} {...register("name", { required: true })} type="text" placeholder="Enter house name..." className="input input-bordered" required />
                            </div>
                            {/* address */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Address:</span>
                                </label>
                                <input defaultValue={modalData.address} {...register("address", { required: true })} type="text" placeholder="Enter address name..." className="input input-bordered" required />
                            </div>
                            {/* city */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">City:</span>
                                </label>
                                <input defaultValue={modalData.city} {...register("city", { required: true })} type="text" placeholder="Enter city name..." className="input input-bordered" required />
                            </div>
                            {/* bedrooms */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Bedrooms:</span>
                                </label>
                                <input defaultValue={modalData.bedrooms} {...register("bedrooms", { required: true })} type="number" placeholder="Bedroom no..." className="input input-bordered" required />
                            </div>
                            {/* bathrooms */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Bathrooms:</span>
                                </label>
                                <input defaultValue={modalData.bathrooms} {...register("bathrooms", { required: true })} type="number" placeholder="Bathrooms no..." className="input input-bordered" required />
                            </div>
                            {/* room size */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Room Size:</span>
                                </label>
                                <input defaultValue={modalData.size} {...register("size", { required: true })} type="number" placeholder="Room Size (in sqrfeet)" className="input input-bordered" required />
                            </div>
                            {/* picture */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image URL:</span>
                                </label>
                                <input defaultValue={modalData.picture} {...register("picture", { required: true })} type="url" placeholder="Enter room url..." className="input input-bordered" required />
                            </div>
                            {/* availability date */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Availability Date:</span>
                                </label>
                                <input defaultValue={modalData.availability} {...register("availability", { required: true })} type="date" placeholder="Enter room url..." className="input input-bordered" required />
                            </div>
                            {
                                errors.availability &&
                                <div className='inline-flex gap-2 animate-bounce'>
                                    <p className='font-bold text-red-500'>Availability field is empty</p>
                                </div>
                            }
                            {/* rent per month */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Rent:</span>
                                </label>
                                <input defaultValue={modalData.rent} {...register("rent", { required: true })} type="number" placeholder="Enter the rent..." className="input input-bordered" required />
                            </div>
                            {/* phone number - only bd */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number:</span>
                                </label>
                                <input defaultValue={modalData.phone} {...register("phone", { required: true })} type="phone" placeholder="Enter your phone number" className="input input-bordered" required />
                            </div>
                            {/* description */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description:</span>
                                </label>
                                <textarea defaultValue={modalData.description} {...register("description", { required: true })} className="textarea textarea-bordered" placeholder="Enter description..."></textarea>
                            </div>

                            <input className='btn btn-primary' type="submit" value="Update House Data" />
                            {/* <button className="btn">Close</button> */}
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ManageHouse;