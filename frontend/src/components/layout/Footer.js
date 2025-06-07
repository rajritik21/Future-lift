import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollToSection from '../../hooks/useScrollToSection';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const scrollToSection = useScrollToSection();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Reset already subscribed state when user types
    if (alreadySubscribed) setAlreadySubscribed(false);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      // Reset states
      setSubscribed(false);
      setAlreadySubscribed(false);
      
      // Send the email to the backend API
      fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          skills: 'Job Alerts Subscriber', // Provide a default value
          source: 'footer',
          preferences: {
            jobAlerts: true,
            newsletters: true
          }
        }),
      })
        .then(response => {
          console.log('Response status:', response.status);
          return response.json().then(data => {
            if (!response.ok) {
              console.log('Error response data:', data);
              // Check if this is a duplicate email error
              if (data.message && data.message.toLowerCase().includes('already subscribed')) {
                setAlreadySubscribed(true);
                throw new Error('Already subscribed');
              }
              throw new Error(data.message || 'Failed to subscribe');
            }
            return data;
          });
        })
        .then(data => {
          console.log('Footer subscription successful:', data);
          
          // Store the email for display in success message
          localStorage.setItem('subscribedEmail', email);
          
          // Show success message
          setSubscribed(true);
          setEmail('');
          
          // Reset the subscribed state after 5 seconds
          setTimeout(() => {
            setSubscribed(false);
          }, 5000);
        })
        .catch(error => {
          console.error('Error during subscription:', error);
          
          // Don't show alert for already subscribed case
          if (!error.message.includes('Already subscribed')) {
            alert(error.message || 'Failed to subscribe. Please try again later.');
          }
        });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-indigo-900 to-blue-900 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500 rounded-full filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500 rounded-full filter blur-[120px] opacity-15"></div>
        <div className="absolute top-20 right-40 w-32 h-32 bg-pink-500 rounded-full filter blur-[80px] opacity-10"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/30 backdrop-blur-[1px]"></div>
      </div>
      
      {/* Wave Separator */}
      <div className="absolute top-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto transform translate-y-[-99%]">
          <path fill="currentColor" fillOpacity="0.15" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-3 pr-6">
            <div className="flex items-center mb-2 group relative">
              <Link to="/">
                <img src="/logo.png" alt="FutureLift" className="h-12 w-auto mr-2 transition-all duration-500 hover:scale-110" />
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400 group-hover:w-full transition-all duration-500"></div>
              </Link>
            </div>
            <p className="text-white/80 mb-2 leading-relaxed text-sm">
              Your Gateway to Opportunities! Navigate Your Next Career Move with FutureLift.
            </p>
            
            {/* Job Alerts Section */}
            <div className="mt-3 mb-3">
              <h3 className="text-base font-semibold text-white mb-2 relative inline-block">
                Job Alerts
                <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400"></span>
              </h3>
              {!subscribed && !alreadySubscribed ? (
                <form onSubmit={handleSubscribe} className="flex mt-1">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    value={email}
                    onChange={handleEmailChange}
                    className="bg-white/10 backdrop-blur-sm text-white placeholder-white/50 px-2 py-1 text-sm rounded-l-md border border-white/20 focus:outline-none focus:border-yellow-300/50 w-full" 
                    required
                  />
                  <button 
                    type="submit"
                    className="bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-indigo-900 font-medium px-2 py-1 rounded-r-md transition-all duration-300"
                  >
                    <i className="fas fa-paper-plane text-sm"></i>
                  </button>
                </form>
              ) : subscribed ? (
                <div className="bg-green-600/20 border border-green-600/30 rounded-md p-2 mt-1 text-sm text-white flex items-center">
                  <svg className="w-4 h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Thanks for subscribing! We'll notify you when new jobs are listed. <span className="text-xs opacity-75">({localStorage.getItem('subscribedEmail')})</span></span>
                </div>
              ) : (
                <div className="bg-blue-600/20 border border-blue-600/30 rounded-md p-2 mt-1 text-sm text-white flex items-center">
                  <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div className="flex-1">
                    <span>You're already subscribed to job alerts.</span>
                    <button 
                      onClick={() => setAlreadySubscribed(false)}
                      className="ml-2 text-yellow-300 hover:text-yellow-400 underline text-xs"
                    >
                      Try another email
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-4 mt-2">
              <a href="https://facebook.com" className="text-white/70 hover:text-yellow-300 transition-colors duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" className="text-white/70 hover:text-yellow-300 transition-colors duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" className="text-white/70 hover:text-yellow-300 transition-colors duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com" className="text-white/70 hover:text-yellow-300 transition-colors duration-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-base font-semibold text-white mb-2 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400"></span>
            </h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('featured-jobs');
                  }}
                  className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm"
                >
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>Featured Jobs</span>
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>Our Team</span>
                </Link>
              </li>
              <li>
                <Link to="/jobs/walkin" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>Walk-In Jobs</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Job Seekers */}
          <div className="md:col-span-3 md:pl-4">
            <h3 className="text-base font-semibold text-white mb-2 relative inline-block">
              Job Seekers
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400"></span>
            </h3>
            <ul className="space-y-1">
              <li>
                <Link to="/login" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>Create Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/#hero-section" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>Job Search</span>
                </Link>
              </li>
              <li>
                <Link to="/resources/resume-tips" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>Resume Tips</span>
                </Link>
              </li>
              <li>
                <Link to="/resources/interview-tips" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>Interview Tips</span>
                </Link>
              </li>
              <li>
                <Link to="/resources/aptitude-practice" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>Aptitude Practice</span>
                </Link>
              </li>
              <li>
                <Link to="/resources/career-guidance" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>Career Advice</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>FAQ</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div className="md:col-span-3 md:pl-4">
            <h3 className="text-base font-semibold text-white mb-2 relative inline-block">
              Employers
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400"></span>
            </h3>
            <ul className="space-y-1">
              <li>
                <Link to="/jobs/post" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>Post a Job</span>
                </Link>
              </li>
              <li>
                <Link to="/internships/post" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>Post an Internship</span>
                </Link>
              </li>
              <li>
                <Link to="/resumes/browse" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>Browse Resumes</span>
                </Link>
              </li>
              <li>
                <Link to="/employers/profile" className="text-white/70 hover:text-yellow-300 transition-all duration-300 flex items-center group text-sm">
                  <span className="w-0 h-0.5 bg-yellow-300 mr-0 group-hover:w-2 group-hover:mr-1 transition-all duration-300"></span>
                  <span>Company Profile</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-4 pt-3">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 mb-2 md:mb-0 text-xs">© {new Date().getFullYear()} FutureLift Job Portal. All rights reserved.</p>
            <div className="flex flex-wrap justify-center space-x-4">
              <Link to="/privacy" className="text-white/60 hover:text-yellow-300 transition-colors duration-300 text-xs">Privacy Policy</Link>
              <Link to="/terms" className="text-white/60 hover:text-yellow-300 transition-colors duration-300 text-xs">Terms of Service</Link>
              <Link to="/resources/career-guidance" className="text-white/60 hover:text-yellow-300 transition-colors duration-300 text-xs">Career Advice</Link>
              <Link to="/help-support" className="text-white/60 hover:text-yellow-300 transition-colors duration-300 text-xs">Help & Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;