import React from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
// import { IoChevronUpSharp } from "react-icons/io5";

const Register = () => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        // console.log(data)

        const userInput = { ...data }

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInput)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("user created successfully")
                    const userJson = JSON.stringify(userInput);
                    localStorage.setItem("user", userJson);
                    navigate(1)
                    navigate('/')
                }
                else {
                    alert(data.message)
                }
            })
    }

    // console.log(watch("example")) // watch input value by passing the name of it

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content">
                    <div className="card shrink-0 shadow-2xl bg-base-100 w-[500px]">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name:</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" placeholder="Enter your full name..." className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email:</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="Enter your email..." className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password:</span>
                                </label>
                                <input {...register("password", { required: true })} type="password" placeholder="Enter your password..." className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number:</span>
                                </label>
                                <input {...register("phone", { required: true })} type="" placeholder="Enter your mobile number..." className="input input-bordered" required />
                            </div>
                            <div className='my-3'>
                                <label>User Role:</label>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">I'm a renter</span>
                                        <input {...register("role", { required: true })} value="renter" type="radio" name="role" className="radio checked:bg-blue-500" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">I'm an owner</span>
                                        <input {...register("role", { required: true })} value="owner" type="radio" name="role" className="radio checked:bg-blue-500" />
                                    </label>
                                </div>
                                {
                                    errors.role &&
                                    <div className='inline-flex gap-2 animate-bounce'>
                                        <p className='font-bold text-red-500'>Role field is empty</p>
                                        {/* <p><IoChevronUpSharp size={30} /></p> */}
                                    </div>
                                }
                            </div>
                            <input className='btn btn-success mt-6' type="submit" value="Register" />
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;