import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { FaUser, FaArrowCircleRight } from 'react-icons/fa'


function BusinessProfile() {
    const {business} = useSelector((state)=>state.businessAuth)


  return (
   <>
   <div className="text-white">
    <h1 className='text-xl'>Business Profile</h1>
    <h2>{business.name}</h2>
    <div className="container text-lg text-white">
        <p>{business.address}</p>
        <p>{business.email}</p>
    </div>

    <div className="listings text-xl text-white mt-10">
        Your listings here!
    </div>

   </div>
   </>
  )
}

export default BusinessProfile