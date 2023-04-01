import React from 'react';

const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="text-lg font-semibold">{listing.listingTitle}</h2>
      <p className="text-gray-500 text-sm my-2">{listing.listingDescription}</p>
      <p className="text-gray-500 text-sm">{listing.listingLocation}</p>
    </div>
  );
};

export default ListingItem;
