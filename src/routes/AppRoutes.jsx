import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Forbidden from "../pages/Forbidden/Forbidden";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import MemberRoute from "./MemberRoute";

import CourtsPage from "../pages/Courts/Courts";

// Admin
import ManageCourts from "../pages/Dashboard/AdminRoute/ManageCourts";
import AllUsers from "../pages/Dashboard/AdminRoute/AllUsers";
import ManageMembers from "../pages/Dashboard/AdminRoute/ManageMembers";
import ManageCoupons from "../pages/Dashboard/AdminRoute/ManageCoupons";
import ManageBookings from "../pages/Dashboard/AdminRoute/ManageBookings";
import ManageBookingsApproval from "../pages/Dashboard/AdminRoute/ManageBookingsApproval";
import MakeAnnouncements from "../pages/Dashboard/AdminRoute/MakeAnnouncements";

// Member
import PendingBookings from "../pages/Dashboard/MemberRoute/PendingBookings";
import ApprovedBookings from "../pages/Dashboard/MemberRoute/ApprovedBookings";
import ConfirmedBookings from "../pages/Dashboard/MemberRoute/ConfirmedBookings";
import PaymentPage from "../pages/Dashboard/MemberRoute/PaymentPage";
import PaymentHistory from "../pages/Dashboard/MemberRoute/PaymentHistory";

import Announcements from "../pages/Dashboard/common/Announcements";

import UserPendingBookings from "../pages/Dashboard/UserRoute/UserPendingBookings"; // Create this if needed

import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Support from "../pages/Support/Support";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/courts", element: <CourtsPage /> },
      {path: '/support', element: <Support/>},
      { path: "forbidden", element: <Forbidden /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },

      {
        path: "pending-bookings",
        element: <PendingBookings />,
      },
      {
        path: "announcements",
        element: <Announcements />,
      },

      {
        path: "pending-bookings",
        element: (
          <MemberRoute>
            <PendingBookings />
          </MemberRoute>
        ),
      },
      {
        path: "approved-bookings",
        element: (
          <MemberRoute>
            <ApprovedBookings />
          </MemberRoute>
        ),
      },
      {
        path: "confirmed-bookings",
        element: (
          <MemberRoute>
            <ConfirmedBookings />
          </MemberRoute>
        ),
      },
      {
        path: "payment-page/:id",
        element: (
          <MemberRoute>
            <PaymentPage />
          </MemberRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <MemberRoute>
            <PaymentHistory />
          </MemberRoute>
        ),
      },
      {
        path: "announcements",
        element: (
          <MemberRoute>
            <Announcements />
          </MemberRoute>
        ),
      },

      {
        path: "manage-courts",
        element: (
          <AdminRoute>
            <ManageCourts />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-members",
        element: (
          <AdminRoute>
            <ManageMembers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <AdminRoute>
            <ManageBookings />
          </AdminRoute>
        ),
      },
      {
        path: "manage-bookings-approval",
        element: (
          <AdminRoute>
            <ManageBookingsApproval />
          </AdminRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <AdminRoute>
            <ManageCoupons />
          </AdminRoute>
        ),
      },
      {
        path: "make-announcements",
        element: (
          <AdminRoute>
            <MakeAnnouncements />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
