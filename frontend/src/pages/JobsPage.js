import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    // In a real app, this would be an API call with filters
    const fetchJobs = () => {
      setLoading(true);
      
      // Mock job data
      setTimeout(() => {
        const mockJobs = [
          {
            id: 1,
            title: 'Senior Software Engineer',
            company: {
              id: 1,
              name: 'Accenture',
              logo: 'https://logo.clearbit.com/accenture.com',
            },
            location: 'Bengaluru, India',
            jobType: 'Full-time',
            experience: '5+ years',
            salary: '₹20-25 LPA',
            skills: ['Java', 'Spring Boot', 'Microservices'],
            postedDate: new Date(2023, 3, 15),
            isRemote: false,
            isFeatured: true
          },
          {
            id: 2,
            title: 'DevOps Engineer',
            company: {
              id: 2,
              name: 'Microsoft',
              logo: 'https://logo.clearbit.com/microsoft.com',
            },
            location: 'Hyderabad, India',
            jobType: 'Full-time',
            experience: '3-5 years',
            salary: '₹18-22 LPA',
            skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
            postedDate: new Date(2023, 3, 16),
            isRemote: false,
            isFeatured: false
          },
          {
            id: 3,
            title: 'Frontend Developer',
            company: {
              id: 3,
              name: 'Google',
              logo: 'https://logo.clearbit.com/google.com',
            },
            location: 'Remote',
            jobType: 'Contract',
            experience: '2-4 years',
            salary: '₹15-18 LPA',
            skills: ['React', 'JavaScript', 'CSS', 'HTML'],
            postedDate: new Date(2023, 3, 14),
            isRemote: true,
            isFeatured: true
          },
          {
            id: 4,
            title: 'Data Scientist',
            company: {
              id: 4,
              name: 'Amazon',
              logo: 'https://logo.clearbit.com/amazon.com',
            },
            location: 'Delhi NCR, India',
            jobType: 'Full-time',
            experience: '4-6 years',
            salary: '₹22-28 LPA',
            skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
            postedDate: new Date(2023, 3, 12),
            isRemote: false,
            isFeatured: false
          },
          {
            id: 5,
            title: 'UX/UI Designer',
            company: {
              id: 5,
              name: 'Wipro',
              logo: 'https://logo.clearbit.com/wipro.com',
            },
            location: 'Pune, India',
            jobType: 'Full-time',
            experience: '2-5 years',
            salary: '₹12-18 LPA',
            skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
            postedDate: new Date(2023, 3, 10),
            isRemote: false,
            isFeatured: false
          },
          {
            id: 6,
            title: 'Project Manager',
            company: {
              id: 6,
              name: 'TCS',
              logo: 'https://logo.clearbit.com/tcs.com',
            },
            location: 'Chennai, India',
            jobType: 'Full-time',
            experience: '7+ years',
            salary: '₹25-35 LPA',
            skills: ['Agile', 'Scrum', 'JIRA', 'Stakeholder Management'],
            postedDate: new Date(2023, 3, 9),
            isRemote: false,
            isFeatured: true
          },
          {
            id: 7,
            title: 'Backend Developer',
            company: {
              id: 7,
              name: 'Infosys',
              logo: 'https://logo.clearbit.com/infosys.com',
            },
            location: 'Remote',
            jobType: 'Part-time',
            experience: '1-3 years',
            salary: '₹10-15 LPA',
            skills: ['Node.js', 'Express', 'MongoDB', 'API Design'],
            postedDate: new Date(2023, 3, 8),
            isRemote: true,
            isFeatured: false
          },
          {
            id: 8,
            title: 'Mobile App Developer',
            company: {
              id: 8,
              name: 'IBM',
              logo: 'https://logo.clearbit.com/ibm.com',
            },
            location: 'Mumbai, India',
            jobType: 'Full-time',
            experience: '3-6 years',
            salary: '₹18-25 LPA',
            skills: ['React Native', 'Flutter', 'iOS', 'Android'],
            postedDate: new Date(2023, 3, 7),
            isRemote: false,
            isFeatured: false
          }
        ];
        
        setJobs(mockJobs);
        setLoading(false);
      }, 1000);
    };
    
    fetchJobs();
  }, []);

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = selectedLocation === '' || 
                           (selectedLocation === 'Remote' ? job.isRemote : 
                           job.location.includes(selectedLocation));
    
    const matchesJobType = selectedJobType === '' || job.jobType === selectedJobType;
    
    const matchesExperience = selectedExperience === '' || 
                             (selectedExperience === 'entry' && job.experience.includes('1-')) ||
                             (selectedExperience === 'mid' && (job.experience.includes('2-') || job.experience.includes('3-') || job.experience.includes('4-'))) ||
                             (selectedExperience === 'senior' && (job.experience.includes('5+') || job.experience.includes('7+')));
    
    return matchesSearch && matchesLocation && matchesJobType && matchesExperience;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.postedDate) - new Date(a.postedDate);
    } else if (sortBy === 'oldest') {
      return new Date(a.postedDate) - new Date(b.postedDate);
    } else if (sortBy === 'salary_high') {
      const aSalary = parseInt(a.salary.replace(/[^\d]/g, ''));
      const bSalary = parseInt(b.salary.replace(/[^\d]/g, ''));
      return bSalary - aSalary;
    } else if (sortBy === 'salary_low') {
      const aSalary = parseInt(a.salary.replace(/[^\d]/g, ''));
      const bSalary = parseInt(b.salary.replace(/[^\d]/g, ''));
      return aSalary - bSalary;
    }
    return 0;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleJobTypeChange = (e) => {
    setSelectedJobType(e.target.value);
  };

  const handleExperienceChange = (e) => {
    setSelectedExperience(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedJobType('');
    setSelectedExperience('');
    setSortBy('newest');
  };

  const locations = ['Bengaluru', 'Chennai', 'Delhi NCR', 'Hyderabad', 'Mumbai', 'Pune', 'Remote'];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const experiences = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (2-5 years)' },
    { value: 'senior', label: 'Senior Level (5+ years)' }
  ];

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-primary-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">
              Find Your Dream Job
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-200">
              Discover the latest job opportunities matching your skills and career goals
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-1 md:col-span-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Search jobs by title, company, or skills..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                id="location"
                name="location"
                value={selectedLocation}
                onChange={handleLocationChange}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <select
                id="jobType"
                name="jobType"
                value={selectedJobType}
                onChange={handleJobTypeChange}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">All Types</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level
              </label>
              <select
                id="experience"
                name="experience"
                value={selectedExperience}
                onChange={handleExperienceChange}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">All Levels</option>
                {experiences.map((exp) => (
                  <option key={exp.value} value={exp.value}>{exp.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sortBy"
                name="sortBy"
                value={sortBy}
                onChange={handleSortChange}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="salary_high">Highest Salary</option>
                <option value="salary_low">Lowest Salary</option>
              </select>
            </div>
          </div>
          {(searchTerm || selectedLocation || selectedJobType || selectedExperience || sortBy !== 'newest') && (
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-800"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Jobs Section */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">
              {filteredJobs.length > 0 ? (
                searchTerm || selectedLocation || selectedJobType || selectedExperience ? 
                  'Search Results' : 'All Jobs'
              ) : 'No Jobs Found'}
            </h2>
            
            {loading ? (
              <div className="grid grid-cols-1 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white shadow-sm rounded-lg p-6 animate-pulse">
                    <div className="flex items-center">
                      <div className="rounded-md bg-gray-200 h-12 w-12"></div>
                      <div className="ml-4 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="h-8 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="h-3 bg-gray-200 rounded col-span-1"></div>
                      <div className="h-3 bg-gray-200 rounded col-span-1"></div>
                    </div>
                    <div className="mt-4 h-3 bg-gray-200 rounded w-full"></div>
                    <div className="mt-2 h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {sortedJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`bg-white shadow-sm rounded-lg border ${
                      job.isFeatured ? 'border-yellow-300' : 'border-gray-100'
                    } hover:shadow-md transition-shadow duration-300`}
                  >
                    {job.isFeatured && (
                      <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 rounded-t-lg">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <i className="fas fa-star text-yellow-500 mr-1"></i>
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200 overflow-hidden">
                            <img
                              src={job.company.logo}
                              alt={job.company.name}
                              className="h-10 w-10 object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${job.company.name}&background=4f46e5&color=fff`;
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">
                              <Link to={`/jobs/${job.id}`} className="hover:text-primary-600">
                                {job.title}
                              </Link>
                            </h3>
                            <div className="mt-1 flex items-center">
                              <Link to={`/companies/${job.company.id}`} className="text-sm text-gray-500 hover:text-primary-600">
                                {job.company.name}
                              </Link>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-500">
                                Posted {formatDistanceToNow(job.postedDate, { addSuffix: true })}
                              </span>
                            </div>
                          </div>
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
                      
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <i className="fas fa-map-marker-alt w-5 h-5 mr-1 text-gray-400"></i>
                          {job.location}
                          {job.isRemote && <span className="ml-1 text-primary-600">(Remote)</span>}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <i className="fas fa-briefcase w-5 h-5 mr-1 text-gray-400"></i>
                          {job.jobType}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <i className="fas fa-money-bill-wave w-5 h-5 mr-1 text-gray-400"></i>
                          {job.salary}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <i className="fas fa-search text-gray-300 text-5xl mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter criteria to find more job opportunities.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage; 