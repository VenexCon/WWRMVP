import React, {useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ListingItem from '../components/sharedComponents/ListingItem'
import SearchBar from '../components/sharedComponents/SearchBar'
import { getAllListings } from "../features/listings/listingSlice"


const ListingsPage = () => {
  const allListings = useSelector((state) => state.listing.allListings);
  const dispatch = useDispatch()

  const listings = allListings? allListings : []

  useEffect(()=> {
    const fetchAllListings = async () => {
      return await dispatch(getAllListings())
    }
    fetchAllListings()
  }, [])


  return (
  <div className="  min-h-screen mt-0 mb-0 rounded">
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex flex-col items-center gap-2  justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Listings</h1>
        <SearchBar />
      </div>
      <div className=" grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {listings.length > 0 ? (listings.map((listing) => (
          <ListingItem key={listing._id} listing={listing} />
        ))) : (<p className='text-white w-full items-center flex bg-gray-700 border border-purple-600 p-4 rounded-md'>There is no listings</p>)}
      </div>
    </div>
    </div>
  );
};

export default ListingsPage;
