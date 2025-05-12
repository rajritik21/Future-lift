import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateAdminRoute = ({ element }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    loading: true,
    user: null
  });

  useEffect(() => {
    // Check if user is authenticated and is an admin
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');
      
      if (token && userString) {
        try {
          const user = JSON.parse(userString);
          setAuthState({
            isAuthenticated: true,
            loading: false,
            user
          });
        } catch (error) {
          console.error('Error parsing user data:', error);
          setAuthState({
            isAuthenticated: false,
            loading: false,
            user: null
          });
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          loading: false,
          user: null
        });
      }
    };

    checkAuth();
  }, []);

  const { isAuthenticated, loading, user } = authState;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user || user.userType !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return element;
};

export default PrivateAdminRoute; 