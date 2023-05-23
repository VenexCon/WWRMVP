import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { ReactComponent as WWWLogo } from '../assets/logos/WWWSVGLogo.svg';
import ListingImage from '../assets/png/ListingImage.png';
import ListingPageImg from '../assets/png/ListingPageImg.png'
import ProfilePagePic from '../assets/png/ProfilePagePic.png'
import PricingCard from '../components/sharedComponents/PricingCard';
import { FaArrowCircleRight, FaTwitter, FaInstagram, FaHandHoldingHeart, FaDog, FaBuilding} from 'react-icons/fa'

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  //pricing card data
const prices = [
  {
    title: 'Basic',
    targetAudience: 'Ideal for single store locations and small enterprises',
    price: '£0.00',
    description: [
      'Create one listing per month',
    ],
  },
  {
    title: 'Pro',
    targetAudience: 'Perfect for businesses with multiple locations and medium-sized enterprises',
    price: '£9.99',
    description: [
      'Create up to 10 listings per month',
      'Secondary address and contact numbers allotted',
    ],
  },
  {
    title: 'Enterprise',
    targetAudience: 'Tailored for large enterprises with extensive store chains or franchise locations',
    price: '£50',
    description: ['Create an unlimited amount of listings',
    'Assign created listings to any store location',
    'Secondary address and contact numbers allotted',
  'Priority support'
    ],
  },
];

  return (
    <div className="w-full justify-center flex bg-gray-100 dark:bg-gray-900  ">
    <div
      className={`flex mb-16 flex-col items-center w-5/6 justify-center h-full bg-gray-100 dark:bg-gray-900 ${isLoaded ? 'opacity-100 transition-opacity duration-500 ease-in-out' : 'opacity-0'}`}
    >
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mt-5 mb-8">
        Who Wants Rubbish
      </h1>
      <p className="text-xl text-gray-600 text-center dark:text-gray-400 mb-10">
        Find Sustainable Solutions for Your Pre-Loved Items and Help Build a Circular Economy! 
      </p>
      <div className="flex flex-row  mb-10 ">
         <Link to={'/register'} className='w-full flex items-center justify-center gap-x-2 text-white bg-blue-600 hover:text-blue-600 hover:bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
          <button className="w-full flex items-center align-middle justify-center gap-x-2">
            <p className='font-bold text-lg'>
              Join For Free
            </p>
          <FaArrowCircleRight className=' h-full w-1/5' />
          </button>
          </Link>
      </div>
      <div className="flex flex-col justify-center items-center mb-24">
        <div className="flex justify-center flex-col lg:w-1/2 items-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            No more taking your stuff to the tip!
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
            Our WebApp connects you with businesses, charity shops, and schools in need of your gently used items. Say goodbye to landfill waste and give your belongings a new purpose!
          </p>
        </div>
        <img src={ListingImage} alt="listing" className="w-5/6 lg:w-3/6 rounded-md lg:mb-0 transition duration-300" />
      </div>

      <section className='flex flex-col text-center mt-8 mb-24 justify-center align-middle items-center'>
        <div className="container mb-10">
          <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center'>Give Back To Your Community</h2>
           <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
            Explore listings from local businesses seeking pre-loved items. Discover sustainable opportunities for your pre-loved items and donate to good causes!
          </p>
        </div>
        <img src={ListingPageImg} alt="listing" className="w-full lg:w-2/3 rounded-md mb-16 lg:mb-24 transition duration-300" />
      </section>

       <section className='flex flex-col  text-center mb-24 justify-center align-middle items-center'>
        <div className="container mb-10">
          <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center'>
            Donate With Confidence
          </h2>
           <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
           Browse Listings, Connect, and Donate. No complicated processes or forms to fill out, simply contact the listing creator via phone or email.
          </p>
        </div>
        <img src={ProfilePagePic} alt="profile Page" className="w-4/5 lg:w-1/3 rounded-md mb-16 lg:mb-0  transition duration-300" />
      </section>

       <section className='flex flex-col lg:flex-row gap-8 text-center mb-24 justify-between align-middle items-center'>
        <div className="container w-1/2 h-full ">
          <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center'>
            Who Should Join?
          </h2>
           <p className="text-lg text-center text-gray-600 dark:text-white mb-4">
           All businesses should join! Get Involved - Businesses, Charity Shops, and Social Enterprises can all create listings and receive donations, even start-ups can too! 
           Any business in a position to accept pre-loved goods should join.
          </p>
        </div>
        <div className="flex flex-col sm:flex-col gap-4 align-middle h-full sm: w-2/3 md:w-1/2 justify-between">
          <div className=" flex flex-row text-white align-middle  min-h-8 gap-4 items-center">
            <FaHandHoldingHeart className='text-red-400' />
            <p>Charity Shops in Need of Donations</p>
          </div>
          <div className=" flex flex-row text-white align-middle  min-h-8  gap-4 items-center">
            <FaDog className=' text-green-400' />
            <p>Shelters in need of supplies!</p>
          </div>
          <div className=" flex flex-row text-white align-middle  min-h-8  gap-4 items-center">
            <FaBuilding className='text-cyan-600' />
            <p>Social Enterprises looking to upcycle donated items</p>
          </div>
        </div>
      </section>

       <section className='flex flex-col text-center mb-24 justify-center align-middle items-center'>
        <div className="container mb-10">
          <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center'>
            Pricing and Plans
          </h2>
           <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
            Sustainable Solutions at Affordable Prices. Choose a Plan That Fits Your Business and get started creating listings
            from Only £7.50 per Month - Start Making a Difference Today.
          </p>
        </div>
        <div className="pricing flex flex-col md:flex-row align-bottom  gap-8 justify-end">
        {prices.map((item, index) => (
          <PricingCard key = {index} title={item.title} description={item.description}  targetAudience = {item.targetAudience} price={item.price} />
        ))}
        </div>
      </section>
    </div>
    </div>
  );
}

export default Home;
