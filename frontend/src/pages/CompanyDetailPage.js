import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CompanyDetailPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // In a real app, this would be an API call
    // For this demo, we'll use mock data
    const fetchCompanyData = () => {
      setLoading(true);
      
      // Mock company data
      const mockCompany = {
        id: parseInt(id),
        name: 'Accenture',
        logo: 'https://logo.clearbit.com/accenture.com',
        coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        industry: 'Information Technology',
        location: 'Global',
        website: 'https://www.accenture.com',
        founded: '1989',
        size: '10,000+ employees',
        description: "Accenture is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries, we offer Strategy and Consulting, Interactive, Technology and Operations services — all powered by the world's largest network of Advanced Technology and Intelligent Operations centers.",
        mission: 'To deliver on the promise of technology and human ingenuity.',
        culture: "Accenture's culture is grounded in our core values, particularly respect for the individual, best people, client value creation, one global network, integrity, and stewardship.",
        benefits: [
          'Flexible working arrangements',
          'Comprehensive health and wellness programs',
          'Professional development and learning opportunities',
          'Inclusive and diverse workplace',
          'Competitive compensation and bonuses',
          'Retirement and financial planning support'
        ],
        rating: 4.2,
        reviews: [
          {
            id: 1,
            author: 'Former Employee',
            position: 'Software Engineer',
            date: '2023-02-15',
            rating: 4,
            pros: 'Good work-life balance, flexible work arrangement, competitive salary, good learning opportunities.',
            cons: 'Career growth can be slow depending on project assignment, some bureaucracy in larger projects.'
          },
          {
            id: 2,
            author: 'Current Employee',
            position: 'Project Manager',
            date: '2023-03-10',
            rating: 5,
            pros: 'Great culture, supportive management, excellent benefits, opportunity to work with cutting-edge technologies.',
            cons: 'Sometimes long working hours during critical project phases.'
          },
          {
            id: 3,
            author: 'Former Employee',
            position: 'Business Analyst',
            date: '2023-01-22',
            rating: 4,
            pros: 'Strong learning culture, great colleagues, diverse project experience.',
            cons: 'Occasional high pressure to meet client expectations, bench time between projects.'
          }
        ],
        socialMedia: {
          linkedin: 'https://www.linkedin.com/company/accenture',
          twitter: 'https://twitter.com/Accenture',
          facebook: 'https://www.facebook.com/accenture',
          instagram: 'https://www.instagram.com/accenture'
        }
      };
      
      // Mock jobs data
      const mockJobs = [
        {
          id: 101,
          title: 'Senior Software Engineer',
          location: 'Bangalore, India',
          type: 'Full-time',
          category: 'Information Technology',
          date: '2023-04-15',
          salary: '₹20-25 LPA',
          description: 'We are looking for a Senior Software Engineer to join our team...',
          requirements: ['5+ years experience in Java or similar technologies', 'Strong problem-solving skills', 'Experience with cloud platforms']
        },
        {
          id: 102,
          title: 'Cloud Solutions Architect',
          location: 'Hyderabad, India',
          type: 'Full-time',
          category: 'Cloud Computing',
          date: '2023-04-10',
          salary: '₹30-35 LPA',
          description: 'As a Cloud Solutions Architect, you will design and implement...',
          requirements: ['Experience with AWS, Azure, or GCP', 'Background in distributed systems', 'Strong communication skills']
        },
        {
          id: 103,
          title: 'Data Scientist',
          location: 'Remote',
          type: 'Full-time',
          category: 'Data Science',
          date: '2023-04-05',
          salary: '₹18-22 LPA',
          description: 'We are seeking a Data Scientist to help extract insights from our data...',
          requirements: ['ML/AI experience', 'Python and SQL proficiency', 'Statistics knowledge']
        },
        {
          id: 104,
          title: 'UX/UI Designer',
          location: 'Mumbai, India',
          type: 'Full-time',
          category: 'Design',
          date: '2023-04-01',
          salary: '₹15-20 LPA',
          description: 'Join our design team to create beautiful, intuitive interfaces...',
          requirements: ['Portfolio demonstrating UX/UI skills', 'Experience with design tools', 'User research experience']
        }
      ];
      
      setCompany(mockCompany);
      setJobs(mockJobs);
      setLoading(false);
    };
    
    fetchCompanyData();
  }, [id]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return (
      <div className="pt-16 flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="pt-16 flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <i className="fas fa-building text-gray-300 text-6xl mb-4"></i>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Company Not Found</h2>
        <p className="text-gray-600 mb-6">The company you're looking for doesn't exist or has been removed.</p>
        <Link to="/companies" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md transition-colors duration-300">
          Back to Companies
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      {/* Cover Image and Company Info */}
      <div className="relative">
        <div className="h-64 w-full bg-cover bg-center" style={{ backgroundImage: `url('${company.coverImage}')` }}>
          <div className="absolute inset-0 bg-primary-800 opacity-50"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-24 sm:-mt-32 flex flex-col sm:flex-row items-start sm:items-end space-y-6 sm:space-y-0 sm:space-x-6">
            <div className="flex-shrink-0 w-36 h-36 rounded-lg shadow-xl bg-white p-3 border border-gray-200">
              <img
                src={company.logo}
                alt={company.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=4f46e5&color=fff&size=140`;
                }}
              />
            </div>
            <div className="flex-1">
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                    <div className="mt-2 flex flex-wrap items-center text-sm text-gray-600">
                      <span className="flex items-center mr-6 mb-2">
                        <i className="fas fa-industry mr-1 text-gray-400"></i>
                        {company.industry}
                      </span>
                      <span className="flex items-center mr-6 mb-2">
                        <i className="fas fa-map-marker-alt mr-1 text-gray-400"></i>
                        {company.location}
                      </span>
                      <span className="flex items-center mr-6 mb-2">
                        <i className="fas fa-users mr-1 text-gray-400"></i>
                        {company.size}
                      </span>
                      <span className="flex items-center mr-6 mb-2">
                        <i className="fas fa-star mr-1 text-yellow-400"></i>
                        {company.rating} Rating
                      </span>
                      <span className="flex items-center mb-2">
                        <i className="fas fa-calendar-alt mr-1 text-gray-400"></i>
                        Founded: {company.founded}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <i className="fas fa-globe mr-2"></i>
                      Website
                    </a>
                    <Link
                      to={`/jobs?company=${company.id}`}
                      className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                    >
                      <i className="fas fa-briefcase mr-2"></i>
                      View Jobs ({jobs.length})
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6 overflow-x-auto">
            <button
              onClick={() => handleTabChange('overview')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => handleTabChange('jobs')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'jobs'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Open Positions ({jobs.length})
            </button>
            <button
              onClick={() => handleTabChange('reviews')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews ({company.reviews.length})
            </button>
            <button
              onClick={() => handleTabChange('benefits')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'benefits'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Benefits
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">About {company.name}</h2>
                <p className="text-gray-600 whitespace-pre-line">{company.description}</p>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Mission & Vision</h2>
                <p className="text-gray-600">{company.mission}</p>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Culture</h2>
                <p className="text-gray-600">{company.culture}</p>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Company Information</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-building mt-1 w-5 text-gray-400"></i>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-500">Industry</div>
                      <div className="text-gray-900">{company.industry}</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-map-marker-alt mt-1 w-5 text-gray-400"></i>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-500">Headquarters</div>
                      <div className="text-gray-900">{company.location}</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-users mt-1 w-5 text-gray-400"></i>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-500">Company Size</div>
                      <div className="text-gray-900">{company.size}</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-calendar-alt mt-1 w-5 text-gray-400"></i>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-500">Founded</div>
                      <div className="text-gray-900">{company.founded}</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-globe mt-1 w-5 text-gray-400"></i>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-500">Website</div>
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-800"
                      >
                        {company.website}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Connect</h2>
                <div className="flex space-x-4">
                  {company.socialMedia.linkedin && (
                    <a 
                      href={company.socialMedia.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-600"
                    >
                      <i className="fab fa-linkedin text-2xl"></i>
                    </a>
                  )}
                  {company.socialMedia.twitter && (
                    <a 
                      href={company.socialMedia.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-600"
                    >
                      <i className="fab fa-twitter text-2xl"></i>
                    </a>
                  )}
                  {company.socialMedia.facebook && (
                    <a 
                      href={company.socialMedia.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-600"
                    >
                      <i className="fab fa-facebook text-2xl"></i>
                    </a>
                  )}
                  {company.socialMedia.instagram && (
                    <a 
                      href={company.socialMedia.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-600"
                    >
                      <i className="fab fa-instagram text-2xl"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-medium text-gray-900">Open Positions at {company.name}</h2>
              <p className="mt-1 text-gray-600">
                Discover job opportunities and join our team!
              </p>
            </div>
            
            <div className="space-y-4">
              {jobs.map((job) => (
                <div 
                  key={job.id} 
                  className="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        <Link to={`/jobs/${job.id}`} className="hover:text-primary-600">
                          {job.title}
                        </Link>
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500">
                        <span className="flex items-center mr-4 mb-2 md:mb-0">
                          <i className="fas fa-map-marker-alt mr-1"></i>
                          {job.location}
                        </span>
                        <span className="flex items-center mr-4 mb-2 md:mb-0">
                          <i className="fas fa-briefcase mr-1"></i>
                          {job.type}
                        </span>
                        <span className="flex items-center mr-4 mb-2 md:mb-0">
                          <i className="fas fa-folder mr-1"></i>
                          {job.category}
                        </span>
                        <span className="flex items-center mb-2 md:mb-0">
                          <i className="fas fa-money-bill-wave mr-1"></i>
                          {job.salary}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-medium text-gray-900">Employee Reviews</h2>
                <p className="mt-1 text-gray-600">
                  What employees are saying about working at {company.name}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="flex items-center text-2xl font-bold text-gray-900 mr-4">
                  {company.rating}
                  <span className="ml-1 text-yellow-400">
                    <i className="fas fa-star"></i>
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Based on {company.reviews.length} reviews
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {company.reviews.map((review) => (
                <div key={review.id} className="bg-white shadow-sm rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{review.author}</h3>
                      <p className="text-sm text-gray-500">{review.position}</p>
                    </div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                  <div className="flex items-center mb-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <i
                        key={index}
                        className={`fas fa-star ${
                          index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      ></i>
                    ))}
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Pros</h4>
                    <p className="text-sm text-gray-600">{review.pros}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Cons</h4>
                    <p className="text-sm text-gray-600">{review.cons}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benefits Tab */}
        {activeTab === 'benefits' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-medium text-gray-900">Benefits & Perks</h2>
              <p className="mt-1 text-gray-600">
                Why employees love working at {company.name}
              </p>
            </div>
            
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {company.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-100 text-primary-600">
                        <i className="fas fa-check"></i>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-gray-900">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Similar Companies Section */}
      <section className="bg-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-6">Similar Companies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['IBM', 'TCS', 'Infosys', 'Wipro'].map((companyName, index) => (
              <Link 
                key={index}
                to={`/companies/${index + 1}`} 
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <div className="p-4 flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                    <img 
                      src={`https://logo.clearbit.com/${companyName.toLowerCase()}.com`}
                      alt={companyName}
                      className="max-h-10 max-w-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${companyName}&background=4f46e5&color=fff`;
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{companyName}</h3>
                    <p className="text-xs text-gray-500">Information Technology</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyDetailPage; 