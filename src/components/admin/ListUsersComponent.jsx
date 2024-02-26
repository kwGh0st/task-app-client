import React, { useState, useEffect, useCallback } from "react";
import {
  executeGetAllUsers,
  executeBlockUser,
  executeUnblockUser,
} from "../../api/AdminApiService";
import { useAuth } from "../../security/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoleComponent from "./RoleComponent";
import DeleteUserComponent from "./DeleteUserComponent";
import { useNavigate } from "react-router-dom";

const ListUsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const authContext = useAuth();
  const navigate = useNavigate();

  const refreshUsers = useCallback(() => {
    executeGetAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleBlockUser(user) {
    user.accountNonLocked ? block(user.id) : unblock(user.id);
  }

  async function block(id) {
    await executeBlockUser(id)
      .then((response) => {
        toast.success(response.data);

        setTimeout(() => {
          refreshUsers();
        }, 1000);
      })
      .catch((error) => toast.error(error.data));
  }

  async function unblock(id) {
    await executeUnblockUser(id)
      .then((response) => {
        toast.success(response.data);

        setTimeout(() => {
          refreshUsers();
        }, 1000);
      })
      .catch((error) => toast.error(error.data));
  }

  function success() {
    refreshUsers();
  }

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers, authContext]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.username &&
      user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <div className="flex-grow overflow-x-auto bg-gray-900 shadow-md w-11/12 self-center rounded px-6 pt-6 pb-8 my-4 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        <div className="w-full gap-4 flex flex-col font-bold mb-5">
          <ToastContainer position="top-center" autoClose={6000} />
          <h2 className="text-3xl font-semibold text-white mb-4">
            User Management
          </h2>
          <div className="flex flex-row flex-wrap justify-between">
            <button
              className="bg-green-600 rounded-md px-3 text-white ease-in duration-300 hover:bg-green-950 mb-4 sm:mb-0"
              onClick={() => navigate("/admin/create-new-user")}
            >
              Register new User
            </button>
            <input
              type="text"
              placeholder="Search by username"
              className="p-2 mb-4 bg-gray-700 text-white rounded"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
        </div>

        <table className="min-w-full bg-slate-300 border-gray-500 border-2 shadow-md ">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left font-extrabold">
                ID
              </th>
              <th className="py-2 px-4 border-b text-left font-extrabold">
                Username
              </th>
              <th className="py-2 px-4 border-b text-left font-extrabold">
                Email
              </th>
              <th className="py-2 px-4 border-b text-left font-extrabold">
                Role
              </th>
              <th className="py-2 px-4 border-b text-left font-extrabold">
                Enabled
              </th>
              <th className="py-2 px-4 border-b text-left font-extrabold">
                Blocked
              </th>
              <th className="py-2 px-4 border-b text-left font-extrabold">
                Registration Date
              </th>

              <th className="py-2 px-4 border-b text-center font-extrabold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.username} className="border-t">
                <td className="py-2 px-4 text-left font-sans font-semibold text-gray-650">
                  {user.id}
                </td>
                <td className="py-2 px-4 text-left font-sans font-semibold text-gray-650">
                  {user.username}
                </td>
                <td className="py-2 px-4 text-left font-sans font-semibold text-gray-650">
                  {user.email}
                </td>
                <td className="py-2 px-4 text-left font-sans font-semibold text-gray-650">
                  {user.role} {}
                </td>
                <td className="py-2 px-4 text-left font-sans font-semibold text-gray-650">
                  {user.enabled ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 text-left font-sans font-semibold text-gray-650">
                  {user.accountNonLocked ? "No" : "Yes"}
                </td>
                <td className="py-2 px-4 text-left font-sans font-semibold text-gray-650">
                  {user.registrationDate}
                </td>
                <td className="flex flex-row justify-end items-center">
                  <div className="flex flex-col sm:flex-row justify-end items-center">
                    <button
                      className="disabled:opacity-75 disabled:hover:bg-blue-300 disabled:hover:cursor-not-allowed bg-yellow-500 hover:bg-yellow-900 ease-in duration-300 w-20 text-white font-bold mt-1 py-1 px-2 rounded mb-2 sm:mr-4 sm:mb-0"
                      onClick={() => handleBlockUser(user)}
                      disabled={authContext.userId === user.id}
                    >
                      {user.accountNonLocked ? "Block" : "Unblock"}
                    </button>

                    <button
                      onClick={() => {
                        setShowModal(!showModal);
                        setCurrentUser(user.id);
                      }}
                      disabled={authContext.userId === user.id}
                      className="disabled:opacity-75 disabled:hover:bg-blue-300 disabled:hover:cursor-not-allowed bg-blue-500 hover:bg-blue-900 ease-in duration-300 w-20 text-white font-bold mt-1 py-1 px-2 rounded mb-2 sm:mr-4 sm:mb-0"
                    >
                      Set Role
                    </button>

                    <button
                      className="disabled:opacity-75 disabled:hover:bg-blue-300 disabled:hover:cursor-not-allowed bg-red-700 hover:bg-red-900 ease-in duration-300 w-20 text-white font-bold mt-1 py-1 px-2 rounded"
                      onClick={() => {
                        setShowDeleteComponent(!showDeleteComponent);
                        setCurrentUser(user.id);
                      }}
                      disabled={authContext.userId === user.id}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <RoleComponent
            userId={currentUser}
            onClose={() => setShowModal(false)}
            onSuccess={() => success()}
          />
        )}
        <div>
          {showDeleteComponent && (
            <DeleteUserComponent
              userId={currentUser}
              onClose={() => setShowDeleteComponent(false)}
              onSuccess={() => success()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListUsersComponent;
