import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

const Signup = () => {

    const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
    })
    const navigate = useNavigate();
    const handleChange =  (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    console.log(signupInfo);
    const handleSignup = async (e) => {
    e.preventDefault();
    const {name, email, password} = signupInfo;
    if(!name || !email || !password) {
        return handleError('name, email and password are required');    
    }
    try{
        const url = "http://localhost:8000/auth/signup"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupInfo)
        });
        const result = await response.json();
        const { success, message, error } = result;
        if (success) {
            handleSuccess(message);
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        }
        else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
           
    } catch (error) {
        handleError(error);

      }
    }
  return (
   <div className='container'>
    <h1>Signup</h1>
    <form onSubmit={handleSignup}>
         <div>
            <label htmlFor='name'>Name</label>
            <input
            onChange={handleChange}
            type='text'
            name='name'
            autoFocus
            placeholder='Enter your name'
            value={signupInfo.name}
            />
        </div>
        <div>
            <label htmlFor='email'>Email</label>
            <input
            onChange={handleChange}
            type='email'
            name='email'
            autoFocus
            placeholder='Enter your email'
            value={signupInfo.email}
            />
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input
            onChange={handleChange}
            type='password'
            name='password'
            autoFocus
            placeholder='Enter your password'
            value={signupInfo.password}
            />
        </div>
        <button>Signup</button>
    <span>Already have an account? Login</span>
    <Link to="/login">Login</Link>
    </form>
    <ToastContainer />
   </div>
  )
}

export default Signup

