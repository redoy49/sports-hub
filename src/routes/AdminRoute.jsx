import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useRole';
import LoadingSpinner from '../components/LoadingSpinner';


const AdminRoute = ({ children }) => {
  const { user, isAuthLoading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (isAuthLoading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  if (role !== 'admin') {
    return <Navigate to="/forbidden" replace={true} />;
  }

  return children;
};

export default AdminRoute;
