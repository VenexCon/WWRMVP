import React from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const PriceModal = ({ isOpen, onClose }) => {
  const subscribeToCheckoutSession = async () => {
    toast.info('Redirecting to Checkout Portal');
    const token = Cookies.get('token');
    try {
      const response = await fetch('api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const body = await response.json();
      window.location.href = body.url;
    } catch (error) {
      console.log('Fetch error:', error);
    }
  };

  const handleSubscriptionSelection = async () => {
    console.log('dispatching Action');
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
          <h2 className="text-2xl font-semibold mb-4">Confirm Plan Type</h2>
          <p className="text-gray-600 mb-6">
            Please select from two available plans below.
          </p>
          <p className="text-gray-600 mb-2">
            Each plan has its own benefits so please select carefully.
          </p>
          <p className="text-gray-600 mb-2">Each plan will be billed monthly</p>
          <div className="flex-col md:flex-row gap-5 border">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md flex flex-col items-center space-x-1"
              onClick={() => {
                console.log('Subscription 1 ');
                subscribeToCheckoutSession(); // Add your logic here
              }}
            >
              <h3 className='text-xl'>Pro Plan</h3>
              <span className="text-md">Create 10 listings per month</span>
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md flex flex-col items-center space-x-1"
              onClick={() => {
                console.log('Subscription 2 ');
                handleSubscriptionSelection(); // Add your logic here
              }}
            >
              <h3 className='text-xl'>Enterprise Plan</h3>
              <span className="text-md">Create 100 listings</span>
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
