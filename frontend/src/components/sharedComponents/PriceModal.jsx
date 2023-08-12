import React from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const PriceModal = ({ isOpen, onClose }) => {


  //subscribe to Checkout Session for initial subscription.
  const subscribeToCheckoutSession = async (subscriptionType, price,) => {
    toast.info('Redirecting to Checkout Portal');
    
    const token = Cookies.get('token');
    try {
      const response = await fetch('api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify({subscriptionType, price})
      });

      const body = await response.json();
      console.log(body)
     window.location.href = body.url;
    } catch (error) {
      console.log('Fetch error:', error);
    }
  };


  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Subscription Selection Modal"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto flex flex-col justify-between min-h-1/2">
        <div>
          <h2 className="text-xl font-bold text-center mb-4">Select Plan Type</h2>
          <p className="text-gray-600 mb-6 text-center w-full">
            Please select from the available plans below
          </p>
          <div className="flex-col md:flex-row ">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white w-full font-semibold py-2 px-4 rounded-md flex flex-col items-center space-x-1"
              onClick={() => {
                subscribeToCheckoutSession('pro', 'price_1NEe4PKSsp4mks69CTTtSlIG');
              }}
            >
              <h3 className='text-xl'>Pro Plan</h3>
              <span className="text-md">Create 10 listings per month</span>
              <span className="text-md">£9.99 Per Month</span>
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 w-full mt-5 text-white font-semibold py-2 px-4 rounded-md flex flex-col items-center space-x-1"
              onClick={() => {
                subscribeToCheckoutSession('enterprise', "price_1NEe6RKSsp4mks69DMPSVWgh", 1)
              }}
            >
              <h3 className='text-xl'>Enterprise Plan</h3>
              <span className="text-md">Create 100 listings</span>
              <span className="text-md">£99 Per Month</span>
            </button>
          </div>
        </div>
        <div className="mt-4 flex align-middle justify-center">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default PriceModal;
