import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

const ListingItem = ({ listing }) => {

  const { business } = useSelector((state) => state.businessAuth);
  const { user } = useSelector((state) => state.auth);


  return (
    <div className="bg-gray-700 border border-purple-600 p-4 rounded-md relative">
      <Link className='pointer-cursor ' to={`/listing/${listing._id}`} >
        <h2 className="text-white text-lg font-bold mb-2">{listing.listingTitle}</h2>
        <p className="text-white text-base w-2/3 max-h-20 overflow-hidden">{listing.listingDescription}</p>
        {(business || user) && (
          <>
        <p className="text-white text-sm mt-2 w-2/3">{listing.listingLocation}</p>
        </>
        )}
        {(!business && !user) && (
          <p className="text-white font-bold text-sm mt-3 w-full">Please Log-in to see exact locations</p>
        )}

      </Link>
      
    </div>
  );
};

export default ListingItem;
