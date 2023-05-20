import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaArrowCircleRight, FaLockOpen } from 'react-icons/fa'


function PricingCard({title, description, price}) {
  return (
  <div class="max-w-md rounded-lg md:w-2/3 h-90 overflow-hidden shadow-lg bg-blue-700 text-white border border-black">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 ">{title}</div>
      <p class=" text-base text-white ">
        {description}
      </p>
    </div>
    <div class="px-6 pt-4 mt-10 pb-2">
      <span class="inline-block bg-white rounded-full px-3 py-1 text-lg mb-4 font-semibold text-gray-700 mr-2 mb-2">{price}</span>
    </div>
    <Link to={'/register'} className='w-3/5 mb-3 mx-auto flex items-center justify-center gap-x-2 text-blue-600 bg-white font-medium rounded-lg text-lg x-5 py-2.5 text-center hover:border hover:border-black'>
      <button className="w-2/3 flex items-center align-middle justify-center font-bold gap-x-2 ">
      <p>
          Sign-up!
      </p>
      </button>
      </Link>
 </div>
  )
}

export default PricingCard