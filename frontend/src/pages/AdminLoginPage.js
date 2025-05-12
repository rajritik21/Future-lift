import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/AdminLoginPage.css';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if there's a redirect with registration data
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const registeredEmail = params.get('email');
    if (registeredEmail) {
      setFormData(prevState => ({
        ...prevState,
        email: registeredEmail
      }));
    }
    
    // Check for temporary registered admin in localStorage
    const tempAdmin = localStorage.getItem('tempRegisteredAdmin');
    if (tempAdmin) {
      try {
        const adminData = JSON.parse(tempAdmin);
        setFormData(prevState => ({
          ...prevState,
          email: adminData.email || prevState.email
        }));
      } catch (err) {
        console.error('Error parsing temp admin data:', err);
      }
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Attempting admin login with:', formData.email);
      const response = await axios.post('/api/auth/admin/login', formData);
      
      console.log('Login successful, storing auth data');
      login(response.data.token, response.data.user);
      
      // Clear temp registration data if it exists
      localStorage.removeItem('tempRegisteredAdmin');
      
      // Navigate to dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error details:', err);
      
      // Handle different error types
      let errorMessage = 'Login failed';
      
      if (err.response) {
        // The request was made and the server responded with a status code
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        
        if (err.response.data?.errors && err.response.data.errors.length > 0) {
          errorMessage = err.response.data.errors[0].msg;
        } else if (err.response.data?.msg) {
          errorMessage = err.response.data.msg;
        } else if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        }
        
        // Special case for 403 forbidden (not an admin)
        if (err.response.status === 403) {
          errorMessage = 'This account does not have admin privileges';
        }
      } else if (err.request) {
        // The request was made but no response was received
        errorMessage = 'Server not responding. Please try again later.';
      } else {
        // Something happened in setting up the request
        errorMessage = err.message || 'Unknown error occurred';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-row">
        <div className="admin-login-col">
          <div className="admin-login-card">
            <form onSubmit={handleSubmit} className="admin-login-box">
              <div className="admin-login-header">
                <h1>Admin Portal</h1>
                <div className="admin-login-subtitle">Welcome back! Please sign in to continue</div>
              </div>
              
              {error && <div className="admin-login-error">{error}</div>}
              
              <div className="input-group">
                <span className="input-icon">
                  <i className="fas fa-envelope"></i>
                </span>
                <input 
                  type="text" 
                  name="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="input-group">
                <span className="input-icon">
                  <i className="fas fa-lock"></i>
                </span>
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password" 
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span className="password-toggle" onClick={togglePasswordVisibility}>
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>
              
              <a className="forgot text-muted" href="#/reset-password">Forgot password?</a>
              
              <input 
                type="submit" 
                value={isLoading ? "Logging in..." : "Login"} 
                disabled={isLoading}
              />
              
              <p className="text-muted login-link">
                Don't have an account? <Link to="/admin/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage; 