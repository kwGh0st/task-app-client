import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../security/AuthContext";

const SettingsComponent = () => {
  const authContext = useAuth();

  useEffect(() => {
    authContext.fetchData(authContext.username);
  });

  return (
    <div className="flex flex-row flex-wrap items-start justify-center h-screen bg-gray-800">
      <div className="bg-gray-900 shadow-md rounded-xl px-8 pt-6 pb-8 my-8 w-full min-h-96 max-w-md">
        <div className="flex flex-row justify-between">
          <h2 className="text-3xl font-semibold text-white mb-6">Settings</h2>
          <Link
            className="mt-3 font-bold text-blue-600 ease-in duration-300 hover:text-blue-300"
            to="/user/welcome"
          >
            Back to dashboard.
          </Link>
        </div>
        <div className="w-full flex flex-row justify-center"></div>
        <div className="flex flex-row justify-between mb-4">
          <div className="flex flex-col items-start">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="text-start font-bold w-fit text-xl placeholder:text-gray-400 bg-gray-900"
              type="text"
              disabled={true}
              placeholder={authContext.email}
            />
          </div>
          <button className="w-2/5 h-fit bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 mt-2 rounded ease-in duration-300 ">
            <Link to="/user/settings/change-email">Change</Link>
          </button>
        </div>
        <div className="flex flex-row justify-between mb-4">
          <div className="flex flex-col items-start">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="text-start font-bold text-xl placeholder:text-gray-400 bg-gray-900"
              type="text"
              disabled={true}
              placeholder="*********"
            />
          </div>
          <button className="w-2/5 h-fit bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 mt-2 rounded ease-in duration-300 ">
            <Link to="/user/settings/change-password">Change</Link>
          </button>
        </div>

        <div className="relative">
          <Link
            className="absolute left-0 mt-6 text-blue-500 ease-in duration-300 hover:text-blue-300 underline"
            to="/user/settings/delete-account"
          >
            Delete account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;
