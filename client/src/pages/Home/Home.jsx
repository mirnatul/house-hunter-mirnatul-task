import React, { useEffect, useState } from 'react';

const Home = () => {

    const [allHouse, setAllHouse] = useState([])

    useEffect(() => {
        // const userJson = localStorage.getItem("user");
        // const usertwo = JSON.parse(userJson);
        fetch(`http://localhost:5000/allhouse`)
            .then(res => res.json())
            .then(data => {
                setAllHouse(data);
                console.log(data);
            })
    }, []);

    return (
        <div className='grid lg:grid-cols-3 lg:gap-8 m-10'>
            {
                allHouse.map(singleHouse => <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src={singleHouse.picture} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{singleHouse.name}</h2>
                        <p>{singleHouse.description}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Book Now</button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Home;