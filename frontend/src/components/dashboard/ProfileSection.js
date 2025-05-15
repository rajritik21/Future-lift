import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileSection = ({ user, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    headline: '',
    bio: '',
    profilePhoto: null,
    linkedin: '',
    github: '',
    twitter: '',
    website: '',
    dob: ''
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch user data and profile
  useEffect(() => {
    const fetchUserData = async () => {
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
        
        // First, get the latest user data
        const userRes = await axios.get('/api/auth', config);
        const userData = userRes.data;
        
        // Format date for input field if exists
        let formattedDob = '';
        if (userData.dob) {
          const dobDate = new Date(userData.dob);
          formattedDob = dobDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        }
        
        console.log('User data fetched:', userData);
        console.log('Formatted DOB:', formattedDob);

        // Then try to get profile data
        try {
          const profileRes = await axios.get('/api/profiles/me', config);
          setProfile(profileRes.data);
          
          // Set form data with all available information, prioritizing fresh user data
          setFormData({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.mobile || profileRes.data.phone || '',
            location: profileRes.data.location || '',
            headline: profileRes.data.headline || '',
            bio: profileRes.data.bio || '',
            profilePhoto: null,
            linkedin: profileRes.data.socialMedia?.linkedin || '',
            github: profileRes.data.socialMedia?.github || '',
            twitter: profileRes.data.socialMedia?.twitter || '',
            website: profileRes.data.socialMedia?.website || '',
            dob: formattedDob
          });
          
          // Set avatar preview if available
          if (userData.avatar && userData.avatar.url) {
            setPreviewUrl(userData.avatar.url);
          } else if (profileRes.data.profilePhoto) {
            setPreviewUrl(profileRes.data.profilePhoto);
          }
        } catch (profileErr) {
          // If no profile exists yet, just use the user data
          console.log('No profile found, using basic user data');
          
          setFormData({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.mobile || '',
            location: '',
            headline: '',
            bio: '',
            profilePhoto: null,
            linkedin: '',
            github: '',
            twitter: '',
            website: '',
            dob: formattedDob
          });
          
          // Set avatar preview if available in user data
          if (userData.avatar && userData.avatar.url) {
            setPreviewUrl(userData.avatar.url);
          }
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        // If API call fails, try to use data from local storage
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Format date for input field if exists in local storage
        let formattedDob = '';
        if (storedUser.dob) {
          try {
            const dobDate = new Date(storedUser.dob);
            formattedDob = dobDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
          } catch (error) {
            console.error('Error formatting date from local storage:', error);
          }
        }
        
        setFormData({
          ...formData,
          name: storedUser.name || '',
          email: storedUser.email || '',
          phone: storedUser.mobile || '',
          dob: formattedDob
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, refreshData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setMessage({ 
          type: 'error', 
          text: 'Authentication token not found. Please login again.' 
        });
        return;
      }
      
      console.log('Form data being submitted:', formData);
      
      // First, update basic user info (name, email, mobile, dob)
      const basicUserConfig = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      
      const response = await axios.put('/api/profiles/account', {
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        dob: formData.dob // Send as YYYY-MM-DD
      }, basicUserConfig);
      
      console.log('User update response:', response.data);

      // Update the local context and storage with updated user info
      const userRes = await axios.get('/api/auth', basicUserConfig);
      const updatedUser = userRes.data;
      
      console.log('Updated user data:', updatedUser);
      
      // Update local storage with updated user data
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        userData.name = formData.name;
        userData.email = formData.email;
        userData.mobile = formData.phone;
        userData.dob = formData.dob; // Store as YYYY-MM-DD
        if (updatedUser.avatar) {
          userData.avatar = updatedUser.avatar.url;
        }
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      // Then update extended profile information
      const formDataToSend = new FormData();
      
      // Add profile fields
      formDataToSend.append('location', formData.location);
      formDataToSend.append('headline', formData.headline);
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('skills', 'Communication, Teamwork'); // Default skills if not provided
      
      // Add social media links
      if (formData.linkedin) formDataToSend.append('linkedin', formData.linkedin);
      if (formData.github) formDataToSend.append('github', formData.github);
      if (formData.twitter) formDataToSend.append('twitter', formData.twitter);
      if (formData.website) formDataToSend.append('website', formData.website);
      
      // Add photo if selected
      if (formData.profilePhoto) {
        formDataToSend.append('profilePhoto', formData.profilePhoto);
      }
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token
        }
      };
      
      // Update profile
      const res = await axios.post('/api/profiles', formDataToSend, config);
      setProfile(res.data);
      
      // Trigger a refresh of the data locally
      setRefreshData(prev => !prev);
      
      // Notify parent component to refresh user data
      if (onRefresh) {
        onRefresh();
      }
      
      setMessage({ 
        type: 'success', 
        text: 'Profile updated successfully!' 
      });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
      
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.msg || 'Failed to update profile' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">My Profile</h2>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mr-6 mb-4 md:mb-0">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border border-gray-300">
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <i className="fas fa-user text-4xl"></i>
                    </div>
                  )}
                </div>
                <label htmlFor="profilePhoto" className="absolute bottom-0 right-0 bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-primary-700">
                  <i className="fas fa-camera"></i>
                  <input 
                    type="file" 
                    id="profilePhoto" 
                    name="profilePhoto" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handlePhotoChange}
                  />
                </label>
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">Click the camera icon to upload a photo</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="1234567890"
              className="w-full p-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State, Country"
              className="w-full p-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
              required
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
            />
            <p className="text-xs text-gray-500 mt-1">Must be at least 18 years old</p>
          </div>

          {/* Professional Headline */}
          <div>
            <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-1">
              Professional Headline
            </label>
            <input
              type="text"
              id="headline"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              placeholder="e.g., Senior Software Engineer at TechCorp"
              className="w-full p-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Bio/About Me */}
        <div className="mb-6">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Bio / About Me
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            placeholder="Tell employers about yourself, your experience, and career goals"
            className="w-full p-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
          ></textarea>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mb-4">Social Media Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* LinkedIn */}
          <div className="flex items-center">
            <div className="w-10 text-primary-600 flex-shrink-0">
              <i className="fab fa-linkedin text-xl"></i>
            </div>
            <div className="flex-grow">
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full p-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* GitHub */}
          <div className="flex items-center">
            <div className="w-10 text-gray-700 flex-shrink-0">
              <i className="fab fa-github text-xl"></i>
            </div>
            <div className="flex-grow">
              <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
                GitHub
              </label>
              <input
                type="url"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/yourusername"
                className="w-full p-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Twitter */}
          <div className="flex items-center">
            <div className="w-10 text-blue-400 flex-shrink-0">
              <i className="fab fa-twitter text-xl"></i>
            </div>
            <div className="flex-grow">
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                Twitter
              </label>
              <input
                type="url"
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/yourusername"
                className="w-full p-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Personal Website */}
          <div className="flex items-center">
            <div className="w-10 text-gray-600 flex-shrink-0">
              <i className="fas fa-globe text-xl"></i>
            </div>
            <div className="flex-grow">
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Personal Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
                className="w-full p-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 mr-2 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSection; 