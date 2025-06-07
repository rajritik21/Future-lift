import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/UserLoginPage.css';

// Font Awesome icons
import '@fortawesome/fontawesome-free/css/all.min.css';

// Configure axios defaults
axios.defaults.timeout = 10000; // 10 second timeout

const EmployerLoginPage = () => {
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
    dob: '',
    userType: 'employer' // Always employer for this page
  });

  // Check for signup and message parameters in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const showSignup = params.get('signup') === 'true';
    if (showSignup) {
      setIsSignup(true);
    }
    
    // Check for message parameter
    const message = params.get('message');
    if (message) {
      setSuccess(message);
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
    
    let birthDate;
    
    // Input is already in YYYY-MM-DD format from date picker
    if (dob.includes('-')) {
      // Validate YYYY-MM-DD format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dob)) {
        return "Invalid date format";
      }
      birthDate = new Date(dob);
    } else if (dob.includes('/')) {
      // Handle MM/DD/YYYY format for backward compatibility
      const parts = dob.split('/');
      if (parts.length !== 3) {
        return "Invalid date format";
      }
      
      const month = parseInt(parts[0], 10);
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);
      
      // Basic validation for month, day, and year
      if (isNaN(month) || month < 1 || month > 12) {
        return "Invalid month. Must be between 1-12";
      }
      
      if (isNaN(day) || day < 1 || day > 31) {
        return "Invalid day. Must be between 1-31";
      }
      
      if (isNaN(year) || year < 1950 || year > new Date().getFullYear()) {
        return "Invalid year";
      }
      
      // MM/DD/YYYY to Date object - Note: JavaScript months are 0-indexed
      birthDate = new Date(year, month - 1, day);
      
      // Check if date is valid (e.g., February 30 is invalid)
      if (birthDate.getMonth() !== month - 1 || birthDate.getDate() !== day) {
        return "Invalid date. Please check the day for the given month";
      }
    } else {
      return "Invalid date format";
    }
    
    // Check if date is valid (not NaN)
    if (isNaN(birthDate.getTime())) {
      return "Invalid date. Please check the format";
    }
    
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
      
      // Check if the logged in user is an employer
      if (response.data.user.userType !== 'employer') {
        setError('This login is only for employers. Please use the regular login page if you are a job seeker.');
        return;
      }
      
      login(response.data.token, response.data.user);
      
      // Redirect to employer dashboard
      navigate('/employer/dashboard');
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
      
      // Parse and format the date of birth
      let formattedDob = signupData.dob;
      
      // Date from date picker should already be in YYYY-MM-DD format
      // But we'll check if it's in MM/DD/YYYY format for backward compatibility
      if (signupData.dob && signupData.dob.includes('/')) {
        const parts = signupData.dob.split('/');
        if (parts.length === 3) {
          const month = parts[0].padStart(2, '0');
          const day = parts[1].padStart(2, '0');
          const year = parts[2];
          formattedDob = `${year}-${month}-${day}`;
          console.log('Converted date format from MM/DD/YYYY to YYYY-MM-DD:', formattedDob);
        }
      }
      
      // Create a Date object to ensure valid date
      const dobDate = new Date(formattedDob);
      if (isNaN(dobDate.getTime())) {
        setError("Invalid date format.");
        console.error('Invalid date after conversion:', formattedDob);
        return;
      }
      
      const userData = {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        mobile: signupData.mobile || undefined,  // Only send if provided
        dob: formattedDob, 
        userType: 'employer' // Always register as employer on this page
      };
      
      console.log('Submitting registration with data:', {
        ...userData, 
        password: '[REDACTED]',
        dob: formattedDob
      });
      
      const response = await axios.post('/api/auth/register', userData);
      console.log('Registration response:', response.data);
      
      setSuccess('Employer registration successful! You can now login to your account.');
      setTimeout(() => {
        setIsSignup(false);
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Signup error:', err);
      
      // Get more detailed error information
      if (err.response) {
        console.error('Error response status:', err.response.status);
        console.error('Error response data:', err.response.data);
        
        // Handle validation errors specifically
        if (err.response.data.errors && err.response.data.errors.length > 0) {
          const errorMsg = err.response.data.errors[0].msg;
          setError(errorMsg || 'Registration failed. Please try again.');
          console.error('Validation error:', errorMsg);
        } else if (err.response.data && typeof err.response.data === 'string') {
          setError(err.response.data);
          console.error('Server error message:', err.response.data);
        } else {
          setError('Registration failed. Please try again with different information.');
          console.error('Unknown response format:', err.response.data);
        }
      } else if (err.request) {
        // Request was made but no response received
        console.error('No response received. Network issue or server down.');
        setError('Server not responding. Please check your internet connection and try again later.');
      } else {
        // Error in setting up the request
        console.error('Request setup error:', err.message);
        setError('Registration error. Please try again.');
      }
    }
  };

  const handleToggleSignup = (e) => {
    e.preventDefault();
    setIsSignup(true);
    // Clear any previous errors/success messages
    setError(null);
    setSuccess(null);
  };

  const handleToggleSignin = (e) => {
    e.preventDefault();
    setIsSignup(false);
    // Clear any previous errors/success messages
    setError(null);
    setSuccess(null);
  };

  // Format date for date input field
  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    // Return in YYYY-MM-DD format for the input[type="date"] HTML5 element
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
                  <h1>Employer Registration</h1>
                  <div className="user-login-subtitle">Create your employer account</div>
                  <div className="mt-2 inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full font-semibold">
                    <i className="fas fa-building mr-1"></i> For Employers Only
                  </div>
                </div>
                
                <div className="login-signup-toggle">
                  <button 
                    type="button" 
                    className="toggle-btn" 
                    onClick={handleToggleSignin}
                  >
                    Sign In
                  </button>
                  <button 
                    type="button" 
                    className="toggle-btn active"
                  >
                    Register
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

                <div className="input-group date-group">
                  <span className="input-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </span>
                  <div className="date-input-wrapper">
                    <input 
                      type="date" 
                      name="dob" 
                      placeholder="Date of Birth" 
                      value={signupData.dob}
                      onChange={handleSignupChange}
                      className={validationErrors.dob ? "invalid-input" : ""}
                      required
                      min={getMinDate()}
                      max={getMaxDate()}
                      title="Please enter your date of birth (must be 18-60 years old)"
                    />
                    <div className="date-tooltip info-left" style={{ right: "10px" }}>
                      <i className="fas fa-info-circle"></i>
                      <span className="date-tooltip-text" style={{ width: "280px", marginLeft: "-140px" }}>
                        Enter your date of birth in MM/DD/YYYY format.<br/>
                        Employers must be between 18 and 60 years old.<br/>
                        This information is used for account verification and security purposes.
                      </span>
                    </div>
                  </div>
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
                
                <input type="submit" value="Register as Employer" />
                
                <p className="text-muted signup-link">
                  Already have an employer account? <a href="#" onClick={handleToggleSignin}>Sign In</a>
                </p>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">Looking for a job?</p>
                  <Link to="/login" className="inline-block bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm px-4 py-2 rounded-md font-semibold transition-colors duration-200">
                    <i className="fas fa-user mr-1"></i> Job Seeker Login/Register
                  </Link>
                </div>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit} className="user-login-box">
                <div className="user-login-header">
                  <h1>Employer Sign In</h1>
                  <div className="user-login-subtitle">Welcome back! Please sign in to your employer account</div>
                  <div className="mt-2 inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full font-semibold">
                    <i className="fas fa-building mr-1"></i> For Employers Only
                  </div>
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
                    onClick={handleToggleSignup}
                  >
                    Register
                  </button>
                </div>
                
                {error && <div className="user-login-error">{error}</div>}
                {success && <div className="user-login-success">{success}</div>}
                
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
                
                <div className="form-group">
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
                  <div className="forgot-password text-center mt-2">
                    <Link to="/forgot-password">Forgot your password?</Link>
                  </div>
                </div>
                
                <input type="submit" value="Sign In as Employer" />
                
                <p className="text-muted signup-link">
                  Don't have an employer account? <a href="#" onClick={handleToggleSignup}>Register</a>
                </p>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">Looking for a job?</p>
                  <Link to="/login" className="inline-block bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm px-4 py-2 rounded-md font-semibold transition-colors duration-200">
                    <i className="fas fa-user mr-1"></i> Job Seeker Login/Register
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerLoginPage; 