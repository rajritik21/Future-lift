import React, { useEffect } from 'react';

const AuthLayout = ({ children }) => {
  useEffect(() => {
    // Add the auth-page-background class to the body when component mounts
    document.body.classList.add('auth-page-background');
    
    // Remove the class when component unmounts
    return () => {
      document.body.classList.remove('auth-page-background');
    };
  }, []);

  return (
    <div className="auth-layout">
      {children}
    </div>
  );
};

export default AuthLayout; 