import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminLoginPage.css';
import '../styles/AdminAccessCodes.css';

const AdminAccessCodesPage = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [accessCodes, setAccessCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    expiresAt: '',
    usageLimit: 1,
    adminRole: 'team_member',
    permissions: {
      manageUsers: false,
      manageJobs: true,
      manageInternships: true,
      manageAdminCodes: false,
      manageSettings: false,
      viewAnalytics: true
    }
  });
  const [formVisible, setFormVisible] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [showPermissions, setShowPermissions] = useState(false);

  // Check if user is admin
  useEffect(() => {
    if (!user || user.userType !== 'admin') {
      navigate('/admin/login');
    } else if (user.adminRole !== 'super_admin' && 
              (!user.adminPermissions || !user.adminPermissions.manageAdminCodes)) {
      // Redirect if not super admin and doesn't have admin code permissions
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  // Fetch access codes
  useEffect(() => {
    const fetchAccessCodes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const config = {
          headers: {
            'x-auth-token': token
          }
        };
        
        const response = await axios.get('/api/admin-access-codes', config);
        setAccessCodes(response.data);
      } catch (err) {
        console.error('Error fetching access codes:', err);
        setError('Failed to load access codes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user && user.userType === 'admin' && token) {
      fetchAccessCodes();
    }
  }, [user, token]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Show permissions options when role changes to super_admin
    if (e.target.name === 'adminRole' && e.target.value === 'super_admin') {
      setShowPermissions(true);
    }
  };

  const handlePermissionChange = (e) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [e.target.name]: e.target.checked
      }
    });
  };

  const handleCreateCode = async (e) => {
    e.preventDefault();
    
    try {
      setFormError(null);
      
      // Validate form
      if (!formData.code || !formData.description || !formData.expiresAt) {
        setFormError('Please fill in all required fields');
        return;
      }
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      
      // Make a copy of form data for submission
      const submitData = { ...formData };
      
      // Set default permissions based on admin role if not shown
      if (formData.adminRole === 'super_admin' && !showPermissions) {
        submitData.permissions = {
          manageUsers: true,
          manageJobs: true,
          manageInternships: true,
          manageAdminCodes: true,
          manageSettings: true,
          viewAnalytics: true
        };
      } else if (formData.adminRole === 'team_member' && !showPermissions) {
        submitData.permissions = {
          manageUsers: false,
          manageJobs: true,
          manageInternships: true,
          manageAdminCodes: false,
          manageSettings: false,
          viewAnalytics: true
        };
      }
      
      await axios.post('/api/admin-access-codes', submitData, config);
      
      // Clear form and show success message
      setFormData({
        code: '',
        description: '',
        expiresAt: '',
        usageLimit: 1,
        adminRole: 'team_member',
        permissions: {
          manageUsers: false,
          manageJobs: true,
          manageInternships: true,
          manageAdminCodes: false,
          manageSettings: false,
          viewAnalytics: true
        }
      });
      
      setShowPermissions(false);
      setFormSuccess('Access code created successfully!');
      
      // Fetch updated list of access codes
      const response = await axios.get('/api/admin-access-codes', {
        headers: { 'x-auth-token': token }
      });
      setAccessCodes(response.data);
      
      // Hide the form after a few seconds
      setTimeout(() => {
        setFormVisible(false);
        setFormSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Error creating access code:', err);
      setFormError(err.response?.data?.errors?.[0]?.msg || 'Failed to create access code');
    }
  };

  const handleDeactivateCode = async (id) => {
    try {
      await axios.put(`/api/admin-access-codes/${id}`, 
        { isActive: false },
        { headers: { 'x-auth-token': token } }
      );
      
      // Update the local state to reflect the change
      setAccessCodes(accessCodes.map(code => 
        code._id === id ? { ...code, isActive: false } : code
      ));
    } catch (err) {
      console.error('Error deactivating code:', err);
      setError('Failed to deactivate code');
    }
  };

  // Get today's date in ISO format to use as min date in datepicker
  const today = new Date().toISOString().split('T')[0];

  // Check if current user is super_admin
  const isSuperAdmin = user && user.adminRole === 'super_admin';

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Manage Admin Access Codes</h1>
        <p>Create and manage access codes for admin registration</p>
        
        <button
          className="create-button"
          onClick={() => setFormVisible(!formVisible)}
        >
          {formVisible ? 'Cancel' : 'Create New Access Code'}
        </button>
      </div>

      {formVisible && (
        <div className="admin-form-container">
          <h2>Create Access Code</h2>
          {formError && <div className="admin-login-error">{formError}</div>}
          {formSuccess && <div className="admin-login-success">{formSuccess}</div>}
          
          <form onSubmit={handleCreateCode} className="admin-form">
            <div className="form-group">
              <label>Access Code:</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="e.g., ADMIN1234"
                required
              />
              <small>This is the code admins will enter during registration</small>
            </div>
            
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="e.g., For HR department"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Expires At:</label>
              <input
                type="date"
                name="expiresAt"
                value={formData.expiresAt}
                onChange={handleInputChange}
                min={today}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Usage Limit:</label>
              <input
                type="number"
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleInputChange}
                min="1"
                max="100"
                required
              />
              <small>How many times this code can be used for registration</small>
            </div>
            
            {isSuperAdmin && (
              <div className="form-group">
                <label>Admin Role:</label>
                <select
                  name="adminRole"
                  value={formData.adminRole}
                  onChange={handleInputChange}
                  className="admin-select"
                >
                  <option value="team_member">Team Member (Limited Access)</option>
                  <option value="super_admin">Super Admin (Full Access)</option>
                </select>
                <small>
                  <span 
                    className="toggle-permissions"
                    onClick={() => setShowPermissions(!showPermissions)}
                  >
                    {showPermissions ? 'Hide' : 'Show'} custom permissions
                  </span>
                </small>
              </div>
            )}
            
            {(showPermissions || !isSuperAdmin) && (
              <div className="permissions-container">
                <h3>Access Permissions</h3>
                <div className="permissions-grid">
                  <div className="permission-item">
                    <input
                      type="checkbox"
                      id="manageUsers"
                      name="manageUsers"
                      checked={formData.permissions.manageUsers}
                      onChange={handlePermissionChange}
                      disabled={!isSuperAdmin}
                    />
                    <label htmlFor="manageUsers">Manage Users</label>
                  </div>
                  
                  <div className="permission-item">
                    <input
                      type="checkbox"
                      id="manageJobs"
                      name="manageJobs"
                      checked={formData.permissions.manageJobs}
                      onChange={handlePermissionChange}
                    />
                    <label htmlFor="manageJobs">Manage Jobs</label>
                  </div>
                  
                  <div className="permission-item">
                    <input
                      type="checkbox"
                      id="manageInternships"
                      name="manageInternships"
                      checked={formData.permissions.manageInternships}
                      onChange={handlePermissionChange}
                    />
                    <label htmlFor="manageInternships">Manage Internships</label>
                  </div>
                  
                  <div className="permission-item">
                    <input
                      type="checkbox"
                      id="manageAdminCodes"
                      name="manageAdminCodes"
                      checked={formData.permissions.manageAdminCodes}
                      onChange={handlePermissionChange}
                      disabled={!isSuperAdmin}
                    />
                    <label htmlFor="manageAdminCodes">Manage Admin Codes</label>
                  </div>
                  
                  <div className="permission-item">
                    <input
                      type="checkbox"
                      id="manageSettings"
                      name="manageSettings"
                      checked={formData.permissions.manageSettings}
                      onChange={handlePermissionChange}
                      disabled={!isSuperAdmin}
                    />
                    <label htmlFor="manageSettings">Manage Settings</label>
                  </div>
                  
                  <div className="permission-item">
                    <input
                      type="checkbox"
                      id="viewAnalytics"
                      name="viewAnalytics"
                      checked={formData.permissions.viewAnalytics}
                      onChange={handlePermissionChange}
                    />
                    <label htmlFor="viewAnalytics">View Analytics</label>
                  </div>
                </div>
              </div>
            )}
            
            <button type="submit" className="submit-button">Create Access Code</button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading access codes...</div>
      ) : error ? (
        <div className="admin-login-error">{error}</div>
      ) : accessCodes.length === 0 ? (
        <div className="no-data">No access codes found. Create your first one.</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Description</th>
                <th>Role</th>
                <th>Status</th>
                <th>Usage</th>
                <th>Expires</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accessCodes.map(code => (
                <tr key={code._id} className={!code.isActive ? 'inactive-row' : ''}>
                  <td>{code.code}</td>
                  <td>{code.description}</td>
                  <td>
                    <span className={`role-badge ${code.adminRole}`}>
                      {code.adminRole === 'super_admin' ? 'Super Admin' : 'Team Member'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${code.isActive ? 'active' : 'inactive'}`}>
                      {code.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    {code.usageCount} / {code.usageLimit}
                    {code.usageCount >= code.usageLimit && 
                      <span className="limit-reached"> (Limit reached)</span>
                    }
                  </td>
                  <td>
                    {new Date(code.expiresAt).toLocaleDateString()}
                    {new Date(code.expiresAt) < new Date() && 
                      <span className="expired"> (Expired)</span>
                    }
                  </td>
                  <td>
                    {code.isActive && (isSuperAdmin || 
                      (code.adminRole !== 'super_admin' && user.adminPermissions?.manageAdminCodes)) && (
                      <button 
                        className="deactivate-button"
                        onClick={() => handleDeactivateCode(code._id)}
                      >
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAccessCodesPage; 