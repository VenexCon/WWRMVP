import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ListingItem from '../components/sharedComponents/ListingItem'
import SearchBar from '../components/sharedComponents/SearchBar'
import { getMyListings } from '../features/listings/listingSlice'
import { FaSearch} from 'react-icons/fa'


const ListingsPage = () => {
 /*  const listings = useSelector((state) => state.listings); */

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-2  justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Listings</h1>
        <SearchBar />
      </div>
      {/* <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {listings.map((listing) => (
          <ListingItem key={listing._id} listing={listing} />
        ))}
      </div> */}
    </div>
  );
};

export default ListingsPage;
