import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-2/3 mr-2">
        <input
          type="text"
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
          className="py-2 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:shadow-outline-blue w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
      </div>
      <div className="relative w-1/6">
        <select
          className="block w-full py-2 px-4 pr-8 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        >
          <option value="10km">10km</option>
          <option value="15km">15km</option>
          <option value="20km">20km</option>
          <option value="50km">50km</option>
          <option value="national">National</option>
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
    </div>
  );
};

export default SearchBar;
