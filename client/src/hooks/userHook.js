import React, { useEffect, useState } from 'react';

const userHook = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userJson = localStorage.getItem("user");
        if (userJson) {
            setUser(JSON.parse(userJson));
        }
    }, []);
    return [user]
};

export default userHook;