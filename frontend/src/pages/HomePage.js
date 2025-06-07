import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [popularCategories] = useState([
    { id: 1, name: 'Software Engineer', icon: 'fas fa-laptop-code', jobCount: 234 },
    { id: 2, name: 'Information Technology', icon: 'fas fa-server', jobCount: 186 },
    { id: 3, name: 'Technical Engineering', icon: 'fas fa-cogs', jobCount: 152 },
    { id: 4, name: 'Web Development', icon: 'fas fa-globe', jobCount: 145 },
    { id: 5, name: 'System Engineer', icon: 'fas fa-network-wired', jobCount: 127 },
    { id: 6, name: 'Business Process Services', icon: 'fas fa-chart-line', jobCount: 118 },
    { id: 7, name: 'Graphics Design', icon: 'fas fa-paint-brush', jobCount: 110 },
    { id: 8, name: 'Software Development', icon: 'fas fa-code', jobCount: 105 }
  ]);

  const [subscription, setSubscription] = useState({
    skills: '',
    email: ''
  });
  
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');

  const handleSubscriptionChange = (e) => {
    const { name, value } = e.target;
    setSubscription(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset error states when user starts typing
    if (alreadySubscribed) setAlreadySubscribed(false);
    if (subscribeError) setSubscribeError('');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    // Reset states
    setSubscribeSuccess(false);
    setAlreadySubscribed(false);
    setSubscribeError('');
    
    // Send subscription data to backend API
    fetch('/api/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: subscription.email,
        skills: subscription.skills,
        subscriptionDate: new Date(),
        source: 'homepage'
      }),
    })
      .then(response => {
        console.log('Response status:', response.status);
        return response.json().then(data => {
          console.log('Response data:', data);
          if (!response.ok) {
            // Check if this is a duplicate email error
            if (data.message && data.message.toLowerCase().includes('already subscribed')) {
              setAlreadySubscribed(true);
              throw new Error('You are already subscribed with this email. We\'ll notify you about new matching jobs.');
            }
            throw new Error(data.message || 'Failed to subscribe');
          }
          return data;
        });
      })
      .then(data => {
        console.log('Subscription successful:', data);
        
        // Store the email for display in success message
        localStorage.setItem('subscribedEmail', subscription.email);
        localStorage.setItem('subscribedSkills', subscription.skills);
        
        // Show success message
        setSubscribeSuccess(true);
        
        // Reset form
        setSubscription({
          skills: '',
          email: ''
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubscribeSuccess(false);
        }, 5000);
      })
      .catch(error => {
        console.error('Error during subscription:', error);
        
        // Set appropriate error message
        if (error.message.includes('already subscribed')) {
          setAlreadySubscribed(true);
        } else {
          setSubscribeError(error.message || 'Failed to subscribe. Please try again later.');
        }
      });
  };

  useEffect(() => {
    // Mock data for demo purposes - in a real app, this would fetch from the API
    // We're not using the featuredJobs state in this component currently
    // but keeping the effect for future implementation
    
    // Keeping this mock data for future implementation
    // eslint-disable-next-line no-unused-vars
    const mockJobs = [
      {
        _id: '1',
        title: 'Software Development Engineer',
        company: {
          name: 'Accenture',
          logo: 'https://logo.clearbit.com/accenture.com'
        },
        location: 'Bengaluru',
        jobType: 'Full-time',
        category: 'Software Development',
        experience: '0-2 year(s)',
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
        date: new Date('2023-03-15')
      }
      // Additional job entries can be uncommented later if needed
    ];

    // Simulate API call
    // Not currently using the loading state in this component
    setTimeout(() => {
      // setFeaturedJobs(mockJobs);
      // setIsLoading(false);
    }, 1000);
  }, []);

  // Animation related state and useEffect for "Top Companies Hiring" section
  const [companyLogos, setCompanyLogos] = useState([
    { id: 1, name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
    { id: 2, name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
    { id: 3, name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
    { id: 4, name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
    { id: 5, name: 'Meta', logo: 'https://logo.clearbit.com/meta.com' },
    { id: 6, name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com' },
    { id: 7, name: 'Adobe', logo: 'https://logo.clearbit.com/adobe.com' },
    { id: 8, name: 'IBM', logo: 'https://logo.clearbit.com/ibm.com' },
    { id: 9, name: 'Accenture', logo: 'https://logo.clearbit.com/accenture.com' },
    { id: 10, name: 'Capgemini', logo: 'https://logo.clearbit.com/capgemini.com' },
    { id: 11, name: 'TCS', logo: 'https://logo.clearbit.com/tcs.com' },
    { id: 12, name: 'Infosys', logo: 'https://logo.clearbit.com/infosys.com' },
  ]);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="hero-section" id="hero-section">
        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://plus.unsplash.com/premium_photo-1661344287754-5b54e8feb18b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-indigo-900/80"></div>
        </div>
        
        <div className="blur-shape bg-blue-500 w-96 h-96 -top-24 -right-24 z-10"></div>
        <div className="blur-shape bg-indigo-600 w-80 h-80 top-1/2 -left-24 z-10"></div>
        <div className="blur-shape bg-blue-400 w-64 h-64 -bottom-24 right-1/4 z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-20 w-full">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Find Your <span className="text-yellow-300">Perfect</span> Job
            </h1>
            <p className="mt-6 text-xl text-white leading-relaxed max-w-lg mx-auto opacity-90">
              Navigate Your Next Career Move with FutureLift: Your Gateway to Opportunities!
            </p>
            
            <div className="mt-12 w-full max-w-3xl mx-auto">
              <div className="flex rounded-xl overflow-hidden shadow-xl bg-white/10 backdrop-blur-lg">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-12 pr-3 py-5 border-0 text-base text-white placeholder-gray-300 bg-transparent focus:outline-none focus:ring-0"
                    placeholder="Job title, company, or keywords"
                  />
                </div>
                <div className="relative inline-flex items-center">
                  <select className="h-full py-5 pl-4 pr-10 border-0 bg-transparent text-white font-medium appearance-none focus:outline-none focus:ring-0">
                    <option className="bg-gray-900 text-white">All Locations</option>
                    <option className="bg-gray-900 text-white">Remote</option>
                    <option className="bg-gray-900 text-white">Bengaluru</option>
                    <option className="bg-gray-900 text-white">Mumbai</option>
                    <option className="bg-gray-900 text-white">Delhi</option>
                    <option className="bg-gray-900 text-white">Hyderabad</option>
                    <option className="bg-gray-900 text-white">Chennai</option>
                    <option className="bg-gray-900 text-white">Kolkata</option>
                    <option className="bg-gray-900 text-white">Noida</option>
                    <option className="bg-gray-900 text-white">Gurgaon</option>
                    <option className="bg-gray-900 text-white">Pune</option>
                    <option className="bg-gray-900 text-white">Jaipur</option>
                    <option className="bg-gray-900 text-white">Ahmedabad</option>
                    <option className="bg-gray-900 text-white">Indore</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 flex items-center">
                    <i className="fas fa-chevron-down text-xs text-gray-300"></i>
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-8 py-5 bg-primary-600 text-white font-medium hover:bg-primary-700 focus:outline-none focus:ring-0 transition-colors duration-300"
                >
                  Search
                </button>
              </div>
              
              {/* Popular searches */}
              <div className="mt-4 text-white/80 text-sm flex flex-wrap justify-center gap-2">
                <span className="font-medium">Popular:</span>
                <a href="#" className="hover:text-yellow-300 transition-colors">Software Engineer</a>
                <span>•</span>
                <a href="#" className="hover:text-yellow-300 transition-colors">Data Scientist</a>
                <span>•</span>
                <a href="#" className="hover:text-yellow-300 transition-colors">Web Developer</a>
                <span>•</span>
                <a href="#" className="hover:text-yellow-300 transition-colors">Remote</a>
              </div>
            </div>
          </div>
          
          {/* Scroll down indicator */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce cursor-pointer">
            <a href="#categories" className="flex flex-col items-center">
              <span className="text-sm mb-2">Scroll Down</span>
              <i className="fas fa-chevron-down"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section id="categories" className="py-16 gradient-bg-blue animated-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Explore Job Categories
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Find your perfect career path from our diverse job categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category) => (
              <Link 
                to={`/jobs/category/${category.id}`} 
                key={category.id}
                className="category-card animated-card rounded-lg p-5 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="h-16 w-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-4 mx-auto shadow-md group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <i className={`${category.icon} text-2xl`}></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center group-hover:text-primary-600 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs text-gray-500 text-center">
                  {category.jobCount} Jobs Available
                </p>
                <div className="view-jobs text-primary-600 text-sm mt-2 text-center">
                  <span className="inline-flex items-center">
                    View Jobs 
                    <i className="fas fa-arrow-right ml-1 group-hover:ml-2 transition-all duration-300"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/jobs/categories"
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
            >
              View All Categories
              <i className="fas fa-chevron-right ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 gradient-bg-purple animated-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="animated-card overflow-hidden rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4 mx-auto shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
                <i className="fas fa-briefcase text-3xl"></i>
              </div>
              <div className="text-4xl font-bold text-primary-600 mb-1">1,000+</div>
              <div className="text-lg font-medium text-gray-600">Active Job Listings</div>
            </div>
            
            <div className="animated-card overflow-hidden rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 text-yellow-600 mb-4 mx-auto shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
                <i className="fas fa-building text-3xl"></i>
              </div>
              <div className="text-4xl font-bold text-yellow-600 mb-1">500+</div>
              <div className="text-lg font-medium text-gray-600">Companies</div>
            </div>
            
            <div className="animated-card overflow-hidden rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4 mx-auto shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
                <i className="fas fa-users text-3xl"></i>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-1">10,000+</div>
              <div className="text-lg font-medium text-gray-600">Registered Job Seekers</div>
            </div>
            
            <div className="animated-card overflow-hidden rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4 mx-auto shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
                <i className="fas fa-check-circle text-3xl"></i>
              </div>
              <div className="text-4xl font-bold text-indigo-600 mb-1">85%</div>
              <div className="text-lg font-medium text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="py-16 gradient-bg-teal animated-bg" id="featured-jobs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Featured Job Opportunities</h2>
              <p className="mt-2 text-lg text-gray-500">Discover the newest career prospects tailored just for you</p>
            </div>
            <Link to="/jobs" className="text-primary-600 hover:text-primary-800 font-medium flex items-center">
              View All Jobs <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Accenture Job */}
            <div className="animated-card rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-5">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0 shadow-md">
                      <i className="fas fa-greater-than text-xl"></i>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-gray-900 font-medium text-lg">Software Development...</h3>
                      <p className="text-gray-600 text-sm">Accenture</p>
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded h-fit">
                    Full-time
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-map-marker-alt text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">Bengaluru</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-briefcase text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">Software Development</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">0-2 year(s)</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Required Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">JavaScript</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">React</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Node.js</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">MongoDB</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">+1 more</span>
                  </div>
                </div>
                
                <div className="mt-5 flex gap-2">
                  <Link to="/jobs/1" className="text-center rounded px-4 py-2 text-gray-700 font-medium text-sm flex-1 hover:bg-gray-50">View Details</Link>
                  <Link to="#" className="text-center bg-primary-600 hover:bg-primary-700 rounded px-4 py-2 text-white font-medium text-sm flex-1">Apply Now</Link>
                </div>
              </div>
            </div>

            {/* Capgemini Job */}
            <div className="animated-card rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-5">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0 shadow-md">
                      <i className="fas fa-circle text-xl"></i>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-gray-900 font-medium text-lg">DevOps Engineer</h3>
                      <p className="text-gray-600 text-sm">Capgemini</p>
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded h-fit">
                    Full-time
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-map-marker-alt text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">Bangalore, Pune</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-briefcase text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">DevOps</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">1+ year</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Required Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Docker</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Kubernetes</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">AWS</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Jenkins</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">+2 more</span>
                  </div>
                </div>
                
                <div className="mt-5 flex gap-2">
                  <Link to="/jobs/2" className="text-center rounded px-4 py-2 text-gray-700 font-medium text-sm flex-1 hover:bg-gray-50">View Details</Link>
                  <Link to="#" className="text-center bg-primary-600 hover:bg-primary-700 rounded px-4 py-2 text-white font-medium text-sm flex-1">Apply Now</Link>
                </div>
              </div>
            </div>

            {/* EY Job */}
            <div className="animated-card rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-5">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-gray-800 font-bold flex-shrink-0 shadow-md">
                      EY
                    </div>
                    <div className="ml-3">
                      <h3 className="text-gray-900 font-medium text-lg">Project Analyst</h3>
                      <p className="text-gray-600 text-sm">EY</p>
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded h-fit">
                    Full-time
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-map-marker-alt text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">India</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-briefcase text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">Software Engineer</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">Fresher</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Required Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Communication</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Analysis</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Excel</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Problem Solving</span>
                  </div>
                </div>
                
                <div className="mt-5 flex gap-2">
                  <Link to="/jobs/3" className="text-center rounded px-4 py-2 text-gray-700 font-medium text-sm flex-1 hover:bg-gray-50">View Details</Link>
                  <Link to="#" className="text-center bg-primary-600 hover:bg-primary-700 rounded px-4 py-2 text-white font-medium text-sm flex-1">Apply Now</Link>
                </div>
              </div>
            </div>

            {/* Google Job */}
            <div className="animated-card rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-5">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100 shadow-md">
                      <img src="https://logo.clearbit.com/google.com" alt="Google" className="w-full h-full object-contain" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-gray-900 font-medium text-lg">Software Engineer III,...</h3>
                      <p className="text-gray-600 text-sm">Google</p>
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded h-fit">
                    Full-time
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-map-marker-alt text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">Hyderabad, Telangana, India</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-briefcase text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">Software Engineer</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">4+ years</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Required Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Python</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Cloud</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Distributed Systems</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Algorithms</span>
                  </div>
                </div>
                
                <div className="mt-5 flex gap-2">
                  <Link to="/jobs/4" className="text-center rounded px-4 py-2 text-gray-700 font-medium text-sm flex-1 hover:bg-gray-50">View Details</Link>
                  <Link to="#" className="text-center bg-primary-600 hover:bg-primary-700 rounded px-4 py-2 text-white font-medium text-sm flex-1">Apply Now</Link>
                </div>
              </div>
            </div>

            {/* Amazon Job */}
            <div className="animated-card rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-5">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100 shadow-md">
                      <img src="https://logo.clearbit.com/amazon.com" alt="Amazon" className="w-full h-full object-contain" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-gray-900 font-medium text-lg">Software Development...</h3>
                      <p className="text-gray-600 text-sm">Amazon</p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs py-1 px-2 rounded h-fit">
                    Remote
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-map-marker-alt text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">Remote</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-briefcase text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">Software Development Engineer</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">3+ years</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Required Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Java</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">AWS</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Microservices</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">REST APIs</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">+1 more</span>
                  </div>
                </div>
                
                <div className="mt-5 flex gap-2">
                  <Link to="/jobs/5" className="text-center rounded px-4 py-2 text-gray-700 font-medium text-sm flex-1 hover:bg-gray-50">View Details</Link>
                  <Link to="#" className="text-center bg-primary-600 hover:bg-primary-700 rounded px-4 py-2 text-white font-medium text-sm flex-1">Apply Now</Link>
                </div>
              </div>
            </div>

            {/* Microsoft Job */}
            <div className="animated-card rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-5">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100 shadow-md">
                      <img src="https://logo.clearbit.com/microsoft.com" alt="Microsoft" className="w-full h-full object-contain" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-gray-900 font-medium text-lg">Cloud Software...</h3>
                      <p className="text-gray-600 text-sm">Microsoft</p>
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded h-fit">
                    Full-time
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-map-marker-alt text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">India</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-briefcase text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">Software Engineer</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-gray-400 w-5 text-lg"></i>
                    <span className="ml-2 text-gray-600 text-sm">Fresher</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Required Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Azure</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Cloud Computing</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">C#</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">.NET</span>
                  </div>
                </div>
                
                <div className="mt-5 flex gap-2">
                  <Link to="/jobs/6" className="text-center rounded px-4 py-2 text-gray-700 font-medium text-sm flex-1 hover:bg-gray-50">View Details</Link>
                  <Link to="#" className="text-center bg-primary-600 hover:bg-primary-700 rounded px-4 py-2 text-white font-medium text-sm flex-1">Apply Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Companies Hiring */}
      <section className="py-16 gradient-bg-teal animated-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Dream Companies Hiring</h2>
            <p className="mt-2 text-lg text-gray-500">Your chance to join these top global tech giants and build your dream career</p>
          </div>
          
          <div className="logo-scroll-container relative max-w-6xl mx-auto overflow-hidden px-4">
            {/* Logo container with padding on sides */}
            <div className="logo-wrapper animate-scroll-left py-6">
              {companyLogos.slice(0, 6).map((company) => (
                <div key={company.id} className="logo-item">
                  <img src={company.logo} alt={company.name} className="company-logo" />
                </div>
              ))}
              {/* Duplicate the first set for seamless scrolling */}
              {companyLogos.slice(0, 6).map((company) => (
                <div key={`dup1-${company.id}`} className="logo-item">
                  <img src={company.logo} alt={company.name} className="company-logo" />
                </div>
              ))}
            </div>
            
            {/* Second row of logos (scrolling in opposite direction) */}
            <div className="logo-wrapper animate-scroll-right py-6">
              {companyLogos.slice(6, 12).map((company) => (
                <div key={company.id} className="logo-item">
                  <img src={company.logo} alt={company.name} className="company-logo" />
                </div>
              ))}
              {/* Duplicate the second set for seamless scrolling */}
              {companyLogos.slice(6, 12).map((company) => (
                <div key={`dup2-${company.id}`} className="logo-item">
                  <img src={company.logo} alt={company.name} className="company-logo" />
                </div>
              ))}
            </div>
            
            {/* Add subtle fade effects on the sides */}
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#f0fdfa] to-transparent"></div>
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#f0fdfa] to-transparent"></div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/companies" className="text-primary-600 hover:text-primary-800 font-medium flex items-center justify-center">
              View All Companies <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[#1a1a3a] bg-opacity-50"></div>
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-white opacity-10"></div>
          <div className="absolute top-20 left-40 w-6 h-6 rounded-full bg-white opacity-10"></div>
          <div className="absolute top-60 left-20 w-3 h-3 rounded-full bg-white opacity-10"></div>
          <div className="absolute top-40 right-80 w-5 h-5 rounded-full bg-white opacity-10"></div>
          <div className="absolute top-20 right-40 w-4 h-4 rounded-full bg-white opacity-10"></div>
          <div className="absolute top-80 right-20 w-6 h-6 rounded-full bg-white opacity-10"></div>
          <div className="absolute bottom-20 left-40 w-5 h-5 rounded-full bg-white opacity-10"></div>
          <div className="absolute bottom-40 right-60 w-4 h-4 rounded-full bg-white opacity-10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold sm:text-4xl">What Our Users Say</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              Discover how FutureLift has helped professionals find their dream careers
            </p>
          </div>
          
          <div className="mt-10">
            <div className="relative">
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/80 hover:bg-primary-600 focus:outline-none transition-all duration-300 z-20">
                <i className="fas fa-chevron-left text-white text-lg"></i>
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Testimonial 1 */}
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center mb-6">
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="John Doe" 
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">John Doe</h3>
                      <p className="text-gray-400">Software Engineer, TechCorp</p>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    "FutureLift helped me find my dream job quickly and easily. The platform is user-friendly and has a great selection of job listings."
                  </p>
                  <div className="mt-4 flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                
                {/* Testimonial 2 */}
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center mb-6">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="Jane Smith" 
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">Jane Smith</h3>
                      <p className="text-gray-400">Product Manager, InnovateX</p>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    "I love how FutureLift connects job seekers with top companies. It made my job search stress-free and successful!"
                  </p>
                  <div className="mt-4 flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                
                {/* Testimonial 3 */}
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center mb-6">
                    <img 
                      src="https://randomuser.me/api/portraits/men/67.jpg" 
                      alt="Michael Johnson" 
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">Michael Johnson</h3>
                      <p className="text-gray-400">Data Analyst, TechNet</p>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    "FutureLift provided me with valuable insights into job trends and opportunities in my field. Highly recommend!"
                  </p>
                  <div className="mt-4 flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/80 hover:bg-primary-600 focus:outline-none transition-all duration-300 z-20">
                <i className="fas fa-chevron-right text-white text-lg"></i>
              </button>
            </div>
            
            <div className="mt-10 flex justify-center">
              <div className="flex space-x-3">
                <button className="w-3 h-3 rounded-full bg-gray-600 hover:bg-primary-400 focus:outline-none transition-all duration-300"></button>
                <button className="w-3 h-3 rounded-full bg-primary-500 focus:outline-none"></button>
                <button className="w-3 h-3 rounded-full bg-gray-600 hover:bg-primary-400 focus:outline-none transition-all duration-300"></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-tr from-blue-700 via-primary-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
          <div className="absolute top-1/3 -left-24 w-80 h-80 rounded-full bg-indigo-600 opacity-20 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 relative z-10">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:max-w-xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block">Ready to find your dream job?</span>
                <span className="block text-yellow-300">Join FutureLift today.</span>
              </h2>
              <p className="mt-3 text-lg text-gray-300">
                Subscribe to get notified when new jobs matching your skills are posted.
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <div className="inline-flex rounded-md shadow">
                  <Link to="/login?signup=true" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-100 transition-all duration-300 transform hover:translate-y-1 hover:shadow-lg">
                    Get Started
                  </Link>
                </div>
                <div className="inline-flex rounded-md shadow">
                  <Link to="/about" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-800 transition-all duration-300 transform hover:translate-y-1 hover:shadow-lg">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subscription Form */}
          <div className="mt-10 pt-8">
            {subscribeSuccess ? (
              <div className="bg-primary-800/50 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Thank You for Subscribing!</h3>
                <p className="text-gray-200 mb-4">
                  We'll notify you when new jobs matching <span className="font-semibold text-yellow-300">{localStorage.getItem('subscribedSkills')}</span> are posted.
                </p>
                <p className="text-gray-300 text-sm">
                  Job alerts will be sent to <span className="font-medium text-white">{localStorage.getItem('subscribedEmail')}</span>
                </p>
              </div>
            ) : alreadySubscribed ? (
              <div className="bg-primary-800/50 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                  <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Already Subscribed!</h3>
                <p className="text-gray-200 mb-4">
                  This email is already in our subscription list. We'll continue to send you relevant job alerts.
                </p>
                <button 
                  onClick={() => setAlreadySubscribed(false)} 
                  className="mt-2 inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-primary-700 bg-yellow-300 hover:bg-yellow-400 focus:outline-none"
                >
                  Try Different Email
                </button>
              </div>
            ) : (
              <>
                <form className="sm:flex" onSubmit={handleSubscribe}>
                  <div className="flex-1">
                    <label htmlFor="skills" className="sr-only">Your skills</label>
                    <input
                      id="skills"
                      name="skills"
                      type="text"
                      required
                      className="w-full px-5 py-3 placeholder-gray-500 focus:ring-0 focus:outline-none rounded-md shadow-sm"
                      placeholder="Enter your skills (e.g. JavaScript, React, UX Design)"
                      value={subscription.skills}
                      onChange={handleSubscriptionChange}
                    />
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-5 py-3 placeholder-gray-500 focus:ring-0 focus:outline-none rounded-md shadow-sm"
                      placeholder="Enter your email"
                      value={subscription.email}
                      onChange={handleSubscriptionChange}
                    />
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-5 py-3 text-base font-medium rounded-md text-primary-700 bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-0 transition-all duration-300 transform hover:scale-105"
                    >
                      <i className="fas fa-bell mr-2"></i> Subscribe
                    </button>
                  </div>
                </form>
                {subscribeError && (
                  <div className="mt-3 bg-red-100 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{subscribeError}</span>
                  </div>
                )}
                <p className="mt-3 text-sm text-gray-300">
                  Get personalized job alerts matching your skills sent directly to your inbox. No spam, ever.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
    
    </div>
  );
};

export default HomePage;