
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify'
import {useNavigate, useParams} from 'react-router-dom'
import { editSpecificListing, getSpecificListing } from "../features/listings/listingSlice";
import Spinner from '../components/Spinner'

const EditListing = () => {
 const dispatch = useDispatch()
 const navigate = useNavigate()

 const { listingId } = useParams()

 useEffect(() => {
    const fetchListing = async () => {
      const listing = await dispatch(getSpecificListing(listingId)); 
      if(listing) {
        const newListing = listing.payload
        setFormData({
          _id:newListing._id,
          title:newListing.listingTitle,
          description:newListing.listingDescription,
          phoneNumber:newListing.listingPhone,
          address:newListing.listingLocation,
          longitude:newListing.listingCoordinates.coordinates[0],
          latitude:newListing.listingCoordinates.coordinates[1],
          business:newListing.business
        })
      }
    }
    fetchListing();
  }, [dispatch, listingId]);

 const {specificListing, isPending} = useSelector((state) => state.listing)
  const [formData, setFormData] = useState({
    _id:'',
    title:'' ,
    description: '',
    phoneNumber:'',
    address:'',
    business:'',
    longitude: 0,
    latitude:0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  /*  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {title, description, phoneNumber, address, latitude, longitude,business} = formData
    if(!title || !description || !phoneNumber || title.length < 5 || description.length < 5) {
        return toast.error('Please complete all fields')
    }

    try {
      let listingData = {title, business, description, phoneNumber, address, latitude, longitude}

      if(address !== specificListing.listingLocation) {
        const response = await fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODING_KEY}`)
        const data =await response.json()
        listingData.latitude = data.results[0]?.geometry.location.lat ?? 0
        listingData.longitude = data.results[0]?.geometry.location.lng ?? 0
        listingData.address = data.results[0]?.formatted_address
      }

      const updatedListing = await dispatch(editSpecificListing({listingData, listingId}));
      toast.success(`Listing Edited`)
      navigate(`/listing/${listingId}`)
    } catch (error) {
      return toast.error(error.message)
    }
  };

  if(isPending) {
    return <Spinner />
  }

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
          ></textarea>
        </div>
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
       
         {/* This needs to geo-locate the coordinates for the listing and not use the businesses coordinates. */}
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
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Confirm Details
          </button>
        </div>
      </form>
    </div>
  );
};



export default EditListing