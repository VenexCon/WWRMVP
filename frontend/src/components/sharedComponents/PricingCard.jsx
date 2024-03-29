import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

function PricingCard({ title, targetAudience, price, description }) {
  return (
    <div className="max-w-md rounded-lg md:w-2/3 h-90 overflow-hidden shadow-lg bg-blue-700 text-white border border-black ">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-base text-white mb-4">{targetAudience}</p>
        <ul className="list-disc list-inside mb-4 text-base text-white">
          {description.map((item, index) => (
            <li key={index} className="flex items-start align-middle">
              <FaCheck className="mt-1 mr-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 pt-4 mt-10 pb-2">
        <span className="inline-block bg-white rounded-full px-3 py-1 text-lg mb-4 font-semibold text-gray-700 mr-2 mb-2">
          {price}/month
        </span>
      </div>
      <Link
        to="/register"
        className="w-3/5 mb-3 mx-auto flex items-center justify-center gap-x-2 text-blue-600 hover:text-white hover:bg-blue-400  bg-white font-medium rounded-lg text-lg x-5 py-2.5 text-center hover:scale-110 ease-in-out duration-300"
      >
        <button className="w-2/3 flex items-center align-middle justify-center font-bold gap-x-2 ">
          <p>Sign-up!</p>
        </button>
      </Link>
    </div>
  );
}

export default PricingCard;
