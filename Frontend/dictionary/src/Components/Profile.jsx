import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("sastaDictionary"))
    setName(localData.name)
    setEmail(localData.email)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("sastaDictionary");
    toast.success("Logged Out Successfully")
    navigate('/')
  }
  return (
    <>
      <Navbar />
      <div id='dictionaryContainer'>
        <div id="dictionaryMainContainer">
          <h1 id='dictionaryMainHeading'>Profile</h1>
          <div id="dictionarySearchContainer">
            <h3>Name: {name}</h3>
            <h3>Email: {email}</h3>
            <button id='dictionaryWordSearchBTN' onClick={handleLogout}>LogOut</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile