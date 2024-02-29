import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import isValidEmail from "../validator/EmailValidator";
import { executeGetResetPasswordEmail } from "../../api/LoginApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setValidEmail(isValidEmail(newEmail));
  };

  async function handleSubmit() {
    setProcessing(true);

    await executeGetResetPasswordEmail(email)
      .then((response) => {
        toast.success(response.data);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((error) => {
        toast.error(error.response.data);
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  return (
    <div className="flex flex-row items-start justify-center h-screen bg-gray-800">
      <div className=" bg-gray-900 shadow-md rounded-l-xl px-8 pt-6 pb-8 my-8 w-11/12 min-h-96 max-w-md">
        <ToastContainer position="top-center" autoClose={6000} />
        <h2 className="text-3xl font-semibold text-white mb-6">
          Reset Password
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          {!validEmail && <p style={{ color: "red" }}>Invalid email address</p>}
          <input
            className={`${
              validEmail ? "" : "bg-red-300"
            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            className="w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 mt-2 rounded ease-in duration-300 focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
            disabled={processing}
          >
            {processing && (
              <div className="absolute">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-200  animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            )}
            Reset Password
          </button>
        </div>
        <div className="flex items-start  justify-evenly">
          <Link
            to="/register"
            className="text-blue-600 ease-in duration-300 hover:text-blue-300 font-bold text-sm"
          >
            Registration
          </Link>
          <Link
            to="/login"
            className="text-blue-600 ease-in duration-300 hover:text-blue-300 font-bold text-sm ml-4"
          >
            Login
          </Link>
        </div>
      </div>
      {/* Additional content, similar to LoginComponent */}
    </div>
  );
};

export default ForgotPasswordComponent;
