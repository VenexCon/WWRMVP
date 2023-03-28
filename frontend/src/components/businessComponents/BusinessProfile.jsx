import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaGlobe, FaWarehouse, FaPlusCircle, FaArrowCircleRight } from 'react-icons/fa'


function BusinessProfile() {
    const {business} = useSelector((state)=>state.businessAuth)


  return (
     <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-8">
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
      <div className="mt-10 flex flex-col space-y-4 w-full">
          <Link to="/listings" className="w-full">
            <button className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-300">
              <FaArrowCircleRight className="mr-2" /> Browse Listings
            </button>
          </Link>
          <Link to="/new-listing" className="w-full">
            <button className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-colors duration-300">
              <FaPlusCircle className="mr-2" /> Create New Listing
            </button>
          </Link>
        </div>
    </>
  )
}

export default BusinessProfile