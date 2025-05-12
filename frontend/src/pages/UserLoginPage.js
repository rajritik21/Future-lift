import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/UserLoginPage.css';

// Font Awesome icons
import '@fortawesome/fontawesome-free/css/all.min.css';

const UserLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form validation errors
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    dob: ''
  });
  
  // Login form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  // Signup form data
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    dob: ''
  });

  // Check for signup parameter in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const showSignup = params.get('signup') === 'true';
    if (showSignup) {
      setIsSignup(true);
    }
  }, [location]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  // Validate name (at least 3 characters, no special characters)
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (name.length < 3) {
      return "Name must be at least 3 characters long";
    } else if (!nameRegex.test(name)) {
      return "Name can only contain letters and spaces";
    }
    return "";
  };

  // Validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  // Validate password (at least 6 characters)
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return "";
  };

  // Validate mobile (10 digit number)
  const validateMobile = (mobile) => {
    if (mobile === "") return ""; // Mobile is optional
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      return "Mobile number must be 10 digits";
    }
    return "";
  };

  // Validate date of birth (age between 18 and 60)
  const validateDob = (dob) => {
    if (!dob) return "Date of birth is required";
    
    const birthDate = new Date(dob);
    const today = new Date();
    
    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // If birth month is after current month or same month but birth day is after today, subtract 1 from age
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 18) {
      return "You must be at least 18 years old";
    } else if (age > 60) {
      return "You must be under 60 years old";
    }
    
    return "";
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });

    // Real-time validation based on field name
    switch (name) {
      case 'name':
        setValidationErrors({
          ...validationErrors,
          name: validateName(value)
        });
        break;
      case 'email':
        setValidationErrors({
          ...validationErrors,
          email: validateEmail(value)
        });
        break;
      case 'password':
        setValidationErrors({
          ...validationErrors,
          password: validatePassword(value)
        });
        break;
      case 'mobile':
        setValidationErrors({
          ...validationErrors,
          mobile: validateMobile(value)
        });
        break;
      case 'dob':
        setValidationErrors({
          ...validationErrors,
          dob: validateDob(value)
        });
        break;
      default:
        break;
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await axios.post('/api/auth/login', loginData);
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.errors?.[0]?.msg || 'Invalid credentials');
    }
  };

  const validateSignupForm = () => {
    const nameError = validateName(signupData.name);
    const emailError = validateEmail(signupData.email);
    const passwordError = validatePassword(signupData.password);
    const mobileError = validateMobile(signupData.mobile);
    const dobError = validateDob(signupData.dob);
    
    setValidationErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      mobile: mobileError,
      dob: dobError
    });
    
    return !(nameError || emailError || passwordError || mobileError || dobError);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    if (!validateSignupForm()) {
      setError("Please fix the validation errors");
      return;
    }
    
    try {
      setError(null);
      const userData = {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        mobile: signupData.mobile || undefined,  // Only send if provided
        dob: signupData.dob,
        userType: 'jobseeker' // Default to jobseeker
      };
      
      await axios.post('/api/auth/register', userData);
      setSuccess('Registration successful! Please login.');
      setTimeout(() => {
        setIsSignup(false);
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.errors?.[0]?.msg || 'Registration failed. Please try again.');
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  // Calculate max and min dates for DOB input
  const getMaxDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return formatDate(today);
  };

  const getMinDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 60);
    return formatDate(today);
  };

  return (
    <div className="user-login-container">
      <div className="user-login-row">
        <div className="user-login-col">
          <div className="user-login-card">
            {isSignup ? (
              <form onSubmit={handleSignupSubmit} className="user-login-box">
                <div className="user-login-header">
                  <h1>Sign Up</h1>
                  <div className="user-login-subtitle">Create your account to get started</div>
                </div>
                
                <div className="login-signup-toggle">
                  <button 
                    type="button" 
                    className="toggle-btn" 
                    onClick={() => setIsSignup(false)}
                  >
                    Sign In
                  </button>
                  <button 
                    type="button" 
                    className="toggle-btn active"
                  >
                    Sign Up
                  </button>
                </div>
                
                {error && <div className="user-login-error">{error}</div>}
                {success && <div className="user-login-success">{success}</div>}
                
                <div className="input-group">
                  <span className="input-icon">
                    <i className="fas fa-user"></i>
                  </span>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name" 
                    value={signupData.name}
                    onChange={handleSignupChange}
                    className={validationErrors.name ? "invalid-input" : ""}
                    required
                  />
                  {validationErrors.name && <div className="validation-error">{validationErrors.name}</div>}
                </div>
                
                <div className="input-group">
                  <span className="input-icon">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={signupData.email}
                    onChange={handleSignupChange}
                    className={validationErrors.email ? "invalid-input" : ""}
                    required
                  />
                  {validationErrors.email && <div className="validation-error">{validationErrors.email}</div>}
                </div>

                <div className="input-group">
                  <span className="input-icon">
                    <i className="fas fa-mobile-alt"></i>
                  </span>
                  <input 
                    type="text" 
                    name="mobile" 
                    placeholder="Mobile Number (Optional)" 
                    value={signupData.mobile}
                    onChange={handleSignupChange}
                    className={validationErrors.mobile ? "invalid-input" : ""}
                  />
                  {validationErrors.mobile && <div className="validation-error">{validationErrors.mobile}</div>}
                </div>

                <div className="input-group">
                  <span className="input-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </span>
                  <input 
                    type="date" 
                    name="dob" 
                    placeholder="Date of Birth" 
                    value={signupData.dob}
                    onChange={handleSignupChange}
                    min={getMinDate()}
                    max={getMaxDate()}
                    className={validationErrors.dob ? "invalid-input" : ""}
                    required
                  />
                  {validationErrors.dob && <div className="validation-error">{validationErrors.dob}</div>}
                </div>
                
                <div className="input-group">
                  <span className="input-icon">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="password" 
                    placeholder="Password" 
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className={validationErrors.password ? "invalid-input" : ""}
                    required
                  />
                  <span className="password-toggle" onClick={togglePasswordVisibility}>
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </span>
                  {validationErrors.password && <div className="validation-error">{validationErrors.password}</div>}
                </div>
                
                <input type="submit" value="Sign Up" />
                
                <p className="text-muted signup-link">
                  Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsSignup(false); }}>Sign In</a>
                </p>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit} className="user-login-box">
                <div className="user-login-header">
                  <h1>Sign In</h1>
                  <div className="user-login-subtitle">Welcome back! Please sign in to continue</div>
                </div>
                
                <div className="login-signup-toggle">
                  <button 
                    type="button" 
                    className="toggle-btn active"
                  >
                    Sign In
                  </button>
                  <button 
                    type="button" 
                    className="toggle-btn" 
                    onClick={() => setIsSignup(true)}
                  >
                    Sign Up
                  </button>
                </div>
                
                {error && <div className="user-login-error">{error}</div>}
                
                <div className="input-group">
                  <span className="input-icon">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input 
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    value={loginData.email}
                    onChange={handleLoginChange}
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
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                  <span className="password-toggle" onClick={togglePasswordVisibility}>
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </span>
                </div>
                
                <a className="forgot text-muted" href="#/reset-password">Forgot password?</a>
                
                <input type="submit" value="Sign In" />
                
                <p className="text-muted signup-link">
                  Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsSignup(true); }}>Sign Up</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage; 