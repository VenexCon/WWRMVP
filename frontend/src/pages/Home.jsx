import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { ReactComponent as WWWLogo } from '../assets/logos/WWWSVGLogo.svg';
import ListingImage from '../assets/png/ListingImage.png';
import { FaUser, FaArrowCircleRight, FaLockOpen } from 'react-icons/fa'

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="w-full justify-center flex bg-gray-100 dark:bg-gray-900  ">
    <div
      className={`flex flex-col items-center w-5/6 justify-center h-full bg-gray-100 dark:bg-gray-900 ${isLoaded ? 'opacity-100 transition-opacity duration-500 ease-in-out' : 'opacity-0'}`}
    >
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mt-5 mb-8">
        Who Wants Rubbish
      </h1>
      <p className="text-xl text-gray-600 text-center dark:text-gray-400 mb-16">
        Browse listings for businesses who need your old stuff! 
      </p>
      <div className="flex flex-row  mb-16 ">
         <Link to={'/register'} className='w-full flex items-center justify-center gap-x-2 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
          <button className="w-full flex items-center align-middle justify-center gap-x-2">
            <p>
              Join For Free
            </p>
          <FaArrowCircleRight />
          </button>
          </Link>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center mb-16">
        <img src={ListingImage} alt="listing" className="w-5/6 lg:w-1/3 rounded-md mb-16 lg:mb-0 hover:scale-110 transition duration-300" />
        <div className="flex justify-center flex-col lg:w-1/2 items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            No more taking your stuff to the tip!
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400">
            Our WebApp helps businesses, charity shops and schools market their needs, and allows our 
            users to browse for places to donate!
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center mb-8">
        <a href="#" className="mx-2">
          <i className="fab fa-twitter text-2xl text-gray-800 dark:text-white"></i>
        </a>
        <a href="#" className="mx-2">
          <i className="fab fa-instagram text-2xl text-gray-800 dark:text-white"></i>
        </a>
        <a href="#" className="mx-2">
          <i className="fab fa-facebook text-2xl text-gray-800 dark:text-white"></i>
        </a>
      </div>
      <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sign Up Now
      </Link>
    </div>
    </div>
  );
}

export default Home;
