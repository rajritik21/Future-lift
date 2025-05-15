import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AccountSettingsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }
        
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        };
        
        const userRes = await axios.get('/api/auth', config);
        setUser(userRes.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setMessage({
          type: 'error',
          text: 'Failed to load user data. Please try again.'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Passwords do not match.'
      });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 6 characters long.'
      });
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      
      await axios.put('/api/auth/password', {
        newPassword: passwordData.newPassword
      }, config);
      
      setMessage({
        type: 'success',
        text: 'Password updated successfully!'
      });
      
      // Clear form
      setPasswordData({
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error('Error updating password:', err);
      setMessage({
        type: 'error',
        text: err.response?.data?.msg || 'Failed to update password. Please try again.'
      });
    }
  };

  const handleEnableMFA = async () => {
    try {
      setMessage({
        type: 'info',
        text: 'Multi-factor authentication setup coming soon. This feature is under development.'
      });
    } catch (err) {
      console.error('Error enabling MFA:', err);
      setMessage({
        type: 'error',
        text: 'Failed to enable MFA. Please try again.'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">Account</h1>
            <p className="mt-1 text-sm text-gray-600">
              Edit your account settings and change your password here.
            </p>
          </div>
          
          {/* Email section */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg font-medium text-gray-900 mb-1">Email:</h2>
                <div className="text-gray-800">
                  Your email address is <span className="font-semibold">{user?.email}</span>
                </div>
              </div>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-colors duration-150 ease-in-out">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Password section */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">New password</h2>
            <form onSubmit={handleSubmitPasswordChange}>
              <div className="space-y-4">
                <div>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Re-type new password"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    Change password
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          {/* Multi-factor Authentication section */}
          <div className="px-4 py-5 sm:px-6">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Multi-factor Authentication</h2>
              <p className="text-gray-600 text-sm mb-4">
                Increase your account security by requiring that a code emailed to you be
                entered when you log in. For more information on how multi-factor
                authentication works, refer to our <a href="/help" className="text-indigo-600 hover:text-indigo-800">Help Center article</a>.
              </p>
              <button
                onClick={handleEnableMFA}
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Enable
              </button>
            </div>
          </div>
          
          {/* Status messages */}
          {message.text && (
            <div className={`mx-4 my-4 p-3 rounded-md ${
              message.type === 'error' ? 'bg-red-50 text-red-700' : 
              message.type === 'success' ? 'bg-green-50 text-green-700' :
              'bg-blue-50 text-blue-700'
            }`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage; 