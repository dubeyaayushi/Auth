import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8000/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {
                    products && products?.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home


/* Q1: How does fetchProducts know the user is already logged in?
🔍 Let's look at this line:
js
Copy
Edit
'Authorization': localStorage.getItem('token')
Here's what happens step-by-step:

When a user logs in successfully, your app likely stores a token (like a JWT) in localStorage:

js
Copy
Edit
localStorage.setItem('token', 'some_jwt_token_here');
In the Home component, when fetchProducts() is called, it tries to get that token from localStorage and uses it as an Authorization header in the API request.

This:

js
Copy
Edit
const headers = {
    headers: {
        'Authorization': localStorage.getItem('token')
    }
}
tells the backend: “Hey, this user has a token, please verify it and send products only if the token is valid.”

The backend (API at https://deploy-mern-app-1-api.vercel.app/products) uses that token to validate the user. If it's valid, it sends back the list of products.

✅ So, to answer:
It knows the user is logged in because the token is still stored in the browser's localStorage, and the code is sending it to the server in the fetch request.

 */