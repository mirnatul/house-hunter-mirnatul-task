import React from 'react';
import { useForm } from "react-hook-form";
import userHook from '../hooks/userHook';

const AddNewHouse = () => {
    const [user] = userHook();

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.email = user.email
        console.log(data);

        fetch('http://localhost:5000/newhouse', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('New house details added successful!')
                }
            })
    }

    // console.log(watch("example")); // watch input value by passing the name of it


    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content">
                    <div className="card shrink-0 w-[500px] shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">

                            {/* name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">House Name:</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" placeholder="Enter house name..." className="input input-bordered" required />
                            </div>
                            {/* address */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Address:</span>
                                </label>
                                <input {...register("address", { required: true })} type="text" placeholder="Enter address name..." className="input input-bordered" required />
                            </div>
                            {/* city */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">City:</span>
                                </label>
                                <input {...register("city", { required: true })} type="text" placeholder="Enter city name..." className="input input-bordered" required />
                            </div>
                            {/* bedrooms */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Bedrooms:</span>
                                </label>
                                <input {...register("bedrooms", { required: true })} type="number" placeholder="Bedroom no..." className="input input-bordered" required />
                            </div>
                            {/* bathrooms */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Bathrooms:</span>
                                </label>
                                <input {...register("bathrooms", { required: true })} type="number" placeholder="Bathrooms no..." className="input input-bordered" required />
                            </div>
                            {/* room size */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Room Size:</span>
                                </label>
                                <input {...register("room size", { required: true })} type="number" placeholder="Room Size (in sqrfeet)" className="input input-bordered" required />
                            </div>
                            {/* picture */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image URL:</span>
                                </label>
                                <input {...register("picture", { required: true })} type="url" placeholder="Enter room url..." className="input input-bordered" required />
                            </div>
                            {/* availability date */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Availability Date:</span>
                                </label>
                                <input {...register("picture", { required: true })} type="date" placeholder="Enter room url..." className="input input-bordered" required />
                                {/* <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Available</span>
                                        <input {...register("availability", { required: true })} type="radio" name="availability" value="Available" className="radio checked:bg-blue-500" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Not Available</span>
                                        <input {...register("availability", { required: true })} type="radio" name="availability" value="Not available" className="radio checked:bg-blue-500" />
                                    </label>
                                </div> */}
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
                                <input {...register("rent", { required: true })} type="number" placeholder="Enter the rent..." className="input input-bordered" required />
                            </div>
                            {/* phone number - only bd */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number:</span>
                                </label>
                                <input {...register("phone", { required: true })} type="phone" placeholder="Enter your phone number" className="input input-bordered" required />
                            </div>
                            {/* description */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description:</span>
                                </label>
                                <textarea {...register("description", { required: true })} className="textarea textarea-bordered" placeholder="Enter description..."></textarea>
                            </div>

                            <input className='btn btn-primary' type="submit" value="Add New House" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewHouse;