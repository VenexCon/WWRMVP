import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { FaUser, FaArrowCircleRight } from 'react-icons/fa'

function UserProfile() {
    const {user} = useSelector((state) => state.auth)

  return (
    <>
   <div className="text-white">
    <h1 className='text-xl'>Your Profile</h1>
    <h2>{user.name}</h2>
    <div className="container text-lg text-white">
        <p>{user.address}</p>
        <p>{user.email}</p>
    </div>

    <div className="listings text-xl text-white mt-10">
        Browse Listings
    </div>

   </div>
   </>
  )
}

export default UserProfile