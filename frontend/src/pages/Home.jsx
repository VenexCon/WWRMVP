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
      title:'Basic',
      description: 'A perfect choice for small enterprises and businesses operating from domestic premises or a single location. This plan offers essential features to help you establish and grow your business. Unlock the potential of up to 10 listings with ease',
      price: '£7.50'
    },
    {
      title:'Pro',
      description: "Ideal for medium-sized enterprises and businesses with multiple locations, the Pro plan empowers you to expand your presence and reach more customers. Enjoy the benefits of advanced features and take advantage of creating up to 10 listings effortlessly.",
      price: '£9.99'
    },
    {
      title:'Enterprise',
      description: 'The ultimate solution for large enterprises, store chains, franchise locations, or businesses operating across numerous locations. Our Enterprise plan grants you unlimited opportunities to showcase your offerings and maximize your reach. Create an unlimited number of listings and unlock the full potential of your business.',
      price: '£50.00'
    },
  ]

  return (
    <div className="w-full justify-center flex bg-gray-100 dark:bg-gray-900  ">
    <div
      className={`flex mb-16 flex-col items-center w-5/6 justify-center h-full bg-gray-100 dark:bg-gray-900 ${isLoaded ? 'opacity-100 transition-opacity duration-500 ease-in-out' : 'opacity-0'}`}
    >
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mt-5 mb-8">
        Who Wants Rubbish
      </h1>
      <p className="text-xl text-gray-600 text-center dark:text-gray-400 mb-10">
        Browse listings for businesses who need your old stuff! 
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
            Our WebApp helps businesses, charity shops and schools market their needs, and allows our 
            users to browse for places to donate!
          </p>
        </div>
        <img src={ListingImage} alt="listing" className="w-5/6 lg:w-3/6 rounded-md lg:mb-0 transition duration-300" />
      </div>

      <section className='flex flex-col text-center mt-8 mb-24 justify-center align-middle items-center'>
        <div className="container mb-10">
          <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center'>Give Back To Your Community</h2>
           <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
            Connect with local businesses and contribute to your community by donating your items. Browse our listings and 
            reach out to business owners to see if they are interested in accepting your donations with Who Wants Rubbish
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
            Don't fret about if you can actually get rid of your items! Search through the listings and find a
            match then simple arrange a time and date and go donate!
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
            All businesses should join! Any businesses that can offer items for free, or can accept donations! 
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
            Sign up with your business, select the most appropriate plan and begin creating listings from only £7.50 per month.
          </p>
        </div>
        <div className="pricing flex flex-col md:flex-row align-bottom  gap-8 justify-end">
        {prices.map((item) => (
          <PricingCard title={item.title} description={item.description} price={item.price} />
        ))}
        </div>
      </section>
    </div>
    </div>
  );
}

export default Home;
