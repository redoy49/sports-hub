import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useRole';
import LoadingSpinner from '../components/LoadingSpinner';

const MemberRoute = ({ children }) => {
  const { user, isAuthLoading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (isAuthLoading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== 'member') {
    // Logged in but not a member, redirect to forbidden
    return <Navigate to="/forbidden" replace />;
  }

  // User is authenticated and has member role
  return children;
};

export default MemberRoute;
