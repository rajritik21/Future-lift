import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-2">
              <img src="/logo.png" alt="FutureLift" className="h-18 w-auto mr-2" />
              {/* <span className="text-white text-xl font-bold">FutureLift</span> */}
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your Gateway to Opportunities! Navigate Your Next Career Move with FutureLift.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/team" className="text-gray-400 hover:text-white transition-colors">Our Team</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">Browse Jobs</Link></li>
              <li><Link to="/companies" className="text-gray-400 hover:text-white transition-colors">Companies</Link></li>
            </ul>
          </div>

          {/* Job Seekers */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium text-white mb-4">Job Seekers</h3>
            <ul className="space-y-2">
              <li><Link to="/profile/create" className="text-gray-400 hover:text-white transition-colors">Create Profile</Link></li>
              <li><Link to="/jobs/search" className="text-gray-400 hover:text-white transition-colors">Job Search</Link></li>
              <li><Link to="/resources/career" className="text-gray-400 hover:text-white transition-colors">Career Resources</Link></li>
              <li><Link to="/resources/resume" className="text-gray-400 hover:text-white transition-colors">Resume Tips</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Employers */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium text-white mb-4">Employers</h3>
            <ul className="space-y-2">
              <li><Link to="/jobs/post" className="text-gray-400 hover:text-white transition-colors">Post a Job</Link></li>
              <li><Link to="/employers/profile" className="text-gray-400 hover:text-white transition-colors">Create Company Profile</Link></li>
              <li><Link to="/resumes/browse" className="text-gray-400 hover:text-white transition-colors">Browse Resumes</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing Plans</Link></li>
              <li><Link to="/resources/employer" className="text-gray-400 hover:text-white transition-colors">Employer Resources</Link></li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">© {new Date().getFullYear()} FutureLift. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="text-sm text-gray-500 hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;