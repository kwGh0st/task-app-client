import React from "react";
import { useAuth } from "../../security/AuthContext";
import { Link, redirect } from "react-router-dom";

const AdminDashboardComponent = () => {
  const authContext = useAuth();

  // Sprawdź, czy użytkownik ma rolę admina

  // Jeśli nie jest administratorem, przekieruj go do innej strony
  if (!authContext.isAdmin()) {
    return redirect("/error");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <div className="flex flex-col bg-gray-900 rounded px-8 pt-6 pb-8 my-8 h-full w-11/12">
        <h2 className="text-3xl font-semibold text-white mb-6 self-start justify-self-center">
          Welcome admin: {authContext.username}!
        </h2>
        <div className="my-6">
          <button className="bg-blue-700 hover:bg-blue-900 ease-in duration-300 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline">
            <Link to="/admin/manage-users">Manage Users</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardComponent;
