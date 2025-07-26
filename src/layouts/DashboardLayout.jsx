import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaCalendarAlt,
  FaMoneyBill,
  FaUsers,
  FaCog,
  FaBullhorn,
  FaCheck,
  FaCheckCircle,
} from "react-icons/fa";
import Navbar from "../components/shared/Navbar";
import useUserRole from "../hooks/useRole";
import athletedHub from "../assets/athletesHub.png";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <img src={athletedHub} alt="Logo" className="h-8" />
          </Link>
        </div>

        <main className="p-4">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay" />

        <ul className="menu p-4 w-72 min-h-full bg-slate-100 text-base-content text-left space-y-1">
          <Link to="/" className="hidden lg:flex items-center gap-2 mb-6">
            <img
              src={athletedHub}
              alt="Athlete Hub"
              className="h-12 w-full object-contain"
            />
          </Link>

          <li>
            <NavLink to="/dashboard" end>
              <FaHome /> Dashboard Home
            </NavLink>
          </li>

          {!roleLoading && role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard/pending-bookings">
                  <FaCalendarAlt /> Pending Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/announcements">
                  <FaBullhorn /> Announcements
                </NavLink>
              </li>
            </>
          )}

          {!roleLoading && role === "member" && (
            <>
              <li>
                <NavLink to="/dashboard/pending-bookings">
                  <FaCalendarAlt /> Pending Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/approved-bookings">
                  <FaCheck /> Approved Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/confirmed-bookings">
                  <FaCheckCircle /> Confirmed Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment-history">
                  <FaMoneyBill /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/announcements">
                  <FaBullhorn /> Announcements
                </NavLink>
              </li>
            </>
          )}

          {!roleLoading && role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/manage-bookings-approval">
                  <FaCheck /> Manage Bookings Approval
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-members">
                  <FaUsers /> Manage Members
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-users">
                  <FaUsers /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-courts">
                  <FaCog /> Manage Courts
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-bookings">
                  <FaCalendarAlt /> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-coupons">
                  <FaMoneyBill /> Manage Coupons
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/make-announcements">
                  <FaBullhorn /> Make Announcement
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
