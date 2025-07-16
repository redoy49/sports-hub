import React from "react";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Log In</h2>
      <p className="text-gray-600 mb-8">Sign in to access your account</p>

      <form onSubmit={handleLogin} className="space-y-5">
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

        {/* Login Button */}
        <button type="submit" className="bg-lime-500 w-full rounded-md py-3 text-white">
          Login
        </button>
      </form>

      <div className="space-y-2 mt-4">
        <button className="text-xs hover:underline hover:text-lime-500 text-gray-400">
          Forgot password?
        </button>
      </div>

      {/* Google Button */}
      <button
        type="button"
        className="btn btn-outline w-full flex items-center justify-center gap-2 mt-6"
      >
        <FcGoogle size={24} />
        Continue with Google
      </button>

      <p className="text-center text-sm text-gray-600 mt-6">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
