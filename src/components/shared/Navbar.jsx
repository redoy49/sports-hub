import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useUserRole from "../../hooks/useRole";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const {role} = useUserRole()
  console.log(role);

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
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/courts">Courts</NavLink></li>
      {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
    </>
  );

  return (
    <nav className="w-full fixed px-5 lg:px-8 xl:px-[8%] 2xl:px-[15.5%] flex items-center justify-between p-4 bg-slate-50 shadow-sm z-10">
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost p-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52 text-black">
            {navLinks}
          </ul>
        </div>

        {/* Logo + Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img src="" alt="Logo" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-bold text-green-600">SCMS</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex">
          <ul className="flex gap-6 text-base font-medium">{navLinks}</ul>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.photoURL}
                  alt={user?.displayName || "User"}
                  title={user?.displayName || "User"}
                />
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><span className="text-sm">{user.displayName || user.email}</span></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-outline border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm bg-green-600 text-white hover:bg-green-700">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
