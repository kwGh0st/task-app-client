import React, { useState } from "react";
import { Link } from "react-router-dom";

const ErrorComponent = () => {
  const [isPulsating, setIsPulsating] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="flex flex-col items-center justify-center text-center w-11/12">
        <h1 className="text-4xl font-bold mb-4">We are working really hard!</h1>
        <div className="text-lg">
          Apologies for the 404. If you need help please{" "}
          <a
            className="font-bold underline text-2xl"
            href="https://kwgh0st.github.io/wojtachakarol/#contact"
            target="_blank"
          >
            contact us.
          </a>
        </div>
        <div className="mt-4">
          <button
            className={`
            ${isPulsating ? "animate-pulse" : ""}
            bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-48 rounded
          `}
            onClick={() => setIsPulsating(false)}
          >
            <Link to="/">Back to login page</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
