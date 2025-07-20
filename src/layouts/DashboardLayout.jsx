import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaUser,
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
        <div className="lg:hidden">
          <Navbar />
        </div>

        <main className="p-4 flex-grow">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <ul className="menu p-4 w-72 bg-base-200 text-base-content min-h-full">
          <h2 className="text-xl font-bold mb-4">SCMS Dashboard</h2>

          <li>
            <NavLink to="/dashboard">
              <FaHome /> Dashboard Home
            </NavLink>
          </li>

          {/* User & Member Common */}
          <li>
            <NavLink to="/dashboard/profile">
              <FaUser /> My Profile
            </NavLink>
          </li>
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

          {/* Member Exclusive */}
          {!roleLoading && role === "member" && (
            <>
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
            </>
          )}
          {/* Admin Exclusive */}
          {!roleLoading && role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/manage-bookings">
                  <FaCalendarAlt /> Manage Bookings Approval
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-users">
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-members">
                  <FaUsers /> Manage Members
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-courts">
                  <FaCog /> Manage Courts
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-bookings">
                  <FaMoneyBill /> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/make-coupons">
                  <FaBullhorn /> Manage Coupons
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/make-announcements">
                  <FaBullhorn /> Make Announcements
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
