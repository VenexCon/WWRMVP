import React from "react";
import { FaSearch} from 'react-icons/fa'


const SearchBar = () => {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search..."
        className="py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:shadow-outline-blue w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
