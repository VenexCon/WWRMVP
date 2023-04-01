import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getMyListings } from '../../features/listings/listingSlice'
import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaGlobe, FaWarehouse, FaPlusCircle, FaArrowCircleRight } from 'react-icons/fa'


function BusinessProfile() {
    
    const dispatch = useDispatch()
    const {business} = useSelector((state)=>state.businessAuth)
    const {accountsListings} = useSelector((state)=>state.listing)

    const [edit, setEdit] =useState(true)

    const selectEdit = () => {
      setEdit((prevState) => !prevState)
    }

    useEffect(() => {
      const fetchListings = async () => {
        const response = await dispatch(getMyListings())
        console.log(response)
      }
      fetchListings()
    }, [dispatch])

    const [registerData, setRegisterData] = useState({
    businessEmail:'',
    businessName:'',
    businessAddress:'',
    })

    const onMutate = (e) => {
      setRegisterData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value
      }))
    }


  return (
     <>
      <div className="flex flex-col gap-4 mt-8 mb-8">
        <div className="flex items-center space-x-2">
          <FaUserAlt className="text-white" />
          <input
            type="text"
            placeholder="Business Name"
            id='businessName'
            defaultValue={business.name}
            name= 'businessName'
            onChange = {onMutate}
            className="bg-white dark:bg-gray-800 border text-white border-gray-400 dark:border-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            disabled = {edit}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-white" />
          <input
            type="email"
            placeholder="Email Address"
            defaultValue = {business.email}
            onChange = {onMutate}
            name='businessEmail'
            className="bg-white dark:bg-gray-800 border text-white border-gray-400 dark:border-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            disabled = {edit}
          />
        </div>
        
        <div className="flex items-center w-full h-fit space-x-2">
          <FaGlobe className="text-white" />
          <textarea name="businessAddress" 
          className={ 'bg-white dark:bg-gray-800 border text-white border-gray-400 dark:border-gray-700 rounded-lg py-2 px-4 block w-full h-20 appearance-none leading-normal resize-none '} 
          onChange = {onMutate}
          id="businessAddress" 
          disabled = {edit}
          placeholder='Business address' 
          defaultValue={business.address} 
          cols="30" rows="10"></textarea>
        </div>
      </div>
      
     {/*  {!edit && (
        <div className="mt-5 mb-5 w-full flex flex-col justify-center items-center">
        <p className='text-md text-white font-bold'>You can now edit your profile</p>
        </div>
      )}
     {edit && (
       <div className="mt-5 mb-10">
        <button className='w-full gap-2 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors duration-300'
        onClick={selectEdit}>
          <FaUserAlt />
          <span>Edit Profile</span>
        </button>
      </div>
     )} */}
     {!edit && (
       <div className="mt-5 mb-10">
        <button className='w-full gap-2 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors duration-300'
        onClick={selectEdit}>
          <FaUserAlt />
          <span>Confirm Profile</span>
        </button>
      </div>
     )}
    {edit && (
      <div className="mt-10 flex flex-col space-y-4 w-full">
          <Link to="/listings" className="w-full">
            <button className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-300">
              <FaArrowCircleRight className="mr-2" /> Browse Listings
            </button>
          </Link>
          <Link to="/listing/new" className="w-full">
            <button className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-colors duration-300">
              <FaPlusCircle className="mr-2" /> Create New Listing
            </button>
          </Link>
        </div>
    )}
    </>
  )
}

export default BusinessProfile