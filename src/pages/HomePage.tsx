import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

function HomePage() {

    useEffect(()=>{
        console.log("test")
    },[])
    return (
        <div>
            <h1>Welcome to the Web App</h1>
            <Link to="/dashboard">Go to Dashboard</Link>
        </div>
    );
}

export default HomePage;
