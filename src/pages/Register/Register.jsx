import React from "react";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    // Add your registration logic here
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Register Now</h2>
      <p className="text-gray-600 mb-8">
        Fill the form below to create your account
      </p>

      <form onSubmit={handleRegister} className="space-y-5">
        {/* Full Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Sign Up Button */}
        <button type="submit" className="bg-lime-500 w-full rounded-md py-3 text-white">
          Sign Up
        </button>
      </form>

      {/* Divider */}
      <div className="divider text-gray-400">Or register with</div>

      {/* Google Button */}
      <button
        type="button"
        className="btn btn-outline w-full flex items-center justify-center gap-2"
      >
        <FcGoogle size={24} />
        Continue with Google
      </button>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Register;
