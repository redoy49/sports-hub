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

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="lg:hidden">
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="p-4 flex-grow">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <ul className="menu p-4 w-72 bg-base-200 text-base-content min-h-full">
          <Link to="/">
            <h2 className="text-xl font-bold mb-4 cursor-pointer hover:text-blue-600 transition-colors">
              SCMS
            </h2>
          </Link>

          {/* Dashboard Home */}
          <li>
            <NavLink to="/dashboard" end>
              <FaHome /> Dashboard Home
            </NavLink>
          </li>

          {/* User Dashboard (non-member) */}
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

          {/* Member Dashboard */}
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

          {/* Admin Dashboard */}
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
