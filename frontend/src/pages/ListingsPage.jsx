import React, {useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import ListingItem from '../components/sharedComponents/ListingItem'
import SearchBar from '../components/sharedComponents/SearchBar'
import { getAllListings, searchListings } from "../features/listings/listingSlice"

const ListingsPage = () => {
  const allListings = useSelector((state) => state.listing.allListings);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const listings = allListings? allListings : []

  useEffect(()=> {
    
    const fetchAllListings = async () => {
      return await dispatch(getAllListings())
    }
    fetchAllListings()
  }, [])

  const query = new URLSearchParams(location.search).get('query');
  const page = Number(new URLSearchParams(location.search).get('page')) || 1;
  const limit = 20

  console.log(query)

  const handlePreviousPage = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page - 1);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleNextPage = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page + 1);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };


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
      <div className="flex justify-center gap-10 mt-4">
  {page >= 2 && (
  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handlePreviousPage}>
    Previous
  </button>)}
  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNextPage}>
    Next
  </button>
</div>

    </div>
    </div>
  );
};

export default ListingsPage;
