import React from "react";
import { Link } from "react-router-dom";

const LogoutComponent = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-800">
      <div className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 my-8 w-11/12 max-w-md">
        <h2 className="text-3xl font-semibold text-white mb-6">
          Logout Successful
        </h2>
        <p className="text-gray-300 text-sm mb-6">
          You have been successfully logged out.
        </p>
        <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ease-in duration-300 focus:outline-none focus:shadow-outline">
          <Link to="/login">Log in again</Link>
        </button>
      </div>
    </div>
  );
};

export default LogoutComponent;
