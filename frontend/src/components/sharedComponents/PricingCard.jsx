import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaArrowCircleRight, FaLockOpen } from 'react-icons/fa'


function PricingCard() {
  return (
    <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-blue-700 text-white border border-black">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">New User Offer</div>
    <p class="text-gray-700 text-base text-white">
        As a new WebApp we are offering unlimited listings for £7.50 per month 
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">£7.50</span>
  </div>
  <Link to={'/register'} className='w-4/5 mb-3 mx-auto flex items-center justify-center gap-x-2 text-white bg-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
    <button className="w-1/3 flex items-center align-middle justify-center text-blue-600 font-bold gap-x-2">
    <p>
        Sign-Up
    </p>
    </button>
    </Link>
 </div>
  )
}

export default PricingCard