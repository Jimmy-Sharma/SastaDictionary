import React, { useState } from 'react'
import '../Styling/Login.css'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
const SignUp = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp = () => {
        let obj = { name, email, password }
        if (!name && !email && !password) {
            toast.error("Please enter all the valid fields to login")
        } else if (!email) {
            toast.error("Please enter your email to login")
        } else if (!password) {
            toast.error("Please enter password to login")
        } else if (email && password) {
            axios.post("http://localhost:4550/users/register", obj)
                .then((res) => {
                    toast.success("User Registered Successfully")
                    navigate('/')
                })
                .catch((res) => {
                    toast.error("Email already registered, Please use a diffrent Email!!")
                })
        } else {
            toast.error("Not able to SignUp, Please try again!!")
        }
    }

    const handleToggle = () => {
        navigate("/")
    }
    return (
        <div id='container'>
            <div id='maincontainer'>
                <div id='heading'><h1>Sign Up</h1></div>
                <div id='loginForm'>
                    <input type="text" className='loginFormInput' placeholder='Enter Name' onChange={(e) => { setName(e.target.value) }} />
                    <input type="email" className='loginFormInput' placeholder='Enter Email' onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" className='loginFormInput' placeholder='Enter Password' onChange={(e) => { setPassword(e.target.value) }} />
                    <button id='loginFormBTN' onClick={handleSignUp}>Sign Up</button>
                </div>
                <div id='dontHaveAC'>
                    <p>Existing User?</p>
                    <p id='toggleBTN' onClick={handleToggle}>LogIn</p>
                </div>
            </div>
        </div>
    )
}

export default SignUp