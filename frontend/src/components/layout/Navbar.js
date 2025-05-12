import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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
  const dropdownTimerRef = useRef(null);

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
          <span className="relative z-10">My Profile</span>
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
            <span className="relative z-10">Admin</span>
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
            <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-right">
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
              </div>
            </div>
          )}
        </div>
      )}
      <button
        onClick={logout}
        className="ml-3 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-red-500 to-orange-400 group-hover:from-red-500 group-hover:to-orange-400 text-white focus:ring-4 focus:outline-none focus:ring-red-200"
      >
        <span className="relative px-4 py-2 transition-all ease-in duration-200 bg-transparent rounded-md group-hover:bg-opacity-0">
          Logout
        </span>
      </button>
    </>
  );

  const guestLinks = (
    <>
      <div 
        className="relative"
        onMouseEnter={() => handleMouseEnter('user')}
        onMouseLeave={handleMouseLeave}
      >
        <div className="ml-3 text-white hover:text-yellow-300 px-4 py-2 rounded-md text-sm font-medium border border-white/30 hover:border-yellow-300 transition-all duration-300 flex items-center cursor-pointer">
          <span>User</span>
          <svg className={`ml-1 h-5 w-5 transition-transform duration-200 ${hoveredDropdown === 'user' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {hoveredDropdown === 'user' && (
          <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-right">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <Link
                to="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/login?signup=true"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
      <Link to="/admin/login" className="ml-3 text-white hover:text-yellow-300 px-4 py-2 rounded-md text-sm font-medium border border-white/30 hover:border-yellow-300 transition-all duration-300">
        Admin
      </Link>
    </>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary-800 shadow-lg' : 'bg-primary-700'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section - Left */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img className="h-10 w-auto" src="/logo.png" alt="FutureLift" />
            </Link>
          </div>
          
          {/* Navigation Links - Center */}
          <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
            <div className="flex space-x-4">
              <Link to="/" className="relative group px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-all duration-300">
                <span className="relative z-10">Home</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('jobs')}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="relative group px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-all duration-300 flex items-center cursor-pointer"
                >
                  <span className="relative z-10">Find Jobs</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
                  <svg className={`ml-1 h-5 w-5 transition-transform duration-200 ${hoveredDropdown === 'jobs' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {hoveredDropdown === 'jobs' && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-right">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/jobs/government"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Government Jobs
                      </Link>
                      <Link
                        to="/jobs/recent"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Recent Jobs
                      </Link>
                      <Link
                        to="/jobs/remote"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Remote Jobs
                      </Link>
                      <Link
                        to="/jobs/featured"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Featured Jobs
                      </Link>
                      <Link
                        to="/jobs/location"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Jobs by Location
                      </Link>
                      <Link
                        to="/jobs/walkin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Walk-in Jobs
                      </Link>
                      <Link
                        to="/jobs/fresher"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
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
                  className="relative group px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-all duration-300 flex items-center cursor-pointer"
                >
                  <span className="relative z-10">Internships</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
                  <svg className={`ml-1 h-5 w-5 transition-transform duration-200 ${hoveredDropdown === 'internships' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {hoveredDropdown === 'internships' && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-right">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/internships/recent"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Recent Internships
                      </Link>
                      <Link
                        to="/internships/remote"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Remote Internships
                      </Link>
                      <Link
                        to="/internships/featured"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Featured Internships
                      </Link>
                      <Link
                        to="/internships/company"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Internships by Company
                      </Link>
                      <Link
                        to="/internships/campus"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Campus Internships
                      </Link>
                      <Link
                        to="/internships/wfh"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Work from Home Internships
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                className="relative"nsit             onMouseEnter={() => handleMouseEnter('companies')}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="relative group px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-all duration-300 flex items-center cursor-pointer"
                >
                  <span className="relative z-10">Companies</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
                  <svg className={`ml-1 h-5 w-5 transition-transform duration-200 ${hoveredDropdown === 'companies' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {hoveredDropdown === 'companies' && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-right">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/companies/mnc"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        MNCs
                      </Link>
                      <Link
                        to="/companies/it"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        IT Companies
                      </Link>
                      <Link
                        to="/companies/finance"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Finance Companies
                      </Link>
                      <Link
                        to="/companies/product"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Product-Based Companies
                      </Link>
                      <Link
                        to="/companies/service"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Service-Based Companies
                      </Link>
                      <Link
                        to="/companies/startups"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Startups
                      </Link>
                      <Link
                        to="/companies/government"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
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
                  className="relative group px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-all duration-300 flex items-center cursor-pointer"
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
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Resume Tips
                      </Link>
                      <Link
                        to="/resources/interview-tips"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Interview Tips
                      </Link>
                      <Link
                        to="/resources/aptitude-practice"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Aptitude Practice
                      </Link>
                      <Link
                        to="/resources/career-guidance"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Career Guidance
                      </Link>
                      <Link
                        to="/resources/mock-tests"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Mock Tests
                      </Link>
                      <Link
                        to="/resources/free-courses"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Free Courses / Certifications
                      </Link>
                      <Link
                        to="/resources/webinars-events"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
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
                  className="relative group px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-all duration-300 flex items-center cursor-pointer"
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
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        IT
                      </Link>
                      <Link
                        to="/categories/finance"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Finance
                      </Link>
                      <Link
                        to="/categories/marketing"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Marketing
                      </Link>
                      <Link
                        to="/categories/design"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Design
                      </Link>
                      <Link
                        to="/categories/engineering"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Engineering
                      </Link>
                      <Link
                        to="/categories/healthcare"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Healthcare
                      </Link>
                      <Link
                        to="/categories/education"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        Education
                      </Link>
                      <Link
                        to="/categories/hr-operations"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      >
                        HR & Operations
                      </Link>
                      <Link
                        to="/categories/sales-business"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
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
          <div className="hidden md:flex md:items-center">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
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
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-800/90 backdrop-blur-sm">
          <Link
            to="/"
            className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <button
            onClick={() => toggleDropdown('mobile-jobs')}
            className="text-white hover:bg-primary-600 w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center"
          >
            <span>Find Jobs</span>
            <svg className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === 'mobile-jobs' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {activeDropdown === 'mobile-jobs' && (
            <div className="pl-4 space-y-1 bg-primary-700/50 rounded-md">
              <Link
                to="/jobs/government"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Government Jobs
              </Link>
              <Link
                to="/jobs/recent"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Recent Jobs
              </Link>
              <Link
                to="/jobs/remote"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Remote Jobs
              </Link>
              <Link
                to="/jobs/featured"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Featured Jobs
              </Link>
              <Link
                to="/jobs/location"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs by Location
              </Link>
              <Link
                to="/jobs/walkin"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Walk-in Jobs
              </Link>
              <Link
                to="/jobs/fresher"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Fresher Jobs
              </Link>
            </div>
          )}
          <button
            onClick={() => toggleDropdown('mobile-internships')}
            className="text-white hover:bg-primary-600 w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center"
          >
            <span>Internships</span>
            <svg className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === 'mobile-internships' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {activeDropdown === 'mobile-internships' && (
            <div className="pl-4 space-y-1 bg-primary-700/50 rounded-md">
              <Link
                to="/internships/recent"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Recent Internships
              </Link>
              <Link
                to="/internships/remote"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Remote Internships
              </Link>
              <Link
                to="/internships/featured"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Featured Internships
              </Link>
              <Link
                to="/internships/company"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Internships by Company
              </Link>
              <Link
                to="/internships/campus"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Campus Internships
              </Link>
              <Link
                to="/internships/wfh"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Work from Home Internships
              </Link>
            </div>
          )}
          <button
            onClick={() => toggleDropdown('mobile-companies')}
            className="text-white hover:bg-primary-600 w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center"
          >
            <span>Companies</span>
            <svg className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === 'mobile-companies' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {activeDropdown === 'mobile-companies' && (
            <div className="pl-4 space-y-1 bg-primary-700/50 rounded-md">
              <Link
                to="/companies/mnc"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                MNCs
              </Link>
              <Link
                to="/companies/it"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                IT Companies
              </Link>
              <Link
                to="/companies/finance"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Finance Companies
              </Link>
              <Link
                to="/companies/product"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Product-Based Companies
              </Link>
              <Link
                to="/companies/service"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Service-Based Companies
              </Link>
              <Link
                to="/companies/startups"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Startups
              </Link>
              <Link
                to="/companies/government"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Government & PSU Companies
              </Link>
            </div>
          )}
          <button
            onClick={() => toggleDropdown('mobile-resources')}
            className="text-white hover:bg-primary-600 w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center"
          >
            <span>Resources</span>
            <svg className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === 'mobile-resources' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {activeDropdown === 'mobile-resources' && (
            <div className="pl-4 space-y-1 bg-primary-700/50 rounded-md">
              <Link
                to="/resources/resume-tips"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Resume Tips
              </Link>
              <Link
                to="/resources/interview-tips"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Interview Tips
              </Link>
              <Link
                to="/resources/aptitude-practice"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Aptitude Practice
              </Link>
              <Link
                to="/resources/career-guidance"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Career Guidance
              </Link>
              <Link
                to="/resources/mock-tests"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Mock Tests
              </Link>
              <Link
                to="/resources/free-courses"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Free Courses / Certifications
              </Link>
              <Link
                to="/resources/webinars-events"
                className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Webinars & Events
              </Link>
            </div>
          )}
          <button
            onClick={() => toggleDropdown('mobile-categories')}
            className="text-white hover:bg-primary-600 w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center"
          >
            <span>Categories</span>
            <svg className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === 'mobile-categories' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {activeDropdown === 'mobile-categories' && (
            <div className="pl-4 space-y-1 bg-primary-700/50 rounded-md">
              {categories && categories.length > 0 ? (
                categories.filter(category => category.isActive).map((category) => (
                  <Link
                    key={category._id}
                    to={`/categories/${category.slug || getSlug(category.name)}`}
                    className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <>
                  <Link
                    to="/categories/technology"
                    className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Technology
                  </Link>
                  <Link
                    to="/categories/finance"
                    className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Finance
                  </Link>
                  <Link
                    to="/categories/marketing"
                    className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Marketing
                  </Link>
                  <Link
                    to="/categories/healthcare"
                    className="text-gray-300 hover:bg-primary-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
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
                <Link
                  to="/dashboard"
                  className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/login?signup=true"
                  className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
                <Link
                  to="/admin/login"
                  className="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium border border-white/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;