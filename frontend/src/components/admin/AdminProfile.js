import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
    avatar: '',
    phone: '',
    department: 'Management',
    joinDate: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/admin/login');
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      if (userData.userType !== 'admin') {
        navigate('/');
        return;
      }

      // In a real app, you would fetch complete profile data from API
      // Here we'll use localStorage or default values
      const adminProfile = localStorage.getItem('adminProfile');
      let profileData = {};
      
      if (adminProfile) {
        profileData = JSON.parse(adminProfile);
      } else {
        // Default profile data
        profileData = {
          bio: 'Admin user with access to all system functionalities.',
          avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userData.name) + '&background=0D8ABC&color=fff',
          phone: '',
          department: 'Management',
          joinDate: new Date().toISOString().split('T')[0],
          role: 'System Administrator'
        };
      }

      setUser({
        ...userData,
        ...profileData
      });

      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        role: profileData.role || 'System Administrator',
        bio: profileData.bio || '',
        avatar: profileData.avatar || '',
        phone: profileData.phone || '',
        department: profileData.department || 'Management',
        joinDate: profileData.joinDate || new Date().toISOString().split('T')[0]
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading profile:', error);
      setErrorMessage('Failed to load profile data');
      setLoading(false);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, you would send this data to your API
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        bio: formData.bio,
        avatar: formData.avatar,
        phone: formData.phone,
        department: formData.department,
        joinDate: formData.joinDate
      };
      
      // Update localStorage
      localStorage.setItem('adminProfile', JSON.stringify({
        bio: formData.bio,
        avatar: formData.avatar,
        phone: formData.phone,
        department: formData.department,
        joinDate: formData.joinDate,
        role: formData.role
      }));
      
      // Update user basic info
      const basicUserInfo = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user', JSON.stringify({
        ...basicUserInfo,
        name: formData.name,
        email: formData.email
      }));
      
      setUser(updatedUser);
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile');
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary-700 text-white px-6 py-4">
            <h1 className="text-2xl font-bold">Admin Profile</h1>
            <p className="text-primary-100">Manage your account information</p>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {successMessage && (
              <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{successMessage}</span>
              </div>
            )}
            
            {errorMessage && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{errorMessage}</span>
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Role</label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Department</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="Management">Management</option>
                        <option value="Technical">Technical</option>
                        <option value="Support">Support</option>
                        <option value="Operations">Operations</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Join Date</label>
                      <input
                        type="date"
                        name="joinDate"
                        value={formData.joinDate}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
                      <input
                        type="text"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff`}
                      alt={user.name}
                      className="w-40 h-40 rounded-full shadow-lg object-cover"
                    />
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      Edit Profile
                    </button>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Name</h3>
                        <p className="text-lg font-semibold">{user.name}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                        <p className="text-lg">{user.email}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Role</h3>
                        <p className="text-lg">{user.role}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Department</h3>
                        <p className="text-lg">{user.department}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                        <p className="text-lg">{user.phone || 'Not specified'}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Join Date</h3>
                        <p className="text-lg">{new Date(user.joinDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                      <p className="text-base mt-2">{user.bio}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-4">Admin Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => navigate('/admin/dashboard')}
                      className="flex items-center justify-center bg-indigo-100 text-indigo-700 px-4 py-3 rounded-md shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Dashboard
                    </button>
                    
                    <button
                      onClick={() => navigate('/admin/users')}
                      className="flex items-center justify-center bg-green-100 text-green-700 px-4 py-3 rounded-md shadow-sm hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Manage Users
                    </button>
                    
                    <button
                      onClick={() => navigate('/admin/settings')}
                      className="flex items-center justify-center bg-purple-100 text-purple-700 px-4 py-3 rounded-md shadow-sm hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile; 