import React, { useState } from "react";
import { executeDeleteUser } from "../../api/AdminApiService";
import { useAuth } from "../../security/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteUserComponent = ({ userId, onClose, onSuccess }) => {
  const authContext = useAuth();
  const [adminPassword, setAdminPassword] = useState("");
  const adminId = authContext.userId;

  async function handleDeleteUser() {
    await executeDeleteUser(userId, { adminPassword, adminId })
      .then(() => {
        onSuccess();
        onClose();
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }

  return (
    <div className="absolute flex flex-col left-1/4 bottom-1/2 bg-slate-700 w-1/2 h-1/4 p-5 rounded-xl min-h-max">
      <div className="w-full">
        {" "}
        <ToastContainer position="top-center" autoClose={6000} />
      </div>
      <button
        onClick={() => onClose()}
        className="self-end -my-4 pb-4 text-blue-500 text-2xl ease-in hover:text-blue-900 duration-300 font-bold"
      >
        X
      </button>
      <div className="relative flex flex-col gap-6 my-6">
        <input
          className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Enter your admin password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />
        <button
          onClick={handleDeleteUser}
          className="bg-red-500 hover:bg-red-900 ease-in duration-300 min-w-full text-white font-bold mt-1 py-1 px-2 rounded mb-2 sm:mr-4 sm:mb-0"
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default DeleteUserComponent;
