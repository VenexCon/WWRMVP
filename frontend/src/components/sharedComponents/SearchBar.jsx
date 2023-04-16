import React, {useState} from "react";
import { FaSearch, FaArrowDown } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import {toast} from 'react-toastify'
import { searchListings, getAllListings } from '../../features/listings/listingSlice'
import axios from "axios";

const SearchBar = () => {
  const dispatch = useDispatch()
  const {allListings, isPending} = useSelector((state) => state.listing)
  const {user} =useSelector((state) => state.auth)
  const {business} =useSelector((state) => state.businessAuth)

  const [postcode, setPostcode] = useState("");
  const [distance, setDistance] = useState(10); // default distance is 10 km
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if(!user && !business) {return toast.error('Create an account to filter listings')}
    let searchParams = {
      postcode,
      distance,
      query
    }
    if(!query && !postcode) {
      return await dispatch(getAllListings())
    }
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${process.env.REACT_APP_GEOCODING_KEY}`)
      const data = response.data
      searchParams.latitude = data.results[0]?.geometry.location.lat ?? 0
      searchParams.longitude = data.results[0]?.geometry.location.lng ?? 0
      return await dispatch(searchListings(searchParams))
    } catch (error) {
      return toast.error(error.message)
    }
  }




  return (
    <div className="flex items-center justify-center">
      <div className="relative w-1/3 mr-2">
        <label htmlFor="query" className="sr-only">Query</label>
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={(e)=>{setQuery(e.target.value)}}
          placeholder="Search... boxes, stationary etc"
          className="py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:shadow-outline-blue w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
      </div>
      <div className="relative w-1/3 mr-2">
        <label htmlFor="postcode" className="sr-only">Postcode or Town:</label>
        <input
          type="text"
          placeholder="Postcode or Town"
          id="postcode"
          name="postcode"
          value={postcode}
          onChange={(e)=>{setPostcode(e.target.value)}}
          className="py-2 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:shadow-outline-blue w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
      </div>
      <div className="relative w-1/6">
        <label htmlFor="distance" className="sr-only">Distance</label>
        <select
          className="block w-full py-2 px-4 pr-8 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          onChange={(e) => setDistance(e.target.value)}
          id="distance"
          value={distance}
        >
          <option value={10}>10km</option>
          <option value={15}>15km</option>
          <option value={20}>20km</option>
          <option value={50}>50km</option>
          <option value={100}>100km</option>
        </select>
        <div className="absolute  flex items-center px-2 pointer-events-none">
         
        </div>
      </div>
      <button  onClick={handleSearch}
      className=" cursor-pointer bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Search</button>
    </div>
  );
};

export default SearchBar;
