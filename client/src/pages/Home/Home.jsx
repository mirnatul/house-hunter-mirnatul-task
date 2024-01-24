import React, { useEffect, useState } from 'react';
import userHook from '../../hooks/userHook';

const Home = () => {
    const [user] = userHook()

    const [allHouse, setAllHouse] = useState([])

    useEffect(() => {
        // const userJson = localStorage.getItem("user");
        // const usertwo = JSON.parse(userJson);
        fetch(`http://localhost:5000/allhouse`)
            .then(res => res.json())
            .then(data => {
                setAllHouse(data);
                // console.log(data);
            })
    }, []);

    const handleBook = (singleHouse) => {
        const userJson = localStorage.getItem("user");
        if (!userJson) {
            alert('Login first')
            return
        }
        const userTwo = JSON.parse(userJson);
        singleHouse.renterEmail = userTwo.email
        singleHouse.renterName = userTwo.name
        singleHouse.renterPhone = userTwo.phone
        fetch(`http://localhost:5000/bookings`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(singleHouse)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('House bookings successful!')
                }
            })
    }

    return (
        <div className='grid lg:grid-cols-3 lg:gap-8 m-10'>
            {
                allHouse.map(singleHouse => <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src={singleHouse.picture} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{singleHouse.name}</h2>
                        <p>{singleHouse.description}</p>
                        <div className="card-actions justify-end">
                            {user?.role === 'owner' && <p className='text-blue-500 text-lg font-semibold'>Owner can't book!</p>}
                            {user?.role === 'owner' || <button onClick={() => handleBook(singleHouse)} className="btn btn-primary">Book Now</button>}
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Home;