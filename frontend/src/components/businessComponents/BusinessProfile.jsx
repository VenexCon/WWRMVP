import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaGlobe, FaWarehouse } from 'react-icons/fa'


function BusinessProfile() {
    const {business} = useSelector((state)=>state.businessAuth)


  return (
     <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <div className="flex items-center space-x-2">
          <FaUserAlt className="text-gray-600" />
          <input
            type="text"
            placeholder="Business Name"
            className="bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            disabled
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-gray-600" />
          <input
            type="email"
            placeholder="Email Address"
            className="bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            disabled
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaPhoneAlt className="text-gray-600" />
          <input
            type="tel"
            placeholder="Phone Number"
            className="bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            disabled
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaGlobe className="text-gray-600" />
          <input
            type="url"
            placeholder="Website URL"
            className="bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            disabled
          />
        </div>
      </div>
    </>
  )
}

export default BusinessProfile