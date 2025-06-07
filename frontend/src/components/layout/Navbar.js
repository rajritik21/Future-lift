import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as notificationService from '../../services/notificationService';
import useScrollToSection from '../../hooks/useScrollToSection';

const Navbar = ({ isAuthenticated, logout, userType, categories = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const [isInternshipsOpen, setIsInternshipsOpen] = useState(false);
  const [isCompaniesOpen, setIsCompaniesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const dropdownTimerRef = useRef(null);
  const scrollToSection = useScrollToSection();

  // Get user data from localStorage
  const getUserData = () => {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  };

  const userData = getUserData();

  // Get user initials for avatar placeholder
  const getUserInitials = () => {
    const user = getUserData();
    if (user && user.name) {
      const nameParts = user.name.split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return nameParts[0][0].toUpperCase();
    }
    return 'U';
  };

  // Get user avatar image URL if available
  const getUserAvatar = () => {
    const user = getUserData();
    return user && user.avatar ? user.avatar.url || user.avatar : null;
  };

  // Fetch notification count when the component mounts or auth state changes
  useEffect(() => {
    const fetchNotificationCount = async () => {
      if (isAuthenticated) {
        try {
          const count = await notificationService.getUnreadCount();
          setUnreadNotifications(count);
        } catch (err) {
          console.error('Error fetching notification count:', err);
          setUnreadNotifications(0);
        }
      } else {
        setUnreadNotifications(0);
      }
    };

    fetchNotificationCount();

    // Set up an interval to check for new notifications every 2 minutes
    const intervalId = setInterval(fetchNotificationCount, 2 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    if (dropdown === 'jobs') {
      setIsJobsOpen(!isJobsOpen);
    } else if (dropdown === 'internships') {
      setIsInternshipsOpen(!isInternshipsOpen);
    } else if (dropdown === 'companies') {
      setIsCompaniesOpen(!isCompaniesOpen);
    } else if (dropdown === 'resources') {
      setIsResourcesOpen(!isResourcesOpen);
    } else if (dropdown === 'categories') {
      setIsCategoriesOpen(!isCategoriesOpen);
    } else if (dropdown === 'mobile-employers' || dropdown === 'mobile-auth') {
      // For mobile dropdowns, toggle them in the activeDropdown state
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    } else {
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    }
  };

  const handleMouseEnter = (dropdown) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setHoveredDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setHoveredDropdown(null);
    }, 200); // Small delay to make the dropdown feel more natural
  };

  // Add function to convert category name to URL-friendly slug
  const getSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  // Notification Bell Component
  const NotificationBell = () => (
    <Link to="/notifications" className="relative text-white hover:text-yellow-300 transition-colors duration-300 flex items-center mx-2">
      <i className="fas fa-bell text-xl"></i>
      {unreadNotifications > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {unreadNotifications > 9 ? '9+' : unreadNotifications}
        </span>
      )}
    </Link>
  );

  const authLinks = (
    <>
      {userType === 'employer' && (
        <Link to="/dashboard" className="relative group px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-all duration-300">
          <span className="relative z-10">Dashboard</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
        </Link>
      )}
      {userType === 'jobseeker' && (
        <Link to="/dashboard" className="relative group px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-all duration-300">
          <span className="relative z-10">Dashboard</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
        </Link>
      )}
      {userType === 'admin' && (
        <div 
          className="relative"
          onMouseEnter={() => handleMouseEnter('admin')}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative group px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-all duration-300 flex items-center cursor-pointer"
          >
            <span className="relative z-10">Account</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
            <svg className={`ml-1 h-5 w-5 transition-transform duration-200 ${hoveredDropdown === 'admin' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {hoveredDropdown === 'admin' && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-right">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <Link
                  to="/admin/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                >
                  My Profile
                </Link>
                <Link
                  to="/admin/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/users"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                >
                  Manage Users
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-primary-50 hover:text-red-700 transition-colors duration-200"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="relative ml-auto flex items-center">
        {/* Notification Bell for all user types */}
        <NotificationBell />
        
        {/* User account dropdown */}
        <div 
          className="relative"
          onMouseEnter={() => handleMouseEnter('user-account')}
          onMouseLeave={handleMouseLeave}
        >
          {/* Profile picture with initials fallback */}
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/30 hover:border-yellow-300 transition-all duration-300 cursor-pointer">
              {getUserAvatar() ? (
                <img 
                  src={getUserAvatar()} 
                  alt={userData?.name || 'User'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-700 to-blue-800 flex items-center justify-center text-white font-bold">
                  {getUserInitials()}
                </div>
              )}
            </div>
          </div>
          
          {hoveredDropdown === 'user-account' && (
            <div className="absolute right-0 z-10 mt-2 w-64 rounded-md shadow-lg bg-white/95 backdrop-blur-md ring-1 ring-black/5 border border-indigo-100 transition-all duration-200 transform origin-top-right">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden mr-3">
                      {getUserAvatar() ? (
                        <img 
                          src={getUserAvatar()} 
                          alt={userData?.name || 'User'} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white font-bold">
                          {getUserInitials()}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{userData?.name || 'User'}</div>
                      <div className="text-xs text-gray-500">{userData?.email || ''}</div>
                    </div>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                >
                  My Dashboard
                </Link>
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                >
                  Profile
                </Link>
                <Link
                  to="/account/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                >
                  Account Settings
                </Link>
                <Link
                  to="/notifications"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                >
                  Notifications
                  {unreadNotifications > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {unreadNotifications}
                    </span>
                  )}
                </Link>
                {userType === 'jobseeker' && (
                  <>
                    <Link
                      to="/jobs/applications"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                    >
                      My Applications
                    </Link>
                    <Link
                      to="/jobs/saved"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                    >
                      Saved Jobs
                    </Link>
                  </>
                )}
                {userType === 'employer' && (
                  <>
                    <Link
                      to="/employer/jobs"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                    >
                      My Job Postings
                    </Link>
                    <Link
                      to="/employer/applications"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                    >
                      Received Applications
                    </Link>
                  </>
                )}
                <div className="border-t border-gray-200 pt-1">
                  <Link
                    to="/help-support"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                  >
                    Help & Support
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-primary-50 hover:text-red-700 transition-colors duration-200"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const guestLinks = (
    <div className="flex items-center">
      <div 
        className="relative"
        onMouseEnter={() => handleMouseEnter('user')}
        onMouseLeave={handleMouseLeave}
      >
        <div className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium border border-white/30 hover:border-yellow-300 transition-all duration-300 flex items-center cursor-pointer">
          <span>Sign In</span>
          <svg className={`ml-1 h-5 w-5 transition-transform duration-200 ${hoveredDropdown === 'user' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {hoveredDropdown === 'user' && (
          <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-right">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <Link
                to="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
              >
                <i className="fas fa-sign-in-alt mr-2"></i>Sign In
              </Link>
              <Link
                to="/login?signup=true"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
              >
                <i className="fas fa-user-plus mr-2"></i>Create Account
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <div 
        className="relative mx-2"
        onMouseEnter={() => handleMouseEnter('employers-btn')}
        onMouseLeave={handleMouseLeave}
      >
        <div className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium border border-white/30 hover:border-yellow-300 transition-all duration-300 flex items-center cursor-pointer">
          <span>Employers</span>
          <svg className={`ml-1 h-5 w-5 transition-transform duration-200 ${hoveredDropdown === 'employers-btn' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {hoveredDropdown === 'employers-btn' && (
          <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-right">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <Link
                to="/employer/login?signup=true"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
              >
                <i className="fas fa-user-plus mr-2"></i>Register as Employer
              </Link>
              <Link
                to="/employer/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
              >
                <i className="fas fa-sign-in-alt mr-2"></i>Employer Login
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <Link
                to="/employer/post-job"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
              >
                <i className="fas fa-plus-circle mr-2"></i>Post a Job
              </Link>
              <Link
                to="/employer/post-internship"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
              >
                <i className="fas fa-briefcase mr-2"></i>Post an Internship
              </Link>
              <Link
                to="/employer/add-company"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
              >
                <i className="fas fa-building mr-2"></i>Add Company Profile
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <Link to="/admin/login" className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium border border-white/30 hover:border-yellow-300 transition-all duration-300">
        Admin
      </Link>
    </div>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-poppins ${
      scrolled 
        ? 'bg-gradient-to-r from-indigo-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-md shadow-lg border-b border-white/10' 
        : 'bg-gradient-to-r from-indigo-800/80 via-blue-800/80 to-indigo-800/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section - Left */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center -ml-1">
              <img className="h-10 w-auto" src="/logo.png" alt="FutureLift" />
            </Link>
          </div>
          
          {/* Navigation Links - Center */}
          <div className="hidden md:flex md:items-center md:justify-center flex-1 mx-4">
            <div className="flex space-x-2 xl:space-x-4">
              <Link to="/" className="relative group px-2 py-2 text-[14px] font-semibold text-white hover:text-yellow-200 transition-all duration-300">
                <span className="relative z-10">Home</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('jobs')}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="relative group px-2 py-2 text-[14px] font-medium text-white hover:text-yellow-200 transition-all duration-300 flex items-center cursor-pointer"
                >
                  <span className="relative z-10">Find Jobs</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
                  <svg className={`ml-1 h-5 w-5 transition-transform duration-200 ${hoveredDropdown === 'jobs' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {hoveredDropdown === 'jobs' && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white/95 backdrop-blur-md ring-1 ring-black/5 border border-indigo-100 transition-all duration-200 transform origin-top-right">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/jobs/government"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Government Jobs
                      </Link>
                      <Link
                        to="/jobs/recent"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Recent Jobs
                      </Link>
                      <Link
                        to="/jobs/remote"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Remote Jobs
                      </Link>
                      <a
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection('featured-jobs');
                          setHoveredDropdown(null);
                        }}
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Featured Jobs
                      </a>
                      <Link
                        to="/jobs/location"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Jobs by Location
                      </Link>
                      <Link
                        to="/jobs/walkin"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Walk-in Jobs
                      </Link>
                      <Link
                        to="/jobs/fresher"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Fresher Jobs
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('internships')}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="relative group px-2 py-2 text-[14px] font-medium text-white hover:text-yellow-200 transition-all duration-300 flex items-center cursor-pointer"
                >
                  <span className="relative z-10">Internships</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
                  <svg className={`ml-1 h-5 w-5 transition-transform duration-200 ${hoveredDropdown === 'internships' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {hoveredDropdown === 'internships' && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white/95 backdrop-blur-md ring-1 ring-black/5 border border-indigo-100 transition-all duration-200 transform origin-top-right">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/internships/recent"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Recent Internships
                      </Link>
                      <Link
                        to="/internships/remote"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Remote Internships
                      </Link>
                      <Link
                        to="/internships/featured"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Featured Internships
                      </Link>
                      <Link
                        to="/internships/company"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Internships by Company
                      </Link>
                      <Link
                        to="/internships/campus"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Campus Internships
                      </Link>
                      <Link
                        to="/internships/wfh"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Work from Home Internships
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('companies')}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="relative group px-2 py-2 text-[14px] font-medium text-white hover:text-yellow-200 transition-all duration-300 flex items-center cursor-pointer"
                >
                  <span className="relative z-10">Companies</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
                  <svg className={`ml-1 h-5 w-5 transition-transform duration-200 ${hoveredDropdown === 'companies' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {hoveredDropdown === 'companies' && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white/95 backdrop-blur-md ring-1 ring-black/5 border border-indigo-100 transition-all duration-200 transform origin-top-right">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/companies/mnc"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        MNCs
                      </Link>
                      <Link
                        to="/companies/it"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        IT Companies
                      </Link>
                      <Link
                        to="/companies/finance"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Finance Companies
                      </Link>
                      <Link
                        to="/companies/product"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Product-Based Companies
                      </Link>
                      <Link
                        to="/companies/service"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Service-Based Companies
                      </Link>
                      <Link
                        to="/companies/startups"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Startups
                      </Link>
                      <Link
                        to="/companies/government"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Government & PSU Companies
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="relative group px-2 py-2 text-[14px] font-medium text-white hover:text-yellow-200 transition-all duration-300 flex items-center cursor-pointer"
                >
                  <span className="relative z-10">Resources</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
                  <svg className={`ml-1 h-5 w-5 transition-transform duration-200 ${hoveredDropdown === 'resources' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {hoveredDropdown === 'resources' && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-right">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/resources/resume-tips"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Resume Tips
                      </Link>
                      <Link
                        to="/resources/interview-tips"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Interview Tips
                      </Link>
                      <Link
                        to="/resources/aptitude-practice"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Aptitude Practice
                      </Link>
                      <Link
                        to="/resources/career-guidance"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Career Guidance
                      </Link>
                      <Link
                        to="/resources/mock-tests"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Mock Tests
                      </Link>
                      <Link
                        to="/resources/free-courses"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Free Courses / Certifications
                      </Link>
                      <Link
                        to="/resources/webinars-events"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Webinars & Events
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('categories')}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="relative group px-2 py-2 text-[14px] font-medium text-white hover:bg-white/10 transition-all duration-300 flex items-center cursor-pointer"
                >
                  <span className="relative z-10">Categories</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
                  <svg className={`ml-1 h-5 w-5 transition-transform duration-200 ${hoveredDropdown === 'categories' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {hoveredDropdown === 'categories' && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-right">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/categories/it"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        IT
                      </Link>
                      <Link
                        to="/categories/finance"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Finance
                      </Link>
                      <Link
                        to="/categories/marketing"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Marketing
                      </Link>
                      <Link
                        to="/categories/design"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Design
                      </Link>
                      <Link
                        to="/categories/engineering"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Engineering
                      </Link>
                      <Link
                        to="/categories/healthcare"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Healthcare
                      </Link>
                      <Link
                        to="/categories/education"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Education
                      </Link>
                      <Link
                        to="/categories/hr-operations"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        HR & Operations
                      </Link>
                      <Link
                        to="/categories/sales-business"
                        className="block px-4 py-2 text-[14px] text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Sales & Business Development
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Auth Buttons - Right */}
          <div className="hidden md:flex md:items-center md:ml-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center ml-auto">
            {isAuthenticated ? (
              <>
                {/* Logout Button for Mobile */}
                <div className="mr-4">
                  <button
                    onClick={logout}
                    className="px-3 py-1.5 text-[14px] font-medium text-white hover:text-red-300 transition-all duration-300 border border-white/20 rounded-md hover:border-red-400/50"
                  >
                    Logout
                  </button>
                </div>

                {/* Notification Bell for Mobile */}
                <div className="mr-4">
                  <Link to="/dashboard" className="relative text-white hover:text-yellow-300 transition-colors duration-300">
                    <i className="fas fa-bell text-xl"></i>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span>
                  </Link>
                </div>
              
                {/* Profile icon for Mobile */}
                <div className="mr-4">
                  <div 
                    className="relative"
                    onMouseEnter={() => handleMouseEnter('user-account-mobile')}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Profile picture with initials fallback */}
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border-2 border-yellow-300/50 hover:border-yellow-300 transition-all duration-300 cursor-pointer shadow-md">
                        {getUserAvatar() ? (
                          <img 
                            src={getUserAvatar()} 
                            alt={userData?.name || 'User'} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-indigo-800 to-blue-900 flex items-center justify-center text-white font-bold text-xs">
                            {getUserInitials()}
                          </div>
                        )}
                      </div>
                    </div>
                   
                    {/* Mobile dropdown content */}
                    {hoveredDropdown === 'user-account-mobile' && (
                      <div className="absolute right-0 z-10 mt-2 w-64 rounded-md shadow-lg bg-white/95 backdrop-blur-md ring-1 ring-black/5 border border-indigo-100 transition-all duration-200 transform origin-top-right">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          <div className="px-4 py-3 border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden mr-3">
                                {getUserAvatar() ? (
                                  <img 
                                    src={getUserAvatar()} 
                                    alt={userData?.name || 'User'} 
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white font-bold">
                                    {getUserInitials()}
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{userData?.name || 'User'}</div>
                                <div className="text-xs text-gray-500">{userData?.email || ''}</div>
                              </div>
                            </div>
                          </div>
                          <Link
                            to="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            My Dashboard
                          </Link>
                          <Link
                            to="/dashboard/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Profile
                          </Link>
                          <Link
                            to="/account/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Account Settings
                          </Link>
                          {userType === 'jobseeker' && (
                            <>
                              <Link
                                to="/jobs/applications"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                My Applications
                              </Link>
                              <Link
                                to="/jobs/saved"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                Saved Jobs
                              </Link>
                            </>
                          )}
                          {userType === 'employer' && (
                            <>
                              <Link
                                to="/employer/jobs"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                My Job Postings
                              </Link>
                              <Link
                                to="/employer/applications"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                Received Applications
                              </Link>
                            </>
                          )}
                          <div className="border-t border-gray-200 pt-1">
                            <Link
                              to="/help-support"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Help & Support
                            </Link>
                            <button
                              onClick={() => {
                                logout();
                                setIsMenuOpen(false);
                              }}
                              className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-primary-50 hover:text-red-700 transition-colors duration-200"
                            >
                              Log Out
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : null}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-300 ease-in-out md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b from-indigo-900/95 to-blue-900/95 backdrop-blur-md">
          <Link
            to="/"
            className="text-white hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300 transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <button
            onClick={() => toggleDropdown('mobile-jobs')}
            className="text-white hover:text-yellow-200 w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center border-l-2 border-transparent hover:border-yellow-300 transition-all duration-200"
          >
            <span>Find Jobs</span>
            <svg className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === 'mobile-jobs' ? 'rotate-180 text-yellow-300' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {activeDropdown === 'mobile-jobs' && (
            <div className="pl-4 space-y-1 bg-indigo-800/50 backdrop-blur-sm rounded-md">
              <Link
                to="/jobs/government"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Government Jobs
              </Link>
              <Link
                to="/jobs/recent"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Recent Jobs
              </Link>
              <Link
                to="/jobs/remote"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Remote Jobs
              </Link>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('featured-jobs');
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
              >
                Featured Jobs
              </a>
              <Link
                to="/jobs/location"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs by Location
              </Link>
              <Link
                to="/jobs/walkin"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Walk-in Jobs
              </Link>
              <Link
                to="/jobs/fresher"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Fresher Jobs
              </Link>
            </div>
          )}
          <button
            onClick={() => toggleDropdown('mobile-internships')}
            className="text-white hover:text-yellow-200 w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center border-l-2 border-transparent hover:border-yellow-300 transition-all duration-200"
          >
            <span>Internships</span>
            <svg className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === 'mobile-internships' ? 'rotate-180 text-yellow-300' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {activeDropdown === 'mobile-internships' && (
            <div className="pl-4 space-y-1 bg-indigo-800/50 backdrop-blur-sm rounded-md">
              <Link
                to="/internships/recent"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Recent Internships
              </Link>
              <Link
                to="/internships/remote"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Remote Internships
              </Link>
              <Link
                to="/internships/featured"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Featured Internships
              </Link>
              <Link
                to="/internships/company"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Internships by Company
              </Link>
              <Link
                to="/internships/campus"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Campus Internships
              </Link>
              <Link
                to="/internships/wfh"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Work from Home Internships
              </Link>
            </div>
          )}
          <button
            onClick={() => toggleDropdown('mobile-companies')}
            className="text-white hover:text-yellow-200 w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center border-l-2 border-transparent hover:border-yellow-300 transition-all duration-200"
          >
            <span>Companies</span>
            <svg className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === 'mobile-companies' ? 'rotate-180 text-yellow-300' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {activeDropdown === 'mobile-companies' && (
            <div className="pl-4 space-y-1 bg-indigo-800/50 backdrop-blur-sm rounded-md">
              <Link
                to="/companies/mnc"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                MNCs
              </Link>
              <Link
                to="/companies/it"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                IT Companies
              </Link>
              <Link
                to="/companies/finance"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Finance Companies
              </Link>
              <Link
                to="/companies/product"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Product-Based Companies
              </Link>
              <Link
                to="/companies/service"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Service-Based Companies
              </Link>
              <Link
                to="/companies/startups"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Startups
              </Link>
              <Link
                to="/companies/government"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Government & PSU Companies
              </Link>
            </div>
          )}
          <button
            onClick={() => toggleDropdown('mobile-employers')}
            className="text-white hover:text-yellow-200 w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center border-l-2 border-transparent hover:border-yellow-300 transition-all duration-200"
          >
            <span>Employers</span>
            <svg className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === 'mobile-employers' ? 'rotate-180 text-yellow-300' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {activeDropdown === 'mobile-employers' && (
            <div className="pl-4 space-y-1 bg-indigo-800/50 backdrop-blur-sm rounded-md">
              <Link
                to="/employer/login?signup=true"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-user-plus mr-2"></i>Register as Employer
              </Link>
              <Link
                to="/employer/login"
                className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium border border-white/30"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-building mr-2"></i>Employer Login/Register
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <Link
                to="/employer/post-job"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-plus-circle mr-2"></i>Post a Job
              </Link>
              <Link
                to="/employer/post-internship"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-briefcase mr-2"></i>Post an Internship
              </Link>
              <Link
                to="/employer/add-company"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-building mr-2"></i>Add Company Profile
              </Link>
            </div>
          )}
          <button
            onClick={() => toggleDropdown('mobile-resources')}
            className="text-white hover:text-yellow-200 w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center border-l-2 border-transparent hover:border-yellow-300 transition-all duration-200"
          >
            <span>Resources</span>
            <svg className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === 'mobile-resources' ? 'rotate-180 text-yellow-300' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {activeDropdown === 'mobile-resources' && (
            <div className="pl-4 space-y-1 bg-indigo-800/50 backdrop-blur-sm rounded-md">
              <Link
                to="/resources/resume-tips"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Resume Tips
              </Link>
              <Link
                to="/resources/interview-tips"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Interview Tips
              </Link>
              <Link
                to="/resources/aptitude-practice"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Aptitude Practice
              </Link>
              <Link
                to="/resources/career-guidance"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Career Guidance
              </Link>
              <Link
                to="/resources/mock-tests"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Mock Tests
              </Link>
              <Link
                to="/resources/free-courses"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Free Courses / Certifications
              </Link>
              <Link
                to="/resources/webinars-events"
                className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Webinars & Events
              </Link>
            </div>
          )}
          <button
            onClick={() => toggleDropdown('mobile-categories')}
            className="text-white hover:text-yellow-200 w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center border-l-2 border-transparent hover:border-yellow-300 transition-all duration-200"
          >
            <span>Categories</span>
            <svg className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === 'mobile-categories' ? 'rotate-180 text-yellow-300' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {activeDropdown === 'mobile-categories' && (
            <div className="pl-4 space-y-1 bg-indigo-800/50 backdrop-blur-sm rounded-md">
              {categories && categories.length > 0 ? (
                categories.filter(category => category.isActive).map((category) => (
                  <Link
                    key={category._id}
                    to={`/categories/${category.slug || getSlug(category.name)}`}
                    className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <>
                  <Link
                    to="/categories/technology"
                    className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Technology
                  </Link>
                  <Link
                    to="/categories/finance"
                    className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Finance
                  </Link>
                  <Link
                    to="/categories/marketing"
                    className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Marketing
                  </Link>
                  <Link
                    to="/categories/healthcare"
                    className="text-gray-300 hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-yellow-300/50 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Healthcare
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-primary-800">
          <div className="px-2 space-y-1">
            {isAuthenticated ? (
              <>
                {/* User profile info for mobile */}
                <div className="flex items-center px-3 py-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/30">
                    {getUserAvatar() ? (
                      <img 
                        src={getUserAvatar()} 
                        alt={userData?.name || 'User'} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white font-bold">
                        {getUserInitials()}
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">{userData?.name || 'User'}</div>
                    <div className="text-xs text-gray-500">{userData?.email || ''}</div>
                    {userType === 'employer' && (
                      <div className="text-xs mt-1 bg-blue-900 text-blue-200 px-2 py-0.5 rounded-full inline-block">
                        <i className="fas fa-building mr-1"></i>Employer
                      </div>
                    )}
                  </div>
                </div>
                
                {userType === 'admin' && (
                  <>
                    <Link
                      to="/admin/profile"
                      className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/admin/dashboard"
                      className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                    <Link
                      to="/admin/users"
                      className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Manage Users
                    </Link>
                  </>
                )}
                {userType === 'employer' && (
                  <>
                    <Link
                      to="/employer/dashboard"
                      className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-tachometer-alt mr-2"></i>Employer Dashboard
                    </Link>
                    <Link
                      to="/employer/jobs"
                      className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-briefcase mr-2"></i>My Job Postings
                    </Link>
                    <Link
                      to="/employer/post-job"
                      className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-plus-circle mr-2"></i>Post New Job
                    </Link>
                        <Link
                      to="/employer/post-internship"
                          className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                      <i className="fas fa-graduation-cap mr-2"></i>Post Internship
                        </Link>
                        <Link
                      to="/employer/applications"
                          className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                      <i className="fas fa-clipboard-list mr-2"></i>Received Applications
                    </Link>
                    <Link
                      to="/employer/add-company"
                      className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-building mr-2"></i>Company Profile
                        </Link>
                      </>
                    )}
                {userType !== 'admin' && userType !== 'employer' && (
                      <>
                        <Link
                      to="/dashboard"
                          className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                      My Dashboard
                        </Link>
                        <Link
                      to="/dashboard/profile"
                          className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                      Profile
                    </Link>
                    <Link
                      to="/account/settings"
                      className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Account Settings
                    </Link>
                    {userType === 'jobseeker' && (
                      <>
                        <Link
                          to="/jobs/applications"
                          className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Applications
                        </Link>
                        <Link
                          to="/jobs/saved"
                          className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Saved Jobs
                        </Link>
                      </>
                    )}
                    <Link
                      to="/help-support"
                      className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Help & Support
                    </Link>
                  </>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-primary-50 hover:text-red-700 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                    className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium border border-white/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                    <i className="fas fa-sign-in-alt mr-2"></i>Login
                </Link>
                <Link
                  to="/login?signup=true"
                    className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium border border-white/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                    <i className="fas fa-user-plus mr-2"></i>Register
                  </Link>
                  <Link
                    to="/employer/login"
                    className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium border border-white/30"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="fas fa-building mr-2"></i>Employer Login/Register
                </Link>
                <Link
                  to="/admin/login"
                  className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium border border-white/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                    <i className="fas fa-user-shield mr-2"></i>Admin
                </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;