import React from 'react';

const SignUpModal = ({ setIsOpen }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900 opacity-50"
        onClick={() => setIsOpen(false)}
      ></div>
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl p-6 z-10 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Notice</h2>
        <p className="mb-6">
          Pardon our digital dust. Our sign up is currently under construction.
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SignUpModal;
