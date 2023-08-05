import React from 'react';
import ReactModal from 'react-modal';

const PriceModal = ({ isOpen, onClose}) => {

  //Maintain own logic for price issues here. 
  //call redux directly do not worry about pasing it to state,. 
  // Will only appear initially either way. 
  //render state will need ot be passed from profile component.

  const handleSubscriptionSelection = async () => {
    console.log('dispatching Action')
  }
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Subscription Selection Modal"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Confirm Plan Type</h2>
        <p className="text-gray-600 mb-6">
          Please select from two available plans below.
        </p>
        <p className="text-gray-600 mb-2">
          Each plan has its own benefits so please select carefully.
        </p>
        <p className="text-gray-600 mb-2">Each plan will be billed monthly</p>
        <div className="flex justify-between">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
            onClick={(e)=> {console.log('Subscription 1 ')}}
          >
            Delete
          </button>
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