import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: 'admin',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const adminUsers = storedUsers.filter(user => user.userType === 'admin');
      setUsers(adminUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (isEditing) {
      // Update user
      try {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = storedUsers.map(user => 
          user.id === currentUser.id 
            ? { 
                ...user, 
                name: formData.name, 
                email: formData.email,
                ...(formData.password ? { password: formData.password } : {})
              } 
            : user
        );
        
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // If the current logged in user is updated, update their details in localStorage
        const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (loggedInUser.id === currentUser.id) {
          localStorage.setItem('user', JSON.stringify({
            ...loggedInUser,
            name: formData.name,
            email: formData.email
          }));
        }
        
        fetchUsers();
        resetForm();
      } catch (error) {
        console.error('Error updating user:', error);
        alert('Failed to update user');
      }
    } else {
      // Add new user
      try {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email already exists
        if (storedUsers.some(user => user.email.toLowerCase() === formData.email.toLowerCase())) {
          alert('A user with this email already exists');
          return;
        }
        
        const newUser = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          userType: 'admin',
          password: formData.password,
          date: new Date().toISOString()
        };
        
        localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
        fetchUsers();
        resetForm();
      } catch (error) {
        console.error('Error adding user:', error);
        alert('Failed to add user');
      }
    }
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = storedUsers.filter(user => user.id !== userId);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      userType: 'admin',
      password: '',
      confirmPassword: ''
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      userType: 'admin',
      password: '',
      confirmPassword: ''
    });
    setCurrentUser(null);
    setIsEditing(false);
    setShowForm(false);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin User Management</h1>
        <p className="text-gray-600 mb-6">
          Manage admin users who have access to the dashboard.
        </p>
        
        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className={`px-4 py-2 rounded-md ${
              showForm
                ? 'bg-gray-500 hover:bg-gray-600'
                : 'bg-primary-600 hover:bg-primary-700'
            } text-white transition-colors duration-300`}
          >
            {showForm ? 'Cancel' : 'Add New Admin'}
          </button>
        </div>
        
        {/* Form */}
        {showForm && (
          <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Admin User' : 'Add New Admin User'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password {isEditing && '(Leave blank to keep current)'}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    {...(isEditing ? {} : { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    {...(isEditing ? {} : { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-300"
                >
                  {isEditing ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Users Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Created
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No admin users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff`}
                            alt={user.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement; 