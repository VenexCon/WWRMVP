import React, { useEffect, useState } from 'react';

import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpecificListing, deleteSpecificListing } from '../features/listings/listingSlice';
import { FaPhone, FaEnvelope, FaPencilAlt, FaTrash } from 'react-icons/fa';
import {toast} from 'react-toastify'


const Listing = () => {
  const navigate = useNavigate()
  const { listingId } = useParams();
  const dispatch = useDispatch();
  const { specificListing } = useSelector((state) => state.listing);
  const { business } = useSelector((state) => state.businessAuth);
  const { user } = useSelector((state) => state.auth);
  const [showMap, setShowMap] = useState(false);
  const [ownTicket, setOwnTicket] =useState(false)

  useEffect(() => {
    const fetchListing = async () => {
      const response =  await dispatch(getSpecificListing(listingId));
      if(response.payload.business === business._id) {
        setOwnTicket(true)
      } 
    };
    fetchListing();
  }, []);

  const address = specificListing ? `${specificListing.listingLocation}` : '';

  
    const handleLoad = async (event) => {
    const iframe = event.target;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    const script = doc.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.google.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    doc.head.appendChild(script);
    script.onload = async () => {
      const {Map} = await window.google.maps.Map
      new Map(doc.getElementById('map'), {
        center: { lat: specificListing.listingCoordinates.coordinates[1], lng: specificListing.listingCoordinates.coordinates[0] },
        zoom: 15,
        mapTypeId: 'roadmap',
      });
    };
  };
  
  

    const handlePhoneClick = () => {
    window.location.href = `tel:${specificListing.listingPhone}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${specificListing.listingEmail}`;
  };

  const handleDeleteClick = async () => {
    const business = specificListing.business
    try {
     const deleted = await dispatch(deleteSpecificListing(listingId, business))
      if(!deleted.payload) {
      toast.success('Listing deleted')
      navigate('/listing/search')
    } else {
      return toast.error('Listing could not be deleted')
    }
    } catch (error) {
      return toast.error(error.message)
    }

  }

  return (
    <div className=" flex flex-col items-center justify-center min-h-fit bg-gray-100">
      {specificListing ? (
        <div className="bg-white rounded-lg shadow-md px-8 py-6 my-8 w-full max-w-3xl">
          {ownTicket && (
            <div className=" flex gap-5 w-full justify-end mt-3 mb-3">
            <Link className=' ' to={`/listing/${specificListing._id}/edit`}>
        <FaPencilAlt className='text-gray-700 text-xl mr-2 hover:text-green-600'/>
      </Link>
      <button className='' onClick={handleDeleteClick}>
        <FaTrash className='text-gray-700 text-xl hover:text-red-600'/>
      </button>
      </div>
          )}
          <h1 className="text-4xl font-bold mb-4">{specificListing.listingTitle}</h1>
          <p className="text-gray-700 text-lg mb-4">Description: {specificListing.listingDescription}</p>
          <div className="flex flex-col justify-between border-b-2 pb-4 mb-4">
            <div>
              <p className="text-gray-700 text-lg">Location: {specificListing.listingLocation}</p>
              <p className='text-gray-700 text-lg mt-3'>Click the Links below to contact the creator</p>
                <p className="text-gray-700 text-lg mt-2">
                <FaPhone className="inline mr-2 cursor-pointer" onClick={handlePhoneClick} />
                {specificListing.listingPhone}
              </p>
              <p className="text-gray-700 text-lg">
                <FaEnvelope className="inline cursor-pointer mr-2" onClick={handleEmailClick} />
                {specificListing.listingEmail}
              </p>
            </div>
            <button
              className="bg-purple-600 hover:bg-purple-700 mt-5 w-1/4 text-white rounded-lg px-4 py-2"
              onClick={() => setShowMap(!showMap)}
            >
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
          </div>
          {(showMap && (user || business)) && (
            <div className="relative w-full h-0 overflow-hidden pb-56">
              <iframe
                title="listing-location"
                src={`https://www.google.com/maps/embed/v1/place?q=${address}&key=${process.env.REACT_APP_GEOCODING_KEY}`}
                frameBorder="0"
                className="absolute bottom-0 right-0 w-full h-full"
                onLoad={handleLoad}
              ></iframe>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Listing;
