import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const AdminLayout = ({ children }) => {
  const { isAuthenticated, userRole } = useAuthStore();

  if (!isAuthenticated || userRole === 'member') {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default AdminLayout;
