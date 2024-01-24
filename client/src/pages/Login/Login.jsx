import React from 'react';
import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {

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

        fetch(`https://server-hazel-theta.vercel.app/login?email=${userInput.email}&password=${userInput.password}`)
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    alert(data.message)
                }
                else {
                    // console.log(data);
                    const userJson = JSON.stringify(data);
                    localStorage.setItem("user", userJson);

                    if (data.role === 'owner') {
                        navigate('/dashboard/ownerhome')
                    }
                    else {
                        navigate('/dashboard/renterhome')
                    }
                }
            })
    }

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content">
                    <div className="card shrink-0 shadow-2xl bg-base-100 w-[500px]">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">

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
                            <input className='btn btn-success mt-6' type="submit" value="Login" />
                            <p>New? <Link to='/register' className='font-bold text-blue-500'>Register</Link></p>
                            <Link to='/' className='btn btn-primary'>Go to Home</Link>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;