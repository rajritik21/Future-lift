import React from 'react';
import { Link } from 'react-router-dom';

const Sitemap = () => {
  // Define site structure
  const siteStructure = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Our Team', path: '/team' },
        { name: 'Contact Us', path: '/contact' },
      ]
    },
    {
      title: 'Job Seeker',
      links: [
        { name: 'Browse Jobs', path: '/jobs' },
        { name: 'Create Profile', path: '/profile/create' },
        { name: 'Job Search', path: '/jobs/search' },
        { name: 'Career Resources', path: '/resources/career' },
        { name: 'Resume Tips', path: '/resources/resume' },
      ]
    },
    {
      title: 'Employers',
      links: [
        { name: 'Post a Job', path: '/jobs/post' },
        { name: 'Create Company Profile', path: '/employers/profile' },
        { name: 'Browse Resumes', path: '/resumes/browse' },
        { name: 'Pricing Plans', path: '/pricing' },
        { name: 'Employer Resources', path: '/resources/employer' },
      ]
    },
    {
      title: 'Popular Categories',
      links: [
        { name: 'Software Engineer', path: '/jobs/category/1' },
        { name: 'Information Technology', path: '/jobs/category/2' },
        { name: 'Technical Engineering', path: '/jobs/category/3' },
        { name: 'Web Development', path: '/jobs/category/4' },
        { name: 'System Engineer', path: '/jobs/category/5' },
        { name: 'Business Process Services', path: '/jobs/category/6' },
        { name: 'Graphics Design', path: '/jobs/category/7' },
        { name: 'Software Development', path: '/jobs/category/8' },
      ]
    },
    {
      title: 'User Account',
      links: [
        { name: 'Login', path: '/login' },
        { name: 'Register', path: '/register' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Saved Jobs', path: '/saved-jobs' },
        { name: 'Applied Jobs', path: '/applied-jobs' },
        { name: 'Settings', path: '/settings' },
      ]
    },
    {
      title: 'Admin',
      links: [
        { name: 'Admin Login', path: '/admin/login' },
        { name: 'Admin Dashboard', path: '/admin/dashboard' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'FAQ', path: '/faq' },
      ]
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Sitemap</h1>
          <p className="mt-4 text-lg text-gray-600">
            Find what you're looking for with our complete site navigation guide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {siteStructure.map((section, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path} 
                      className="text-primary-600 hover:text-primary-800 hover:underline flex items-center"
                    >
                      <i className="fas fa-chevron-right text-xs mr-2"></i>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Site structure visual representation */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Site Structure</h2>
          <div className="overflow-auto">
            <ul className="site-tree">
              <li>
                <span className="site-tree-node">FutureLift Home</span>
                <ul>
                  <li>
                    <span className="site-tree-node">Main Pages</span>
                    <ul>
                      <li><span className="site-tree-node">About Us</span></li>
                      <li><span className="site-tree-node">Our Team</span></li>
                      <li><span className="site-tree-node">Contact Us</span></li>
                    </ul>
                  </li>
                  <li>
                    <span className="site-tree-node">Jobs</span>
                    <ul>
                      <li><span className="site-tree-node">Browse All Jobs</span></li>
                      <li><span className="site-tree-node">Job Search</span></li>
                      <li><span className="site-tree-node">Job Categories</span></li>
                      <li><span className="site-tree-node">Job Details</span></li>
                    </ul>
                  </li>
                  <li>
                    <span className="site-tree-node">Companies</span>
                    <ul>
                      <li><span className="site-tree-node">Browse Companies</span></li>
                      <li><span className="site-tree-node">Company Details</span></li>
                    </ul>
                  </li>
                  <li>
                    <span className="site-tree-node">User Account</span>
                    <ul>
                      <li><span className="site-tree-node">Register</span></li>
                      <li><span className="site-tree-node">Login</span></li>
                      <li><span className="site-tree-node">Dashboard</span></li>
                      <li><span className="site-tree-node">Profile</span></li>
                    </ul>
                  </li>
                  <li>
                    <span className="site-tree-node">Resources</span>
                    <ul>
                      <li><span className="site-tree-node">Career Resources</span></li>
                      <li><span className="site-tree-node">Resume Tips</span></li>
                      <li><span className="site-tree-node">Employer Resources</span></li>
                    </ul>
                  </li>
                  <li>
                    <span className="site-tree-node">Legal</span>
                    <ul>
                      <li><span className="site-tree-node">Privacy Policy</span></li>
                      <li><span className="site-tree-node">Terms of Service</span></li>
                      <li><span className="site-tree-node">FAQ</span></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CSS for site tree visualization */}
      <style jsx="true">{`
        .site-tree,
        .site-tree ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .site-tree ul {
          margin-left: 20px;
          position: relative;
        }
        
        .site-tree ul::before {
          content: "";
          position: absolute;
          top: 0;
          left: -10px;
          border-left: 1px dashed #ccc;
          height: 100%;
        }
        
        .site-tree li {
          position: relative;
          padding: 5px 0 5px 15px;
        }
        
        .site-tree li::before {
          content: "";
          position: absolute;
          top: 15px;
          left: 0;
          width: 10px;
          height: 1px;
          border-top: 1px dashed #ccc;
        }
        
        .site-tree-node {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          background-color: #f3f4f6;
          border: 1px solid #e5e7eb;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default Sitemap; 