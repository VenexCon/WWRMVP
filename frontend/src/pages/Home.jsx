import React from 'react';
import { ReactComponent as WWWLogo } from '../assets/logos/WWWSVGLogo.svg';
//import listingImage from '../assets/images/listingImage.jpg';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Who Wants Rubbish
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Turning Trash into Treasure
      </p>
      <div className="flex flex-col lg:flex-row justify-center items-center mb-8">
{/*         <img src={listingImage} alt="listing" className="w-full lg:w-1/2 mb-4 lg:mb-0" />
 */}        <div className="lg:ml-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Buy and Sell Secondhand Items
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id lorem sed tellus porttitor lobortis.
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
      <a href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sign Up Now
      </a>
    </div>
  );
}

export default Home;
