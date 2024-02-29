import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../security/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginComponent = () => {
  const location = useLocation();
  const confirmationSuccess = new URLSearchParams(location.search).get(
    "confirmationSuccess"
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useAuth();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit() {
    if (await authContext.login(username, password)) {
      navigate("/user/welcome");
    } else {
      toast.error("Authentication Failed. Please check your credentials.");
    }
  }

  useEffect(() => {
    if (confirmationSuccess) {
      toast.success("Confirmation successful. Now you can log in.", {
        position: "top-center",
      });
    }
  }, [confirmationSuccess]);

  return (
    <div className="flex flex-row flex-wrap items-start justify-center min-h-screen bg-gray-800">
      <ToastContainer position="top-center" autoClose={6000} />
      <div className=" bg-gray-900 shadow-md rounded-xl  lg:rounded-r-none px-8 pt-6 pb-8 mt-8 w-full min-h-96 max-w-md ">
        <div className="flex flex-row flex-wrap justify-between">
          <h2 className="text-3xl font-semibold text-white mb-6">Login</h2>
          <Link
            className="text-gray-500 ease-in duration-300 hover:text-gray-300 my-3"
            to="/send-new-verification-token"
          >
            Don't have a verification link?
          </Link>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            className="w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 mt-2 rounded ease-in duration-300 focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Log In
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <a
            className="text-blue-600 ease-in duration-300 hover:text-blue-300 font-bold text-sm"
            href="/user/login/forgot-password"
          >
            Forgot password?
          </a>
          <p className="text-gray-500 text-md font-bold mb-2 py-2">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="underline text-blue-500 hover:text-blue-300 ease-in duration-300"
            >
              Register one!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
