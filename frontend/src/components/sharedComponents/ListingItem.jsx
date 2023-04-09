import React from 'react';
import { Link } from 'react-router-dom';

const ListingItem = ({ listing }) => {
  return (
    <div className="bg-gray-700 border border-purple-600 p-4 rounded-md relative">
      <Link className='pointer-cursor ' to={`/listing/${listing._id}`} >
        <h2 className="text-white text-lg font-bold mb-2">{listing.listingTitle}</h2>
        <p className="text-white text-base w-2/3">{listing.listingDescription}</p>
        <p className="text-white text-sm mt-2 w-2/3">{listing.listingLocation}</p>
      </Link>
      
    </div>
  );
};

export default ListingItem;
