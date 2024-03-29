import React from 'react';
import ReactModal from 'react-modal';

const DeleteModal = ({ isOpen, onClose, onConfirmDelete }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Account Modal"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        <p className="text-gray-600 mb-6">
          Once deleted all listings you have created, or own will also be destroyed.
        </p>
        <div className="flex justify-between">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
            onClick={onConfirmDelete}
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

export default DeleteModal;