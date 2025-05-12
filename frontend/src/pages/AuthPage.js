import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Login } from '../components/auth';

const AuthPage = () => {
  const location = useLocation();
  const isAdminLogin = location.pathname === '/admin/login';

  return <Login isAdminLogin={isAdminLogin} />;
};

export default AuthPage; 