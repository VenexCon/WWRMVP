import React, {useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ListingItem from '../components/sharedComponents/ListingItem'
import SearchBar from '../components/sharedComponents/SearchBar'
import { getAllListings } from "../features/listings/listingSlice"


const ListingsPage = () => {
  const listings = useSelector((state) => state.listing.allListings);
  const dispatch = useDispatch()

  useEffect(()=> {
    const fetchAllListings = async () => {
      const response = await dispatch(getAllListings())
      console.log(response)
    }
    fetchAllListings()
  }, [])


  return (
  <div className=" bg-slate-400 min-h-screen mt-0 mb-0 rounded">
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex flex-col items-center gap-2  justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Listings</h1>
        <SearchBar />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {listings.length > 1 ? (listings.map((listing) => (
          <ListingItem key={listing._id} listing={listing} />
        ))) : (<p className='text-white w-full items-center flex bg-gray-700 border border-purple-600 p-4 rounded-md'>You have no listings</p>)}
      </div>
    </div>
    </div>
  );
};

export default ListingsPage;