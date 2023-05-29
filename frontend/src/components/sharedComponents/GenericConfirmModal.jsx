import React from 'react';
import ReactModal from 'react-modal';

const GenericConfirmModal = ({ isOpen, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Account Modal"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Confirm Account Type</h2>
        <p className="text-gray-600 mb-6">
          Please choose your account carefully!
        </p>
        <p className="text-gray-600 mb-2">
          Users can only browse listings
        </p>
         <p className="text-gray-600 mb-2">
          Businesses can create listings, requesting items and donations.
        </p>
        <div className="flex justify-between">
          <button
            className="bg-Green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
          >
            Confirm
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

export default GenericConfirmModal;