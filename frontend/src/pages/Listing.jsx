import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getSpecificListing} from '../features/listings/listingSlice'


const Listing = () => {
  const { listingId } = useParams();
  const dispatch = useDispatch()
  const {specificListing} = useSelector((state) => state.listing)

  useEffect(() => {
    const fetchListing = async () => {
      const response = await dispatch(getSpecificListing(listingId))
    }

    fetchListing()
  }, [])

 /*  const address = listing ? `${listing.listingLocation}` : '';

  const handleLoad = (event) => {
    const iframe = event.target;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    const script = doc.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.google.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    doc.head.appendChild(script);
    script.onload = () => {
      new window.google.maps.Map(doc.getElementById('map'), {
        center: { lat: listing.listingCoordinates.coordinates[1], lng: listing.listingCoordinates.coordinates[0] },
        zoom: 15,
        mapTypeId: 'roadmap',
      });
    };
  }; */

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {specificListing ?
        <div className="bg-white rounded-lg shadow-md px-8 py-6 my-8 w-full max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">{specificListing.listingTitle}</h1>
          <p className="text-gray-700 text-lg mb-4">{specificListing.listingDescription}</p>
          <div className="relative w-full h-0 overflow-hidden pb-56">
            {/* <iframe
              title="listing-location"
              src={`https://www.google.com/maps/embed/v1/place?q=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
              frameBorder="0"
              className="absolute top-0 left-0 w-full h-full"
              onLoad={handleLoad}
            ></iframe> */}
          </div>
          <p className="text-gray-700 text-lg mt-4">Location: {specificListing.listingLocation}</p>
        </div>
      :
        <p>Loading...</p>
      }
    </div>
  );
};

export default Listing;
