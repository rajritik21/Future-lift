import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect to login page with a parameter to show the sign-up form
    if (!isAuthenticated) {
      // Add a query parameter to indicate we want to show the sign-up form
      navigate('/login?signup=true');
    } else {
      // If already logged in, redirect to dashboard
      navigate('/dashboard');
    }
  }, [navigate, isAuthenticated]);

  return null;
};

export default Register;