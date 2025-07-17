import React from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Register = () => {
  const { registerUserWithEmail, updateUserDetails, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Email + Password Registration
  const handleRegister = async (data) => {
    const { fullName, email, password } = data;

    try {
      const result = await registerUserWithEmail(email, password);
      await updateUserDetails(fullName, null);

      console.log("Registered user info:", result.user);

      toast.success("Registration successful!");
      navigate("/");

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed!");
    }
  };

  // Google Registration/Login
  const handleGoogleSignIn = async () => {
    try {
      const result = await loginWithGoogle();

      const now = new Date().toISOString();

      const userData = {
        name: result?.user?.displayName || "Unknown",
        email: result?.user?.email,
        image: result?.user?.photoURL,
        createdAt: now,
        lastLogin: now,
      };

      console.log("Google user data:", userData);

      toast.success("Google sign-in successful!");
      navigate("/");

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Google sign-in failed!");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Register Now</h2>
      <p className="text-gray-600 mb-8">Fill the form below to create your account</p>

      <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
        {/* Full Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Full Name</span>
          </label>
          <input
            type="text"
            {...register("fullName", { required: "Full name is required" })}
            placeholder="Enter your full name"
            className="input input-bordered w-full"
          />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="input input-bordered w-full"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your password"
            className="input input-bordered w-full"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="bg-lime-500 w-full rounded-md py-3 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Sign Up"}
        </button>
      </form>

      <div className="divider text-gray-400">Or register with</div>

      {/* Google Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
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
