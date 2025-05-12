import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, token, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    headline: '',
    location: '',
    bio: '',
    skills: [],
    linkedin: '',
    twitter: '',
    github: '',
    website: '',
    jobTypes: [],
    preferredLocations: [],
    expectedSalary: '',
    willingToRelocate: false
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        };

        const res = await axios.get('/api/profiles/me', config);
        setProfile(res.data);
        
        // Initialize form data with profile data
        const userData = res.data.user;
        const profileData = res.data;
        
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          headline: profileData.headline || '',
          location: profileData.location || '',
          bio: profileData.bio || '',
          skills: profileData.skills || [],
          linkedin: profileData.socialMedia?.linkedin || '',
          twitter: profileData.socialMedia?.twitter || '',
          github: profileData.socialMedia?.github || '',
          website: profileData.socialMedia?.website || '',
          jobTypes: profileData.jobPreferences?.jobTypes || [],
          preferredLocations: profileData.jobPreferences?.preferredLocations || [],
          expectedSalary: profileData.jobPreferences?.expectedSalary || '',
          willingToRelocate: profileData.jobPreferences?.willingToRelocate || false
        });
        
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (err.response && err.response.status === 404) {
          // No profile exists yet
          setProfile(null);
          setFormData({
            ...formData,
            name: currentUser.name || '',
            email: currentUser.email || ''
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate, currentUser]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData({
      ...formData,
      skills
    });
  };

  const handleJobTypesChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      option => option.value
    );
    setFormData({
      ...formData,
      jobTypes: selectedOptions
    });
  };

  const handlePreferredLocationsChange = (e) => {
    const locations = e.target.value.split(',').map(location => location.trim());
    setFormData({
      ...formData,
      preferredLocations: locations
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };

      // Update basic user info
      await axios.put('/api/profiles/account', {
        name: formData.name,
        email: formData.email
      }, config);

      // Update profile data
      const profileData = {
        headline: formData.headline,
        location: formData.location,
        bio: formData.bio,
        skills: formData.skills,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        github: formData.github,
        website: formData.website,
        jobTypes: formData.jobTypes,
        preferredLocations: formData.preferredLocations,
        expectedSalary: formData.expectedSalary,
        willingToRelocate: formData.willingToRelocate
      };

      const res = await axios.post('/api/profiles', profileData, config);
      setProfile(res.data);
      setIsEditing(false);
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
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Info
        </button>
        <button 
          className={`tab-button ${activeTab === 'professional' ? 'active' : ''}`}
          onClick={() => setActiveTab('professional')}
        >
          Professional
        </button>
        <button 
          className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          Job Preferences
        </button>
      </div>

      <div className="profile-content">
        {!isEditing ? (
          // Display Mode
          <>
            {activeTab === 'personal' && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>Personal Information</h2>
                  <button 
                    className="edit-button"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
                <div className="profile-info">
                  <div className="profile-avatar">
                    {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="profile-details">
                    <div className="profile-detail-item">
                      <span className="detail-label">Name:</span>
                      <span className="detail-value">{currentUser?.name || 'Not provided'}</span>
                    </div>
                    <div className="profile-detail-item">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{currentUser?.email}</span>
                    </div>
                    <div className="profile-detail-item">
                      <span className="detail-label">Account Type:</span>
                      <span className="detail-value">{currentUser?.userType || 'Job Seeker'}</span>
                    </div>
                    <div className="profile-detail-item">
                      <span className="detail-label">Headline:</span>
                      <span className="detail-value">{profile?.headline || 'Not provided'}</span>
                    </div>
                    <div className="profile-detail-item">
                      <span className="detail-label">Location:</span>
                      <span className="detail-value">{profile?.location || 'Not provided'}</span>
                    </div>
                    <div className="profile-detail-item">
                      <span className="detail-label">Bio:</span>
                      <span className="detail-value bio">{profile?.bio || 'No bio available'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'professional' && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>Professional Information</h2>
                  <button 
                    className="edit-button"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
                
                <div className="profile-subsection">
                  <h3>Skills</h3>
                  {profile?.skills && profile.skills.length > 0 ? (
                    <div className="skills-list">
                      {profile.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  ) : (
                    <p className="no-data">No skills added yet</p>
                  )}
                </div>
                
                <div className="profile-subsection">
                  <h3>Social Profiles</h3>
                  <div className="social-links">
                    {profile?.socialMedia?.linkedin && (
                      <a href={profile.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                        LinkedIn
                      </a>
                    )}
                    {profile?.socialMedia?.github && (
                      <a href={profile.socialMedia.github} target="_blank" rel="noopener noreferrer" className="social-link github">
                        GitHub
                      </a>
                    )}
                    {profile?.socialMedia?.twitter && (
                      <a href={profile.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                        Twitter
                      </a>
                    )}
                    {profile?.socialMedia?.website && (
                      <a href={profile.socialMedia.website} target="_blank" rel="noopener noreferrer" className="social-link website">
                        Personal Website
                      </a>
                    )}
                    {(!profile?.socialMedia?.linkedin && !profile?.socialMedia?.github && 
                      !profile?.socialMedia?.twitter && !profile?.socialMedia?.website) && (
                      <p className="no-data">No social profiles added yet</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>Job Preferences</h2>
                  <button 
                    className="edit-button"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
                
                <div className="profile-subsection">
                  <h3>Job Types</h3>
                  {profile?.jobPreferences?.jobTypes && profile.jobPreferences.jobTypes.length > 0 ? (
                    <div className="preferences-list">
                      {profile.jobPreferences.jobTypes.map((type, index) => (
                        <span key={index} className="preference-tag">{type}</span>
                      ))}
                    </div>
                  ) : (
                    <p className="no-data">No job types specified</p>
                  )}
                </div>
                
                <div className="profile-subsection">
                  <h3>Preferred Locations</h3>
                  {profile?.jobPreferences?.preferredLocations && profile.jobPreferences.preferredLocations.length > 0 ? (
                    <div className="preferences-list">
                      {profile.jobPreferences.preferredLocations.map((location, index) => (
                        <span key={index} className="preference-tag">{location}</span>
                      ))}
                    </div>
                  ) : (
                    <p className="no-data">No preferred locations specified</p>
                  )}
                </div>
                
                <div className="profile-subsection">
                  <h3>Expected Salary</h3>
                  <p>{profile?.jobPreferences?.expectedSalary || 'Not specified'}</p>
                </div>
                
                <div className="profile-subsection">
                  <h3>Willing to Relocate</h3>
                  <p>{profile?.jobPreferences?.willingToRelocate ? 'Yes' : 'No'}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          // Edit Mode
          <form onSubmit={handleSubmit} className="profile-form">
            {activeTab === 'personal' && (
              <>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="headline">Professional Headline</label>
                  <input
                    type="text"
                    id="headline"
                    name="headline"
                    value={formData.headline}
                    onChange={handleChange}
                    placeholder="e.g. Senior Web Developer"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. New York, NY"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us about yourself"
                  ></textarea>
                </div>
              </>
            )}

            {activeTab === 'professional' && (
              <>
                <div className="form-group">
                  <label htmlFor="skills">Skills (comma separated)</label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills.join(', ')}
                    onChange={handleSkillsChange}
                    placeholder="e.g. JavaScript, React, Node.js"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="linkedin">LinkedIn Profile</label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://www.linkedin.com/in/username"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="github">GitHub Profile</label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="twitter">Twitter Profile</label>
                  <input
                    type="url"
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="https://twitter.com/username"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="website">Personal Website</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </>
            )}

            {activeTab === 'preferences' && (
              <>
                <div className="form-group">
                  <label htmlFor="jobTypes">Job Types</label>
                  <select
                    id="jobTypes"
                    name="jobTypes"
                    multiple
                    value={formData.jobTypes}
                    onChange={handleJobTypesChange}
                    className="multiple-select"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                  <small>Hold Ctrl/Cmd to select multiple options</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="preferredLocations">Preferred Locations (comma separated)</label>
                  <input
                    type="text"
                    id="preferredLocations"
                    name="preferredLocations"
                    value={formData.preferredLocations.join(', ')}
                    onChange={handlePreferredLocationsChange}
                    placeholder="e.g. New York, Remote, London"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="expectedSalary">Expected Salary</label>
                  <input
                    type="text"
                    id="expectedSalary"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    placeholder="e.g. $80,000 - $100,000"
                  />
                </div>
                
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="willingToRelocate"
                      checked={formData.willingToRelocate}
                      onChange={handleChange}
                    />
                    Willing to Relocate
                  </label>
                </div>
              </>
            )}

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button type="submit" className="save-button">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 