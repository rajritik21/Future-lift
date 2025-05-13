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

  const handleSubscriptionChange = (e) => {
    const { name, value } = e.target;
    setSubscription(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    // In a real application, you would send this data to your backend API
    console.log('Subscription data:', subscription);
    
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

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-blue-600 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Find Your <span className="text-yellow-300">Perfect</span> Job
            </h1>
            <p className="mt-6 text-xl text-white leading-relaxed max-w-lg mx-auto">
              Navigate Your Next Career Move with FutureLift: Your Gateway to Opportunities!
            </p>
            
            <div className="mt-12 w-full max-w-3xl mx-auto">
              <div className="flex rounded-xl overflow-hidden shadow-lg bg-white">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-12 pr-3 py-5 border-0 text-base text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-0"
                    placeholder="Job title, company, or keywords"
                  />
                </div>
                <div className="relative inline-flex items-center border-l border-gray-200">
                  <select className="h-full py-5 pl-4 pr-10 border-0 bg-white text-gray-700 font-medium appearance-none focus:outline-none focus:ring-0">
                    <option>All Locations</option>
                    <option>Remote</option>
                    <option>Bengaluru</option>
                    <option>Mumbai</option>
                    <option>Delhi</option>
                    <option>Hyderabad</option>
                    <option>Chennai</option>
                    <option>Kolkata</option>
                    <option>Noida</option>
                    <option>Gurgaon</option>
                    <option>Pune</option>
                    <option>Jaipur</option>
                    <option>Ahmedabad</option>
                    <option>Indore</option>
                    
                  </select>
                  <div className="pointer-events-none absolute right-3 flex items-center">
                    <i className="fas fa-chevron-down text-xs text-gray-500"></i>
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-8 py-5 bg-white text-blue-600 font-medium hover:bg-gray-50 focus:outline-none focus:ring-0 rounded-r-xl"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="flex flex-col items-center bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group"
              >
                <div className="h-16 w-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <i className={`${category.icon} text-2xl`}></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center group-hover:text-primary-600 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  {category.jobCount} Jobs Available
                </p>
                <div className="mt-4 text-primary-600 hidden group-hover:block transition-all duration-300">
                  <span className="flex items-center">
                    View Jobs 
                    <i className="fas fa-arrow-right ml-2"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/jobs/categories"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              View All Categories
              <i className="fas fa-chevron-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow-lg rounded-lg p-6 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary-100 text-primary-600 mb-4">
                <i className="fas fa-briefcase text-2xl"></i>
              </div>
              <div className="text-4xl font-bold text-primary-600 mb-1">1,000+</div>
              <div className="text-lg font-medium text-gray-600">Active Job Listings</div>
            </div>
            
            <div className="bg-white overflow-hidden shadow-lg rounded-lg p-6 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                <i className="fas fa-building text-2xl"></i>
              </div>
              <div className="text-4xl font-bold text-yellow-600 mb-1">500+</div>
              <div className="text-lg font-medium text-gray-600">Companies</div>
            </div>
            
            <div className="bg-white overflow-hidden shadow-lg rounded-lg p-6 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-green-100 text-green-600 mb-4">
                <i className="fas fa-users text-2xl"></i>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-1">10,000+</div>
              <div className="text-lg font-medium text-gray-600">Registered Job Seekers</div>
            </div>
            
            <div className="bg-white overflow-hidden shadow-lg rounded-lg p-6 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <i className="fas fa-check-circle text-2xl"></i>
              </div>
              <div className="text-4xl font-bold text-indigo-600 mb-1">85%</div>
              <div className="text-lg font-medium text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="bg-white shadow-sm hover:shadow-md rounded-lg border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-5">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center text-purple-600 flex-shrink-0">
                      <i className="fas fa-greater-than"></i>
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
                    <i className="fas fa-map-marker-alt text-gray-400 w-4"></i>
                    <span className="ml-2 text-gray-600 text-sm">Bengaluru</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-briefcase text-gray-400 w-4"></i>
                    <span className="ml-2 text-gray-600 text-sm">Software Development</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-gray-400 w-4"></i>
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
                  <Link to="/jobs/1" className="text-center border border-gray-300 rounded px-4 py-2 text-gray-700 font-medium text-sm flex-1 hover:bg-gray-50">View Details</Link>
                  <Link to="#" className="text-center bg-primary-600 hover:bg-primary-700 rounded px-4 py-2 text-white font-medium text-sm flex-1">Apply Now</Link>
                </div>
              </div>
            </div>

            {/* Capgemini Job */}
            <div className="bg-white shadow-sm hover:shadow-md rounded-lg border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-5">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center text-blue-600 flex-shrink-0">
                      <i className="fas fa-circle"></i>
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
                    <i className="fas fa-map-marker-alt text-gray-400 w-4"></i>
                    <span className="ml-2 text-gray-600 text-sm">Bangalore, Pune</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-briefcase text-gray-400 w-4"></i>
                    <span className="ml-2 text-gray-600 text-sm">DevOps</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-gray-400 w-4"></i>
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
                  <Link to="/jobs/2" className="text-center border border-gray-300 rounded px-4 py-2 text-gray-700 font-medium text-sm flex-1 hover:bg-gray-50">View Details</Link>
                  <Link to="#" className="text-center bg-primary-600 hover:bg-primary-700 rounded px-4 py-2 text-white font-medium text-sm flex-1">Apply Now</Link>
                </div>
              </div>
            </div>

            {/* EY Job */}
            <div className="bg-white shadow-sm hover:shadow-md rounded-lg border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-5">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-100 rounded flex items-center justify-center text-gray-800 font-bold flex-shrink-0">
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
                    <i className="fas fa-map-marker-alt text-gray-400 w-4"></i>
                    <span className="ml-2 text-gray-600 text-sm">India</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-briefcase text-gray-400 w-4"></i>
                    <span className="ml-2 text-gray-600 text-sm">Software Engineer</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-gray-400 w-4"></i>
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
                  <Link to="/jobs/3" className="text-center border border-gray-300 rounded px-4 py-2 text-gray-700 font-medium text-sm flex-1 hover:bg-gray-50">View Details</Link>
                  <Link to="#" className="text-center bg-primary-600 hover:bg-primary-700 rounded px-4 py-2 text-white font-medium text-sm flex-1">Apply Now</Link>
                </div>
              </div>
            </div>

            {/* Google Job */}
            <div className="bg-white shadow-sm hover:shadow-md rounded-lg border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-5">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
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
                    <i className="fas fa-map-marker-alt text-gray-400 w-4"></i>
                    <span className="ml-2 text-gray-600 text-sm">Hyderabad, Telangana, India</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-briefcase text-gray-400 w-4"></i>
                    <span className="ml-2 text-gray-600 text-sm">Software Engineer</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-gray-400 w-4"></i>
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
                  <Link to="/jobs/4" className="text-center border border-gray-300 rounded px-4 py-2 text-gray-700 font-medium text-sm flex-1 hover:bg-gray-50">View Details</Link>
                  <Link to="#" className="text-center bg-primary-600 hover:bg-primary-700 rounded px-4 py-2 text-white font-medium text-sm flex-1">Apply Now</Link>
                </div>
              </div>
            </div>

            {/* Amazon Job */}
            <div className="bg-white shadow-sm hover:shadow-md rounded-lg border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-5">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
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
                    <i className="fas fa-map-marker-alt text-gray-400 w-4"></i>
                    <span className="ml-2 text-gray-600 text-sm">Remote</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-briefcase text-gray-400 w-4"></i>
                    <span className="ml-2 text-gray-600 text-sm">Software Development Engineer</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-gray-400 w-4"></i>
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
                  <Link to="/jobs/5" className="text-center border border-gray-300 rounded px-4 py-2 text-gray-700 font-medium text-sm flex-1 hover:bg-gray-50">View Details</Link>
                  <Link to="#" className="text-center bg-primary-600 hover:bg-primary-700 rounded px-4 py-2 text-white font-medium text-sm flex-1">Apply Now</Link>
                </div>
              </div>
            </div>

            {/* Microsoft Job */}
            <div className="bg-white shadow-sm hover:shadow-md rounded-lg border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-5">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
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
                    <i className="fas fa-map-marker-alt text-gray-400 w-4"></i>
                    <span className="ml-2 text-gray-600 text-sm">India</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-briefcase text-gray-400 w-4"></i>
                    <span className="ml-2 text-gray-600 text-sm">Software Engineer</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-gray-400 w-4"></i>
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
                  <Link to="/jobs/6" className="text-center border border-gray-300 rounded px-4 py-2 text-gray-700 font-medium text-sm flex-1 hover:bg-gray-50">View Details</Link>
                  <Link to="#" className="text-center bg-primary-600 hover:bg-primary-700 rounded px-4 py-2 text-white font-medium text-sm flex-1">Apply Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Top Companies Hiring */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Top Companies Hiring</h2>
            <p className="mt-2 text-lg text-gray-500">Leading employers seeking outstanding talent like you</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-10">
            {/* Company 1 - Google */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300">
              <img src="https://logo.clearbit.com/google.com" alt="Google" className="h-10" />
            </div>
            
            {/* Company 2 - Microsoft */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300">
              <img src="https://logo.clearbit.com/microsoft.com" alt="Microsoft" className="h-10" />
            </div>
            
            {/* Company 3 - Amazon */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300">
              <img src="https://logo.clearbit.com/amazon.com" alt="Amazon" className="h-10" />
            </div>
            
            {/* Company 4 - Apple */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300">
              <img src="https://logo.clearbit.com/apple.com" alt="Apple" className="h-10" />
            </div>
            
            {/* Company 5 - Meta */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300">
              <img src="https://logo.clearbit.com/meta.com" alt="Meta" className="h-10" />
            </div>
            
            {/* Company 6 - Netflix */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300">
              <img src="https://logo.clearbit.com/netflix.com" alt="Netflix" className="h-10" />
            </div>
            
            {/* Company 7 - Adobe */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300">
              <img src="https://logo.clearbit.com/adobe.com" alt="Adobe" className="h-10" />
            </div>
            
            {/* Company 8 - IBM */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300">
              <img src="https://logo.clearbit.com/ibm.com" alt="IBM" className="h-10" />
            </div>
            
            {/* Company 9 - Accenture */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300">
              <img src="https://logo.clearbit.com/accenture.com" alt="Accenture" className="h-10" />
            </div>
            
            {/* Company 10 - Capgemini */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300">
              <img src="https://logo.clearbit.com/capgemini.com" alt="Capgemini" className="h-10" />
            </div>
            
            {/* Company 11 - TCS */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300">
              <img src="https://logo.clearbit.com/tcs.com" alt="TCS" className="h-10" />
            </div>
            
            {/* Company 12 - Infosys */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300">
              <img src="https://logo.clearbit.com/infosys.com" alt="Infosys" className="h-10" />
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/companies" className="text-primary-600 hover:text-primary-800 font-medium flex items-center justify-center">
              View All Companies <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold sm:text-4xl">What Our Users Say</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              Discover how FutureLift has helped professionals find their dream careers
            </p>
          </div>
          
          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
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
              <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
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
              <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
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
            
            <div className="mt-10 flex justify-center">
              <div className="flex space-x-3">
                <button className="w-3 h-3 rounded-full bg-gray-600 focus:outline-none"></button>
                <button className="w-3 h-3 rounded-full bg-primary-500 focus:outline-none"></button>
                <button className="w-3 h-3 rounded-full bg-gray-600 focus:outline-none"></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
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
                  <Link to="/login?signup=true" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-100">
                    Get Started
                  </Link>
                </div>
                <div className="inline-flex rounded-md shadow">
                  <Link to="/about" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-800">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subscription Form */}
          <div className="mt-10 border-t border-primary-600 pt-8">
            <form className="sm:flex" onSubmit={handleSubscribe}>
              <div className="flex-1">
                <label htmlFor="skills" className="sr-only">Your skills</label>
                <input
                  id="skills"
                  name="skills"
                  type="text"
                  required
                  className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-yellow-300 rounded-md"
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
                  className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-yellow-300 rounded-md"
                  placeholder="Enter your email"
                  value={subscription.email}
                  onChange={handleSubscriptionChange}
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-yellow-400"
                >
                  <i className="fas fa-bell mr-2"></i> Subscribe
                </button>
              </div>
            </form>
            {subscribeSuccess && (
              <div className="mt-3 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Success! </strong>
                <span className="block sm:inline">You've been subscribed to job alerts matching your skills.</span>
              </div>
            )}
            <p className="mt-3 text-sm text-gray-300">
              Get personalized job alerts matching your skills sent directly to your inbox. No spam, ever.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
    
    </div>
  );
};

export default HomePage;