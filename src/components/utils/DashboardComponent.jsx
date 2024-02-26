import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../security/AuthContext";
const DashboardComponent = () => {
  const authContext = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <div className="flex flex-col bg-gray-900 rounded px-8 pt-6 pb-8 my-8 h-full w-11/12">
        <h2 className="text-3xl font-semibold text-white mb-6 self-start justify-self-center">
          Welcome, {authContext.username}!
        </h2>
        <div className="my-6">
          <button className="bg-blue-700 hover:bg-blue-900 ease-in duration-300 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline">
            <Link to="/user/todos">Manage Todos</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
