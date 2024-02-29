import React from "react";
import { Link } from "react-router-dom";

const VerificationErrorComponent = () => {
  return (
    <div className="flex flex-row items-start justify-center h-screen bg-gray-800">
      <div className="bg-gray-900 shadow-md rounded-l-xl px-8 pt-6 pb-8 my-8 w-11/12 min-h-96 max-w-md">
        <h2 className="text-3xl font-semibold text-white mb-6">
          Verification Error
        </h2>
        <p className="text-red-500 mb-4">
          Oops! Something went wrong with the verification process.
        </p>
        <p className="text-gray-300 mb-4">
          Please make sure you have the correct verification link, or try
          resending the verification email.
        </p>
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/"
            className="w-full bg-blue-700 hover:bg-blue-900 text-white text-center font-bold py-2 px-4 mt-2 rounded ease-in duration-300 focus:outline-none focus:shadow-outline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerificationErrorComponent;
