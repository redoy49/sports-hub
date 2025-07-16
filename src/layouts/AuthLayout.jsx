import React from "react";
import { Outlet } from "react-router";
import authImage from "../assets/auth-illustration.svg";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Auth Section with spacing */}
      <section className="flex-grow flex items-center justify-center px-4 pt-20 md:pt-24 lg:pt-28">
        <div className="flex flex-col lg:flex-row bg-white rounded-lg overflow-hidden max-w-5xl w-full shadow-sm">

          {/* Illustration */}
          <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-100 p-10">
            <img
              src={authImage}
              alt="Welcome Illustration"
              className="w-full max-w-md"
            />
          </div>

          {/* Form Content */}
          <div className="flex-1 max-w-lg p-8 md:p-12 bg-gray-50">
            <Outlet />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AuthLayout;
