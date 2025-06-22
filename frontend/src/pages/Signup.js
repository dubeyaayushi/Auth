import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError } from '../utils'
const Signup = () => {

    const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
    })

    const handleChange =  (e)=> {
        const {name, value} = e.target;
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
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupInfo)
        })
        
           
    } catch (error) {
        handleError(error);

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
}
export default Signup