import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import fallbackImage from "../../assets/profileFallback.png";
import athletedHub from "../../assets/athletesHub.png";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed.");
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/courts">Courts</NavLink>
      </li>
      <li>
        <NavLink to="/support">Support</NavLink>
      </li>
    </>
  );

  return (
    <nav className="w-full fixed px-5 lg:px-8 xl:px-[8%] 2xl:px-[15.5%] flex items-center justify-between bg-white border-b border-gray-950/5 z-10">
      <div className="w-full max-w-[1600px] h-16 mx-auto flex items-center justify-between">
        
        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost p-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52 text-[#121212]"
          >
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="hidden lg:flex items-center gap-2">
          <img
            src={athletedHub}
            alt="Logo"
            className="h-8 w-full object-contain text-black"
          />
        </Link>

        <div className="hidden lg:flex ml-auto">
          <ul className="flex gap-6 text-[#121212] mr-6">{navLinks}</ul>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <img
                  className="w-10 h-10 rounded-full border border-slate-300 object-cover"
                  src={user.photoURL || fallbackImage}
                  alt={user?.displayName || "User"}
                  title={user?.displayName || "User"}
                />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-[#121212] rounded-box w-52"
              >
                <li>
                  <span className="text-sm cursor-default">
                    {user.displayName || user.email}
                  </span>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm px-4 py-[5px] border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow hover:shadow-md transform focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="text-sm px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
