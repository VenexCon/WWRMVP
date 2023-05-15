import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { ReactComponent as WWWLogo } from '../assets/logos/WWWSVGLogo.svg';
import ListingImage from '../assets/png/ListingImage.png';
import ListingPageImg from '../assets/png/ListingPageImg.png'
import ProfilePagePic from '../assets/png/ProfilePagePic.png'
import PricingCard from '../components/sharedComponents/PricingCard';
import { FaArrowCircleRight, FaTwitter, FaInstagram} from 'react-icons/fa'

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
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mt-5 mb-8">
        Who Wants Rubbish
      </h1>
      <p className="text-xl text-gray-600 text-center dark:text-gray-400 mb-10">
        Browse listings for businesses who need your old stuff! 
      </p>
      <div className="flex flex-row  mb-10 ">
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
        <div className="flex justify-center flex-col lg:w-1/2 items-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            No more taking your stuff to the tip!
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
            Our WebApp helps businesses, charity shops and schools market their needs, and allows our 
            users to browse for places to donate!
          </p>
        </div>
        <img src={ListingImage} alt="listing" className="w-5/6 lg:w-1/3 rounded-md lg:mb-0 hover:scale-110 transition duration-300" />
      </div>

      <section className='flex flex-col lg:flex-row text-center justify-center align-middle items-center'>
        <div className="container mb-10">
          <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center'>Give Back To Your Community</h2>
           <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
            Connect with local businesses and contribute to your community by donating your items. Browse our listings and 
            reach out to business owners to see if they are interested in accepting your donations with Who Wants Rubbish
          </p>
        </div>
        <img src={ListingPageImg} alt="listing" className="w-full lg:w-1/3 rounded-md mb-16 lg:mb-0 hover:scale-110 transition duration-300" />
      </section>

       <section className='flex flex-col lg:flex-row text-center justify-center align-middle items-center'>
        <div className="container mb-10">
          <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center'>
            Donate With Confidence
          </h2>
           <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
            Don't fret about if you can actually get rid of your items! Search through the listings and find
            matching listings! Arrange a meeting and donate!
          </p>
        </div>
        <img src={ProfilePagePic} alt="profile Page" className="w-4/5 lg:w-1/3 rounded-md mb-16 lg:mb-0 hover:scale-110 transition duration-300" />
      </section>

       <section className='flex flex-col lg:flex-row text-center justify-center align-middle items-center'>
        <div className="container mb-10">
          <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center'>
            Pricing and Plans
          </h2>
           <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
            WhoWantsRubbish understands that this WebApp relies on the generosity of those donating, but unfortunately
            this WebApp is not free to run. 
          </p>
        </div>
        <div className="pricing flex flex-col justify-center items-center align-middle">
        <PricingCard />
        </div>
      </section>
      
      {/* Social Media Icons */}
      <div className="flex flex-row justify-center items-center mb-8 w-full h-10  gap-x-10">
        <Link  className=" flex justify-center align-middle items-center h-full ">
          <FaTwitter className='text-blue-400 h-full w-full' /> 
        </Link>
        <Link className=" flex justify-center align-middle items-center h-full ">
          <FaInstagram className='text-purple-400 h-full w-full' /> 
        </Link>
       
      </div>
    </div>
    </div>
  );
}

export default Home;
