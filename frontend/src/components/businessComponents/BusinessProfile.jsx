import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { FaUser, FaArrowCircleRight, FaWarehouse } from 'react-icons/fa'


function BusinessProfile() {
    const {business} = useSelector((state)=>state.businessAuth)


  return (
   <>
   {/* Change these for inputs and allow editing. */}
   <div className="text-white">
    <h1 className='text-xl'>Business Profile</h1>
    <h2>{business.name}</h2>
    <div className="container text-lg text-white">
        <p>{business.address}</p>
        <p>{business.email}</p>
    </div>

       <Link to ='/listings'>
        <button className="w-full mt-5 flex items-center justify-center gap-x-2 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <p>Browse Listings</p>
            <FaArrowCircleRight />
        </button>
    </Link>
    <Link to ='/new-listing'>
        <button className="w-full mt-5 flex items-center justify-center gap-x-2 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <p>Create Listing</p>
            <FaWarehouse/>
        </button>
    </Link>

    <div className="listings text-xl text-white mt-10">
        Your listings here!
    </div>

   </div>

   </>
  )
}

export default BusinessProfile