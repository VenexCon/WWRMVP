import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewListing } from "../features/listings/listingSlice";
import { decrementListing } from '../features/businessAuth/businessSlice'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'

const CreateListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {isPending} = useSelector((state)=>state.listing)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    phoneNumber:'',
    useBusAddress: true,
    useBusPhone: true,
    address:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onAddressSelect = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      useBusAddress: !formData.useBusAddress,
    }))
  }

  const onPhoneSelect = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      useBusPhone: !formData.useBusPhone
    }))
  }

  /* Backend will deal with the data, i.e. if the useBusAddress is false, then it will use the sent address
  This will be sent in the request */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {title, description, phoneNumber, useBusAddress, useBusPhone, address} = formData
    if(!title || !description || title.length < 5 || description.length < 5) {
        return toast.error('Please complete all fields')
    }

    try {
      let listingData = {title, description, phoneNumber, useBusAddress, address, useBusPhone}
      
      if(address) {
        const response = await fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODING_KEY}`)
      const data = await response.json()
      if(data.results.length === 0) {return toast.error('Address not found')}
      listingData.latitude = data.results[0]?.geometry.location.lat ?? 0
      listingData.longitude = data.results[0]?.geometry.location.lng ?? 0
      listingData.address = data.results[0]?.formatted_address
      }
      
      const listing = await dispatch(createNewListing(listingData));
      
      

      if(listing.error.message !== 'Rejected') {
        toast.success('Listing Created')
        await dispatch(decrementListing())
        navigate('/listing/search')
        //navigate(`/listing/${listing.payload._id}`)
      } else {
        toast.error(listing.error.message)
      }
      
    } catch (error) {
      return toast.error(error.message)
    }
  };

  if(isPending) { return (
    <Spinner />
  )}

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength={50}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={250}
          ></textarea>
        </div>
        {/* Select box for showing or hiding input.  */}
         <div className="flex items-start mt-4 mb-4">
            <div className="flex items-center h-5">
              <input id="useBusPhone" aria-describedby="useSamePhoneNumberAsBusiness" type="checkbox" onChange={onPhoneSelect} defaultChecked ={formData.useBusPhone} 
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="useBusPhone" className="font-light text-gray-500 dark:text-gray-300">
                <p className="text-gray-700">Use same phone number as your business</p>
                </label>
            </div>
        </div>
        {/* If the listing is not using the same address as the business profile, this will show the input */}
        {!formData.useBusPhone && (
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phoneNumber"
            type="text"
            placeholder="+44 1234 56789"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        )}
        {/* User can either use the same address as the logged in business, or choose to enter a new address */}
         <div className="flex items-start mt-4 mb-4">
            <div className="flex items-center h-5">
              <input id="useBusAddress" aria-describedby="useSameAddressAsBusiness" type="checkbox" onChange={onAddressSelect} defaultChecked ={formData.useBusAddress} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="useBusAddress" className="font-light text-gray-500 dark:text-gray-300">
                <p className="text-gray-700">Use same address as your business</p>
                </label>
            </div>
        </div>
         {/* This needs to geo-locate the coordinates for the listing and not use the businesses coordinates. */}
        {!formData.useBusAddress && (
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Address
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            placeholder="10 downing street"
            name="address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>
        )}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
