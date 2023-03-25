import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
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

    <Link to ='/listings'>
        <button className="w-full mt-5 flex items-center justify-center gap-x-2 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <p>Browse Listings</p>
            <FaArrowCircleRight />
        </button>
    </Link>
   </div>
   </>
  )
}

export default UserProfile