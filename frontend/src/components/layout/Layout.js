import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, isAuthenticated, logout, userType }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        logout={logout} 
        userType={userType}
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 