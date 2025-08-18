import React from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";

const Login = () => {
  const { loginWithGoogle, loginUserWithEmail } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const result = await loginUserWithEmail(email, password);
      const userData = {
        name: result?.user?.displayName || "User",
        email: result?.user?.email,
        image: result?.user?.photoURL || null,
      };

      console.log("User Data: ", userData);

      const res = await axiosInstance.post("/users", userData);
      console.log("Login response:", res.data);

      toast.success("Login Successful!");
      reset();
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Email login failed.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await loginWithGoogle();
      const userData = {
        name: result?.user?.displayName || "Unknown",
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };

      console.log("UserData", userData);

      const res = await axiosInstance.post("/users", userData);
      console.log("Google login response:", res.data);

      toast.success("Google Login Successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Google Sign-in Failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Log In</h2>
      <p className="text-gray-600 mb-8">Sign in to access your account</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="input input-bordered w-full"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Enter your password"
            className="input input-bordered w-full"
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 w-full rounded-md py-3 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="btn btn-outline border-1 border-slate-300 w-full flex items-center justify-center gap-2 mt-6"
        disabled={isSubmitting}
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
