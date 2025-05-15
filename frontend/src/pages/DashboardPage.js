import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Todo from '../components/Todo';
import ProfileSection from '../components/dashboard/ProfileSection';
import ResumeSection from '../components/dashboard/ResumeSection';
import PasswordSection from '../components/dashboard/PasswordSection';
import WelcomeSection from '../components/dashboard/WelcomeSection';
import '../styles/Dashboard.css';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('welcome');
  const [refreshData, setRefreshData] = useState(false);
  const [profileStats, setProfileStats] = useState({
    profileCompletion: 0,
    applications: 0,
    savedJobs: 0,
    viewedJobs: 0
  });
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  // Function to trigger data refresh from children components
  const handleRefreshData = () => {
    setRefreshData(prev => !prev);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (!token) {
          return;
        }
        
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        };
        
        // Get user data
        const userResponse = await axios.get('/api/auth', config);
        
        // Process the user data
        let userData = userResponse.data;
        
        // Ensure date fields are properly formatted
        if (userData.dob) {
          try {
            // Ensure dob is a valid date object
            const dobDate = new Date(userData.dob);
            if (!isNaN(dobDate.getTime())) {
              // Format as ISO string for consistent handling
              userData.dob = dobDate.toISOString();
            }
          } catch (err) {
            console.error('Error formatting DOB from API:', err);
          }
        }
        
        console.log('User data from API:', userData);
        
        // Combine API data with any stored registration data
        if (storedUser) {
          try {
            const parsedStoredUser = JSON.parse(storedUser);
            console.log('Stored user data:', parsedStoredUser);
            
            // Ensure registration data is preserved
            userData = {
              ...userData,
              name: userData.name || parsedStoredUser.name,
              email: userData.email || parsedStoredUser.email,
              mobile: userData.mobile || parsedStoredUser.mobile,
              dob: userData.dob || parsedStoredUser.dob
            };
            
            // Update local storage with the latest data
            localStorage.setItem('user', JSON.stringify(userData));
          } catch (err) {
            console.error('Error parsing stored user data:', err);
          }
        }
        
        console.log('Final user data being set:', userData);
        setUser(userData);
        
        // Check if this is the first login
        const lastLoginTimestamp = localStorage.getItem('lastLoginTimestamp');
        const currentTimestamp = new Date().getTime();
        
        if (!lastLoginTimestamp) {
          setIsFirstLogin(true);
          setActiveTab('welcome');
        } else {
          // If it's been more than 30 days since last login, show welcome again
          const daysSinceLastLogin = (currentTimestamp - parseInt(lastLoginTimestamp)) / (1000 * 60 * 60 * 24);
          if (daysSinceLastLogin > 30) {
            setActiveTab('welcome');
          }
        }
        
        // Update the last login timestamp
        localStorage.setItem('lastLoginTimestamp', currentTimestamp.toString());
        
        // Calculate profile completion percentage
        let completionScore = 0;
        let totalFields = 0;
        
        // Check basic fields
        const fields = ['name', 'email', 'mobile', 'dob'];
        fields.forEach(field => {
          totalFields++;
          if (userData[field]) completionScore++;
        });
        
        const completionPercentage = Math.round((completionScore / totalFields) * 100);
        
        // Get profile stats (this would be a real API call in a production app)
        setProfileStats({
          profileCompletion: completionPercentage,
          applications: 0,
          savedJobs: 0,
          viewedJobs: 0
        });
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        
        // Try to use stored user data if API fails
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          } catch (err) {
            console.error('Error parsing stored user data:', err);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [refreshData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="bg-white shadow rounded-lg mb-6 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mr-4">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}!</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/jobs" className="bg-primary-100 text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-200 transition-colors">
                Browse Jobs
              </Link>
              <Link to="/jobs/applications" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                My Applications
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Dashboard Menu</h2>
              </div>
              <nav className="p-3">
                <ul className="space-y-1">
                  <li>
                    <button 
                      onClick={() => setActiveTab('welcome')}
                      data-tab="welcome"
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'welcome' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <i className="fas fa-home mr-3"></i>
                      Dashboard Home
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('profile')}
                      data-tab="profile"
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'profile' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <i className="fas fa-user-circle mr-3"></i>
                      Profile
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('resume')}
                      data-tab="resume"
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'resume' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <i className="fas fa-file-alt mr-3"></i>
                      Resume & Qualifications
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('applications')}
                      data-tab="applications"
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'applications' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <i className="fas fa-briefcase mr-3"></i>
                      My Applications
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('saved')}
                      data-tab="saved"
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'saved' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <i className="fas fa-bookmark mr-3"></i>
                      Saved Jobs
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('tasks')}
                      data-tab="tasks"
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'tasks' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <i className="fas fa-tasks mr-3"></i>
                      Tasks
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('password')}
                      data-tab="password"
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === 'password' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <i className="fas fa-lock mr-3"></i>
                      Change Password
                    </button>
                  </li>
                </ul>
              </nav>
              <div className="p-5 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">Profile Completion</h3>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${profileStats.profileCompletion}%` }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-primary-600">{profileStats.profileCompletion}%</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Activity Stats</h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <span className="text-gray-700">Applications</span>
                    </div>
                    <span className="font-semibold text-gray-900">{profileStats.applications}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
                        <i className="fas fa-bookmark"></i>
                      </div>
                      <span className="text-gray-700">Saved Jobs</span>
                    </div>
                    <span className="font-semibold text-gray-900">{profileStats.savedJobs}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                        <i className="fas fa-eye"></i>
                      </div>
                      <span className="text-gray-700">Jobs Viewed</span>
                    </div>
                    <span className="font-semibold text-gray-900">{profileStats.viewedJobs}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {activeTab === 'welcome' && <WelcomeSection user={user} />}
              {activeTab === 'profile' && <ProfileSection user={user} onRefresh={handleRefreshData} />}
              {activeTab === 'resume' && <ResumeSection user={user} />}
              {activeTab === 'password' && <PasswordSection />}
              {activeTab === 'tasks' && <Todo />}
              {activeTab === 'applications' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">My Applications</h2>
                  <div className="text-center py-12 text-gray-500">
                    <i className="fas fa-briefcase text-5xl mb-4"></i>
                    <p>You haven't applied to any jobs yet.</p>
                    <Link to="/jobs" className="mt-4 inline-block bg-primary-600 text-white px-4 py-2 rounded font-medium hover:bg-primary-700 transition-colors">
                      Browse Jobs
                    </Link>
                  </div>
                </div>
              )}
              {activeTab === 'saved' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Saved Jobs</h2>
                  <div className="text-center py-12 text-gray-500">
                    <i className="fas fa-bookmark text-5xl mb-4"></i>
                    <p>You haven't saved any jobs yet.</p>
                    <Link to="/jobs" className="mt-4 inline-block bg-primary-600 text-white px-4 py-2 rounded font-medium hover:bg-primary-700 transition-colors">
                      Browse Jobs
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 