import React, { useState } from 'react';
import axios from 'axios';

const PasswordSection = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Check password strength if it's the new password field
    if (name === 'newPassword') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    // Simple password strength checker
    let score = 0;
    let feedback = '';

    if (password.length === 0) {
      setPasswordStrength({ score: 0, feedback: '' });
      return;
    }

    // Length check
    if (password.length < 8) {
      feedback = 'Password is too short';
    } else {
      score += 1;
    }

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // Set feedback based on score
    if (score === 1) feedback = 'Password is weak';
    if (score === 2) feedback = 'Password is fair';
    if (score === 3) feedback = 'Password is good';
    if (score === 4) feedback = 'Password is strong';
    if (score === 5) feedback = 'Password is very strong';

    setPasswordStrength({ score, feedback });
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength.score) {
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-orange-500';
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-green-500';
      case 5:
        return 'bg-green-600';
      default:
        return 'bg-gray-300';
    }
  };

  const validateForm = () => {
    // Check if new password and confirm password match
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ 
        type: 'error', 
        text: 'New password and confirmation do not match' 
      });
      return false;
    }

    // Check if new password is strong enough
    if (passwordStrength.score < 3) {
      setMessage({ 
        type: 'error', 
        text: 'Please create a stronger password' 
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        return;
      }
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      
      await axios.post(
        '/api/auth/change-password',
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        },
        config
      );
      
      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setPasswordStrength({ score: 0, feedback: '' });
      
      setMessage({ 
        type: 'success', 
        text: 'Password updated successfully!' 
      });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
      
    } catch (err) {
      console.error('Error changing password:', err);
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.msg || 'Failed to change password. Please check your current password and try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Change Password</h2>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          
          {formData.newPassword && (
            <>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${getPasswordStrengthColor()} h-2 rounded-full transition-all duration-300`} 
                  style={{ width: `${passwordStrength.score * 20}%` }}
                ></div>
              </div>
              <p className={`mt-1 text-sm ${
                passwordStrength.score >= 4 ? 'text-green-600' : 
                passwordStrength.score >= 3 ? 'text-yellow-600' : 
                'text-red-600'
              }`}>
                {passwordStrength.feedback}
              </p>
              <ul className="mt-2 text-xs text-gray-600 space-y-1">
                <li className="flex items-start">
                  <i className={`fas fa-${formData.newPassword.length >= 8 ? 'check text-green-500' : 'times text-red-500'} mt-0.5 mr-1`}></i>
                  At least 8 characters
                </li>
                <li className="flex items-start">
                  <i className={`fas fa-${/[A-Z]/.test(formData.newPassword) ? 'check text-green-500' : 'times text-red-500'} mt-0.5 mr-1`}></i>
                  At least one uppercase letter
                </li>
                <li className="flex items-start">
                  <i className={`fas fa-${/[a-z]/.test(formData.newPassword) ? 'check text-green-500' : 'times text-red-500'} mt-0.5 mr-1`}></i>
                  At least one lowercase letter
                </li>
                <li className="flex items-start">
                  <i className={`fas fa-${/[0-9]/.test(formData.newPassword) ? 'check text-green-500' : 'times text-red-500'} mt-0.5 mr-1`}></i>
                  At least one number
                </li>
                <li className="flex items-start">
                  <i className={`fas fa-${/[^A-Za-z0-9]/.test(formData.newPassword) ? 'check text-green-500' : 'times text-red-500'} mt-0.5 mr-1`}></i>
                  At least one special character
                </li>
              </ul>
            </>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
              formData.confirmPassword && formData.newPassword !== formData.confirmPassword 
                ? 'border-red-500' 
                : 'border-gray-300'
            }`}
          />
          
          {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              Passwords do not match
            </p>
          )}
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </>
            ) : (
              'Update Password'
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-exclamation-triangle text-yellow-400"></i>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Password Security Tips</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Use a unique password for each account</li>
                  <li>Avoid using personal information in your password</li>
                  <li>Consider using a password manager to generate and store strong passwords</li>
                  <li>Change your password periodically, especially if you suspect it may have been compromised</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordSection; 