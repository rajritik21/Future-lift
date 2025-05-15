import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const WelcomeSection = ({ user }) => {
  // Log user data when component mounts
  useEffect(() => {
    console.log('WelcomeSection received user data:', user);
  }, [user]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Not provided';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Not provided';
    }
  };

  // Format phone number for display
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber || phoneNumber.trim() === '') return 'Not provided';
    return phoneNumber;
  };

  // Calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return null;
    
    try {
      const birthDate = new Date(dob);
      if (isNaN(birthDate.getTime())) return null;
      
      const today = new Date();
      
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age;
    } catch (error) {
      console.error('Error calculating age:', error);
      return null;
    }
  };

  // Check if user has completed their registration info
  const hasCompletedBasicInfo = user && 
    user.name && 
    user.email && 
    (user.mobile && user.mobile.trim() !== '') && 
    user.dob;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Welcome to Your Dashboard</h2>
        <Link 
          to="/jobs" 
          className="bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors"
        >
          Browse Available Jobs
        </Link>
      </div>
      
      {!hasCompletedBasicInfo && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-info-circle text-blue-500 text-xl"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                Complete your profile to increase your chances of getting noticed by employers. Add your education, skills, and work experience.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Account Information */}
        <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-primary-100 p-3 mr-3">
              <i className="fas fa-user text-primary-600"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-800">Account Information</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">Full Name</div>
              <div className="font-medium">{user?.name || 'Not provided'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Email Address</div>
              <div className="font-medium">{user?.email || 'Not provided'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Account Type</div>
              <div className="font-medium capitalize">{user?.userType || 'Jobseeker'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Joined On</div>
              <div className="font-medium">{formatDate(user?.createdAt || new Date())}</div>
            </div>
          </div>
        </div>
        
        {/* Personal Information */}
        <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-purple-100 p-3 mr-3">
              <i className="fas fa-id-card text-purple-600"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-800">Personal Information</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">Mobile Number</div>
              <div className="font-medium">{formatPhoneNumber(user?.mobile)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Date of Birth</div>
              <div className="font-medium">{formatDate(user?.dob)}</div>
            </div>
            {user?.dob && !isNaN(new Date(user.dob).getTime()) && (
              <div>
                <div className="text-sm text-gray-500">Age</div>
                <div className="font-medium">{calculateAge(user?.dob)} years</div>
              </div>
            )}
            <div className="pt-2">
              <Link 
                to="#" 
                onClick={() => document.querySelector('button[data-tab="profile"]').click()} 
                className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
              >
                <i className="fas fa-pen mr-1"></i> Edit Personal Information
              </Link>
            </div>
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-green-100 p-3 mr-3">
              <i className="fas fa-tasks text-green-600"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-800">Next Steps</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-2">
                <i className="fas fa-check text-xs text-green-600"></i>
              </div>
              <span className="text-sm text-gray-600">Account successfully created</span>
            </li>
            <li className="flex items-start">
              <div className={`flex-shrink-0 w-5 h-5 rounded-full ${hasCompletedBasicInfo ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center mt-0.5 mr-2`}>
                <i className={`fas ${hasCompletedBasicInfo ? 'fa-check text-green-600' : 'fa-pen text-gray-600'} text-xs`}></i>
              </div>
              <span className="text-sm text-gray-600">Complete your profile</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 mr-2">
                <i className="fas fa-file-alt text-xs text-gray-600"></i>
              </div>
              <span className="text-sm text-gray-600">Upload your resume</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 mr-2">
                <i className="fas fa-briefcase text-xs text-gray-600"></i>
              </div>
              <span className="text-sm text-gray-600">Apply for your first job</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Popular Job Categories */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Popular Job Categories</h3>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/jobs?category=technology" className="bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors">
              <div className="font-medium text-gray-700">Technology</div>
              <div className="text-sm text-gray-500">Software, IT, Data</div>
            </Link>
            <Link to="/jobs?category=marketing" className="bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors">
              <div className="font-medium text-gray-700">Marketing</div>
              <div className="text-sm text-gray-500">Digital, Social Media</div>
            </Link>
            <Link to="/jobs?category=finance" className="bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors">
              <div className="font-medium text-gray-700">Finance</div>
              <div className="text-sm text-gray-500">Accounting, Banking</div>
            </Link>
            <Link to="/jobs?category=healthcare" className="bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors">
              <div className="font-medium text-gray-700">Healthcare</div>
              <div className="text-sm text-gray-500">Medical, Nursing</div>
            </Link>
          </div>
        </div>
        
        {/* Career Resources */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Career Resources</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/resources/resume-tips" className="flex items-start hover:bg-gray-50 p-2 rounded-md transition-colors">
                <div className="rounded-full bg-blue-100 p-2 mr-3 mt-1">
                  <i className="fas fa-file-alt text-blue-600 text-xs"></i>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Resume Building Tips</div>
                  <div className="text-sm text-gray-500">Create a compelling resume</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/resources/interview-tips" className="flex items-start hover:bg-gray-50 p-2 rounded-md transition-colors">
                <div className="rounded-full bg-green-100 p-2 mr-3 mt-1">
                  <i className="fas fa-user-tie text-green-600 text-xs"></i>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Interview Preparation</div>
                  <div className="text-sm text-gray-500">Ace your next interview</div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection; 