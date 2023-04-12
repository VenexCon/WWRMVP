import React, {useState} from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import {toast} from 'react-toastify'

const SearchBar = () => {

  const {allListings, isPending} = useSelector((state) => state.listing)
  const {user} =useSelector((state) => state.auth)
  const {business} =useSelector((state) => state.businessAuth)

  const [postcode, setPostcode] = useState("");
  const [distance, setDistance] = useState(10); // default distance is 10 km
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if(!user && !business) {return toast.error('Create an account to filter listings')}
    let searchParams = {
      postcode,
      distance,
      query
    }

    console.log(searchParams)
  }




  return (
    <div className="flex items-center justify-center">
      <div className="relative w-2/3 mr-2">
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={(e)=>{setQuery(e.target.value)}}
          placeholder="Search..."
          className="py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:shadow-outline-blue w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
      </div>
      <div className="relative w-1/6 mr-2">
        <input
          type="text"
          placeholder="Postcode"
          id="postcode"
          name="postcode"
          value={postcode}
          onChange={(e)=>{setPostcode(e.target.value)}}
          className="py-2 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:shadow-outline-blue w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
      </div>
      <div className="relative w-1/6">
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
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M14.707,8.293c0.391,0.391,0.391,1.023,0,1.414l-5.999,5.999c-0.391,0.391-1.023,0.391-1.414,0l-5.999-5.999 c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0L9,12.586L14.293,7.293C14.488,7.098,14.744,7,15,7S15.512,7.098,15.707,7.293 C16.098,7.684,16.098,8.316,15.707,8.707L14.707,8.293z"
            />
          </svg>
        </div>
      </div>
      <button  onClick={handleSearch}
      className=" cursor-pointer bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Search</button>
    </div>
  );
};

export default SearchBar;
