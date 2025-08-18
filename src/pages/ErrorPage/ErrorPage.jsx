import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-white via-gray-50 to-gray-100 flex flex-col items-center justify-center text-center px-6">
      {/* Big 404 */}
      <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest drop-shadow-sm">
        404
      </h1>

      {/* Sub text */}
      <p className="mt-4 text-lg text-gray-600 max-w-lg">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-8 inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
      >
        Go Back Home
      </Link>

      {/* Extra small text */}
      <p className="mt-6 text-sm text-gray-500">
        Need help?{" "}
        <Link to="/support" className="text-blue-600 font-medium hover:underline">
          Contact Support
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
