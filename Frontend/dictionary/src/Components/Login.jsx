import React, { useState } from 'react'
import '../Styling/Login.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        let obj = { email, password }
        if (!email && !password) {
            toast.error("Please enter all the valid fields to login")
        } else if (!email) {
            toast.error("Please enter your email to login")
        } else if (!password) {
            toast.error("Please enter password to login")
        } else if (email && password) {
            axios.post("http://localhost:4550/users/login", obj)
                .then((res) => {
                    console.log(res.data)
                    let data=res.data
                    localStorage.setItem("sastaDictionary",JSON.stringify(data))
                    toast.success("User Logged in Successfully")
                    navigate("/dictionary")
                })
                .catch((res)=>{
                    toast.error("Not an existing user, Please SignUp")
                })
        } else {
            toast.error("Error")
        }
    }

    const handleToggle = () => {
        navigate("/register")
    }
    return (
        <div id='container'>
            <div id='maincontainer'>
                <div id='heading'><h1>Log In</h1></div>
                <div id='loginForm'>
                    <input type="email" className='loginFormInput' placeholder='Enter Email' onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" className='loginFormInput' placeholder='Enter Password' onChange={(e) => { setPassword(e.target.value) }} />
                    <button id='loginFormBTN' onClick={handleLogin}>Log In</button>
                </div>
                <div id='dontHaveAC'>
                    <p>Don't have an account?</p>
                    <p id='toggleBTN' onClick={handleToggle}>SignUp</p>
                </div>
            </div>
        </div>
    )
}

export default Login