import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import '../styles/AuthPage.css';

const AuthPage = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(location.pathname === '/register');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [formData, setFormData] = useState({
    signUp: {
      fullName: '',
      contactNumber: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    signIn: {
      email: '',
      password: ''
    }
  });
  
  const navigate = useNavigate();

  // Update isActive state if the URL changes
  useEffect(() => {
    setIsActive(location.pathname === '/register');
  }, [location.pathname]);

  const handleRegisterClick = () => {
    setIsActive(true);
    navigate('/register');
  };

  const handleLoginClick = () => {
    setIsActive(false);
    navigate('/login');
  };

  const handleInputChange = (form, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [form]: {
        ...prevData[form],
        [field]: value
      }
    }));

    // Password strength check
    if (form === 'signUp' && field === 'password') {
      if (value.length < 4) {
        setPasswordStrength('weak');
      } else if (value.length >= 4 && value.length < 8) {
        setPasswordStrength('medium');
      } else if (value.length >= 8) {
        setPasswordStrength('strong');
      }
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const { fullName, contactNumber, email, password, confirmPassword } = formData.signUp;
    
    // Basic validation
    if (!fullName || !contactNumber || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Here you would typically make an API call to register the user
    console.log('Sign up data:', formData.signUp);
    
    // For demo purposes, simulating successful registration
    alert('Registration successful! Please login.');
    setIsActive(false);
    navigate('/login');
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const { email, password } = formData.signIn;
    
    // Basic validation
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    
    // Here you would typically make an API call to authenticate the user
    console.log('Sign in data:', formData.signIn);
    
    // For demo purposes, simulating successful login
    localStorage.setItem('user', JSON.stringify({ email, userType: 'jobseeker' }));
    localStorage.setItem('token', 'dummy-token');
    
    // Redirect to homepage after login
    navigate('/');
  };

  return (
    <AuthLayout>
      <div className={`auth-container ${isActive ? 'active' : ''}`} id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={formData.signUp.fullName}
              onChange={(e) => handleInputChange('signUp', 'fullName', e.target.value)}
              required
            />
            <input 
              type="number" 
              placeholder="Contact Number" 
              value={formData.signUp.contactNumber}
              onChange={(e) => handleInputChange('signUp', 'contactNumber', e.target.value)}
              required
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={formData.signUp.email}
              onChange={(e) => handleInputChange('signUp', 'email', e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              id="password"
              value={formData.signUp.password}
              onChange={(e) => handleInputChange('signUp', 'password', e.target.value)}
              required
              style={{ 
                borderColor: 
                  passwordStrength === 'weak' ? '#ff5925' : 
                  passwordStrength === 'medium' ? 'yellow' : 
                  passwordStrength === 'strong' ? 'green' : ''
              }}
            />
            {passwordStrength && (
              <div 
                id="message" 
                style={{ 
                  display: 'block', 
                  color: 
                    passwordStrength === 'weak' ? '#ff5925' : 
                    passwordStrength === 'medium' ? 'yellow' : 
                    passwordStrength === 'strong' ? 'green' : '',
                  fontSize: '12px',
                  marginTop: '-5px',
                  marginBottom: '5px'
                }}
              >
                Password strength: <span id="strength">{passwordStrength}</span>
              </div>
            )}
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={formData.signUp.confirmPassword}
              onChange={(e) => handleInputChange('signUp', 'confirmPassword', e.target.value)}
              required
            />
            <button className="button-85" type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email password</span>
            <input 
              type="email" 
              placeholder="Email" 
              value={formData.signIn.email}
              onChange={(e) => handleInputChange('signIn', 'email', e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={formData.signIn.password}
              onChange={(e) => handleInputChange('signIn', 'password', e.target.value)}
              required
            />
            <a href="#">Forgot Your Password?</a>
            <button className="button-85" type="submit">Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="button-85" id="login" type="button" onClick={handleLoginClick}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <img src="/images/login/logo.png" width="380px" height="180px" alt="FutureLift Logo" />
              <p>Register with your personal details to use all of site features</p>
              <button className="button-85" id="register" type="button" onClick={handleRegisterClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default AuthPage; 