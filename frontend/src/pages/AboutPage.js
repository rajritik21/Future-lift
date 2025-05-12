import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const stats = [
    { id: 1, name: 'Active Job Listings', value: '1,000+' },
    { id: 2, name: 'Companies', value: '500+' },
    { id: 3, name: 'Registered Job Seekers', value: '10,000+' },
    { id: 4, name: 'Success Rate', value: '85%' }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">About FutureLift</h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              Connecting talent with opportunity and helping businesses find their perfect match.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              At FutureLift, our mission is to bridge the gap between talented job seekers and employers, 
              creating meaningful connections that drive career growth and business success. We believe 
              in making the job search process more efficient, transparent, and rewarding for everyone involved.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We strive to be the most trusted job portal in India, providing unparalleled service and support 
              to our users while continuously innovating to meet the evolving needs of the job market.
            </p>
          </div>
          <div>
            <img 
              src="https://plus.unsplash.com/premium_photo-1661274151793-173c09ced789?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Our Mission" 
              className="rounded-xl shadow-lg w-full h-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/600x400?text=Our+Mission';
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-24">
          <div className="order-2 md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1598257006460-4cd5d043cf49?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Our Vision" 
              className="rounded-xl shadow-lg w-full h-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/600x400?text=Our+Vision';
              }}
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We envision a future where every individual can find fulfilling work that matches their skills and aspirations, 
              and where businesses can seamlessly connect with the talent they need to thrive. Our platform is designed 
              to make this vision a reality.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              By 2025, we aim to become the leading job portal in India, serving millions of users and setting 
              new standards for excellence in the recruitment industry.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Impact</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              We've helped thousands of businesses and job seekers connect, creating positive outcomes across industries.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-sm md:text-base font-medium text-gray-500">{stat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            From humble beginnings to becoming a trusted name in job recruitment.
          </p>
        </div>
        <div className="prose prose-lg max-w-3xl mx-auto text-gray-600">
          <p>
            FutureLift was founded in 2023 by a team of passionate professionals who recognized the challenges 
            both job seekers and employers face in the modern job market. Led by Ritik Ranjan, our team set out 
            to create a platform that would revolutionize how people find jobs and how companies recruit talent.
          </p>
          <p>
            Starting with a small user base in Bihar, we quickly expanded our reach across India, 
            attracting thousands of job seekers and hundreds of companies who appreciated our user-friendly 
            interface and commitment to quality.
          </p>
          <p>
            Today, FutureLift is a growing platform that continues to innovate and improve. We're 
            constantly adding new features and enhancing existing ones based on feedback from our users, 
            ensuring that we remain at the forefront of the industry.
          </p>
          <p>
            Our team has grown to include talented developers, designers, customer support specialists, 
            and recruitment experts, all working together to create the best possible experience for our users.
          </p>
          <p>
            We're proud of how far we've come, but we're even more excited about where we're going. 
            As we continue to grow, we remain committed to our core values of integrity, innovation, 
            and collaboration, always putting our users first.
          </p>
        </div>
      </div>

      {/* Our Services */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for both job seekers and employers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Job Seekers */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-user-tie text-primary-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">For Job Seekers</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Easy job search with powerful filters</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Profile creation to showcase your skills</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Job alerts for relevant opportunities</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Resume building and improvement tips</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Career counseling services</span>
                </li>
              </ul>
            </div>

            {/* For Employers */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-building text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">For Employers</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Easy job posting and management</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Access to a large database of candidates</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Company profile customization</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Applicant tracking and management</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Recruitment insights and analytics</span>
                </li>
              </ul>
            </div>

            {/* Premium Features */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-crown text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Features</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Featured job listings</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Advanced candidate filtering</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Priority customer support</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Detailed performance reports</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Dedicated account manager</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Whether you're looking for your dream job or searching for the perfect candidate, 
              FutureLift is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login?signup=true" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-100">
                Create an Account
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;