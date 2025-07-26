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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== 'member') {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default MemberRoute;
