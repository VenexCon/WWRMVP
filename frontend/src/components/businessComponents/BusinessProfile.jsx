import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getMyListings } from '../../features/listings/listingSlice'
import { deleteBusiness,} from '../../features/businessAuth/businessSlice'
import ListingItem from '../sharedComponents/ListingItem'
import { FaUserAlt, FaEnvelope,FaCog, FaWallet,FaPlusCircle, FaArrowCircleRight, FaLocationArrow } from 'react-icons/fa'
import DeleteModal from '../sharedComponents/DeleteModal';
import Cookies from 'js-cookie';
import PriceModal from '../sharedComponents/PriceModal'



function BusinessProfile() {
    
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const {business} = useSelector((state)=>state.businessAuth)
    const {accountsListings} = useSelector((state)=>state.listing)
    //not currently used due to no 2FA on email confirm.
    const [edit, setEdit] =useState(true)
    //modal state.
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPriceModal, setShowPriceModal] = useState(false);
    const {subscriptionType,activeSubscription,  listingAmount, businessAddress, businessEmail, businessName} = business


    //Not currently used,. 
    const selectEdit = () => {
      setEdit((prevState) => !prevState)
    }

    useEffect(() => {
      const fetchListings = async () => {
        return await dispatch(getMyListings())
      }
      fetchListings()
    }, [dispatch])


    //Not currently used, will be used when 2FA is added for confirming email address.
    const [registerData, setRegisterData] = useState({
    businessEmail:'',
    businessName:'',
    businessAddress:'',
    })

    //Not current used, due to above reason.
    const onMutate = (e) => {
      setRegisterData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value
      }))
    }


  //This will display the modal only
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    };

  const handleSubscriptionClick = () => {
    setShowPriceModal(true)
  }

  //this will dispatch the deleteBusiness action from slice.
  const handleConfirmDelete = async () => {
      dispatch(deleteBusiness())
      setShowDeleteModal(false);
      toast.success('Account Deleted')
      navigate('/*')
  };

  //customer portal session. 
  const subscribeToPortalSession = async () => {
     toast.info('Redirecting to Customer Portal')
    const token = Cookies.get('token');
  try {
    const response = await fetch('api/stripe/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         "Authorization": `Bearer ${token}`,
      },
    });
    const body = await response.json()
    console.log(body.url)
    window.location.href = body.url
    
  } catch (error) {
    // Handle fetch error
    console.log('Fetch error:', error);
  }
};

  return (
     <>
      <div className="flex flex-col gap-4 mt-8 mb-8">
        <div className="flex flex-col sm:flex-row w-full">
             <div className="w-full flex  flex-row text-white font-semibold  py-1 px-1 rounded-md ">
              <p className='text-white'>Plan Type :</p>
              <p className='text-blue-600 px-4'>{ subscriptionType ? subscriptionType : 'Basic'}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full">
             <div className="w-full flex  flex-row text-white font-semibold  py-1 px-1 rounded-md ">
              <p className='text-white'>Listings Remaining:</p>
              <p className='text-blue-600 px-4'>{listingAmount}</p>
            </div>
          </div>
        <div className="flex items-center space-x-2">
          <FaUserAlt className="text-white" />
          <input
            type="text"
            placeholder="Business Name"
            id='businessName'
            defaultValue={businessName}
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
            defaultValue = {businessEmail}
            onChange = {onMutate}
            name='businessEmail'
            className="bg-white dark:bg-gray-800 border text-white border-gray-400 dark:border-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            disabled = {edit}
          />
        </div>
        
        <div className="flex items-center w-full h-fit space-x-2">
          <FaLocationArrow className="text-white" />
          <textarea name="businessAddress" 
          className={ 'bg-white dark:bg-gray-800 border text-white border-gray-400 dark:border-gray-700 rounded-lg py-2 px-4 block w-full h-20 appearance-none leading-normal resize-none '} 
          onChange = {onMutate}
          id="businessAddress" 
          disabled = {edit}
          placeholder='Business address' 
          defaultValue={businessAddress} 
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
          <Link to="/listing/search" className="w-full">
            <button className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-300">
              <FaArrowCircleRight className="mr-2" /> Browse Listings
            </button>
          </Link>
          <Link to="/listing/new" className="w-full">
            <button className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-colors duration-300">
              <FaPlusCircle className="mr-2" /> Create New Listing
            </button>
          </Link>

          <button
            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors duration-300"
            onClick={handleDeleteClick}
          >
            <FaCog className="mr-2" /> Delete Account
          </button>
        </div>
    )}
     {(activeSubscription === false) && (
        <>
      <input type="hidden" name="lookup_key"  />
      <button onClick={handleSubscriptionClick} id="checkout-and-portal-button" type="submit" className='w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-300'>
        <FaWallet className='mr-2' />
        Subscribe
      </button> </>)}
       {(activeSubscription === true) &&(
       <>
       <input type="hidden" name="lookup_key"  />
      <button onClick={subscribeToPortalSession} id="checkout-and-portal-button" type="submit" className='w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-300'>
        <FaWallet className='mr-2' />
        Manage Subscription
      </button>
      </>)}
    <div className="w-full flex  flex-row text-white font-semibold  py-1 px-1 rounded-md ">
              <p className='text-white'>My Listings :</p>

            </div>
    {accountsListings.length > 0 ? (accountsListings.map((listing) => (
      <ListingItem key={listing._id} listing = {listing}  />
    ))) : (<p className='text-white w-full items-center flex bg-gray-700 border border-purple-600 p-4 rounded-md'>You have no listings</p>)}
    <DeleteModal
      isOpen={showDeleteModal}
      //in-line func for closing modal. 
      onClose={() => setShowDeleteModal(false)}
      onConfirmDelete={handleConfirmDelete}
    />
    <PriceModal 
      isOpen={showPriceModal}
      onClose={()=> setShowPriceModal(false)}
      />
    </>
  )
}

export default BusinessProfile