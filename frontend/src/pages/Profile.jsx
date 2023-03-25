import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {login} from '../features/auth/authSlice.js'
import { useSelector, useDispatch } from 'react-redux'
import { FaUser, FaArrowCircleRight } from 'react-icons/fa'
import BusinessProfile from '../components/businessComponents/BusinessProfile.jsx'
import UserProfile from '../components/userComponents/UserProfile.jsx'

function Profile() {

const {user} =useSelector((state)=> state.auth)
const {business} = useSelector((state)=>state.businessAuth)



  return (
     <>
    <section className="bg-grey dark: bg-gray-900 min-h-screen " >
      <div className=" flex flex-col mx-auto sm:h-full md:min-h-full lg:py-0 items-center justify-center w-full bg-rounded rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 ">
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Your Profile
          </h1>
          {user && (<UserProfile />) }
          {business && (<BusinessProfile />)}
                        
        </div>
      </div>
    </section>
    
    </>
  )
}

export default Profile