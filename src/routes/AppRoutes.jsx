import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import CourtsPage from "../pages/Courts/Courts";
import ManageCourts from "../pages/Dashboard/AdminRoute/ManageCourts";
import AdminRoute from "./AdminRoute";
import Forbidden from "../pages/Forbidden/Forbidden";
import MemberRoute from "./MemberRoute";
import PendingBookings from "../pages/Dashboard/MemberRoute/PendingBookings";
import ApprovedBookings from "../pages/Dashboard/MemberRoute/ApprovedBookings";
import ConfirmedBookings from "../pages/Dashboard/MemberRoute/ConfirmedBookings";
import PaymentPage from "../pages/Dashboard/MemberRoute/PaymentPage";
import PaymentHistory from "../pages/Dashboard/MemberRoute/PaymentHistory";
import AllUsers from "../pages/Dashboard/AdminRoute/AllUsers";
import ManageMembers from "../pages/Dashboard/AdminRoute/ManageMembers";
import ManageCoupons from "../pages/Dashboard/AdminRoute/ManageCoupons";
import ManageBookings from "../pages/Dashboard/AdminRoute/ManageBookings";
import ManageBookingsApproval from "../pages/Dashboard/AdminRoute/ManageBookingsApproval";
import MakeAnnouncements from "../pages/Dashboard/AdminRoute/MakeAnnouncements";
import MyProfile from "../pages/Dashboard/MemberRoute/MyProfile";

// Placeholder dashboard pages
// import UserDashboard from "../pages/Dashboard/UserDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/courts",
        element: <CourtsPage />,
      },
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
      { index: true, element: <p>User</p> },
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
        path: "make-announcements",
        element: (
          <AdminRoute>
            <MakeAnnouncements />
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
        path: "payment-page",
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
        path: "profile",
        element: (
          <MemberRoute>
            <MyProfile />
          </MemberRoute>
        ),
      },
      // You can add admin/member pages here later
    ],
  },
]);

export default router;
