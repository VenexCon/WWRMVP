import React, { useEffect, useState} from 'react'
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
  const query = new URLSearchParams(location.search).get('query');
  const latitude = new URLSearchParams(location.search).get('latitude');
  const longitude = new URLSearchParams(location.search).get('longitude');
  const distance = Number(new URLSearchParams(location.search).get('distance')) || 10;
  const page = Number(new URLSearchParams(location.search).get('page')) || 1;
  const limit = 1;

  const listings = allListings? allListings : []

  //previous method to update listings was to dispatch actions from the searchBar component.
  //New method to ensure non-clean URL's is to have the page, get the listings by using the search params. 
  //On page load it just calls the newest 20 listings from the DB, the filter for newest is in the listingController. 
useEffect(() => {
  const fetchAllListings = async () => {
    if (query || latitude || longitude) {
      const searchParams = {
        query,
        latitude,
        longitude,
        distance,
        page,
        limit,
      };
      return await dispatch(searchListings(searchParams));
    } else {
      return await dispatch(getAllListings());
    }
  };

  fetchAllListings();
}, [query, latitude, longitude, page, limit, dispatch, distance]);

//sweet transition effect state
const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  //re renders the listingPage on change 
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
  <div className={`min-h-screen mt-0 mb-0 rounded  ${isLoaded ? 'opacity-100 transition-opacity duration-400 ease-in-out' : 'opacity-0'}`}>
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
 {(query || latitude) && (
   <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNextPage}>
    Next
  </button>
 )}
    </div>
    </div>
    </div>
  );
};

export default ListingsPage;
