import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGovernmentJobs } from '../services/governmentJobService';

const GovernmentJobsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    department: '',
    qualification: '',
    salary: '',
    searchTerm: ''
  });

  // Government departments for filtering
  const departments = [
    'All Departments',
    'Civil Services',
    'Defense Services',
    'Indian Army',
    'Indian Navy',
    'Indian Air Force',
    'Coast Guard',
    'Railways',
    'Banking & Financial Services',
    'Public Sector Banks',
    'RBI',
    'NABARD',
    'SEBI',
    'Education',
    'Kendriya Vidyalayas',
    'Navodaya Vidyalayas',
    'UGC/CBSE/NCERT',
    'Healthcare',
    'AIIMS/ESIC',
    'AYUSH Ministry',
    'Police and Paramilitary',
    'State Police',
    'CRPF/BSF/CISF/ITBP',
    'CBI/NIA/IB',
    'Public Sector Undertakings',
    'Administrative Services',
    'Judiciary',
    'Indian Postal Services',
    'Revenue and Taxation',
    'Municipal & Urban Development',
    'Rural Development',
    'Transport & Highways',
    'Forest & Environment',
    'Agriculture',
    'Telecommunications',
    'Atomic Energy & Space Research',
    'Water Resources',
    'Commerce & Industry',
    'Culture & Tourism',
    'Labour & Employment',
    'Women & Child Development',
    'Social Welfare',
    'Legal Services',
    'Energy & Power Sector',
    'Science & Technology',
    'Disaster Management',
    'Planning & Policy'
  ];

  // Qualification options
  const qualifications = [
    'All Qualifications',
    '10th Pass',
    '12th Pass',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Ph.D',
    'Professional Degree'
  ];

  // Fetch government jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const data = await getGovernmentJobs();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error('Error fetching government jobs:', error);
        // If API fails, we'll have an empty list
        setJobs([]);
        setFilteredJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on selected filters
  useEffect(() => {
    let results = [...jobs];

    // Apply filters
    if (filters.department && filters.department !== 'All Departments') {
      results = results.filter(job => job.department === filters.department);
    }

    if (filters.qualification && filters.qualification !== 'All Qualifications') {
      results = results.filter(job => job.qualification === filters.qualification);
    }

    if (filters.location) {
      results = results.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.salary) {
      // This is a simplified filter - in a real app, you'd have a more sophisticated salary range filter
      results = results.filter(job => job.salary.includes(filters.salary));
    }

    if (filters.searchTerm) {
      results = results.filter(job => 
        job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    setFilteredJobs(results);
  }, [filters, jobs]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the useEffect above through filters.searchTerm
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      location: '',
      department: '',
      qualification: '',
      salary: '',
      searchTerm: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      {/* Hero Section */}
      <div className="bg-primary-700 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl lg:text-6xl">
              Government Jobs
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-primary-100">
              Explore secure and rewarding career opportunities in the public sector
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Find Your Perfect Government Job</h2>
          
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search Term */}
              <div className="lg:col-span-2">
                <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-1">
                  Search Jobs
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="searchTerm"
                    name="searchTerm"
                    value={filters.searchTerm}
                    onChange={handleFilterChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 pl-10"
                    placeholder="Job title, department, keywords..."
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                </div>
              </div>

              {/* Department Filter */}
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={filters.department}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {departments.map((dept, index) => (
                    <option key={index} value={dept === 'All Departments' ? '' : dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Qualification Filter */}
              <div>
                <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1">
                  Qualification
                </label>
                <select
                  id="qualification"
                  name="qualification"
                  value={filters.qualification}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {qualifications.map((qual, index) => (
                    <option key={index} value={qual === 'All Qualifications' ? '' : qual}>
                      {qual}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="City or state"
                />
              </div>

              {/* Action Buttons */}
              <div className="lg:col-span-5 flex justify-between items-end mt-2">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <i className="fas fa-redo mr-2"></i>
                  Reset Filters
                </button>
                
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <i className="fas fa-search mr-2"></i>
                  Find Jobs
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <i className="fas fa-shield-alt text-blue-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-blue-800">Job Security</h3>
                <p className="text-blue-600">Stable employment with retirement benefits</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <i className="fas fa-medkit text-green-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-green-800">Benefits Package</h3>
                <p className="text-green-600">Health coverage and pension plans</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <i className="fas fa-chart-line text-purple-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-purple-800">Career Growth</h3>
                <p className="text-purple-600">Clear paths for advancement and promotions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Available Positions</h2>
            <p className="text-gray-600">Showing {filteredJobs.length} jobs</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <i className="fas fa-search text-5xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredJobs.map(job => (
                <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div className="sm:flex sm:justify-between sm:items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-gray-600 mb-3">{job.department}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <i className="fas fa-rupee-sign text-gray-400 mr-2"></i>
                          {job.salary}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <i className="fas fa-graduation-cap text-gray-400 mr-2"></i>
                          {job.qualification}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <i className="fas fa-users text-gray-400 mr-2"></i>
                          {job.vacancies} vacancies
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          Experience: {job.experienceRequired}
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Apply by: {job.applicationDeadline}
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                          Exam: {job.examDate}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 sm:ml-6 flex sm:flex-col gap-3">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/jobs/${job.id}/apply`}
                        className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Resources */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Prepare for Government Exams</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors duration-300">
              <div className="flex items-center mb-3">
                <div className="bg-primary-100 p-2 rounded-md">
                  <i className="fas fa-book text-primary-600"></i>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Study Materials</h3>
              </div>
              <p className="text-gray-600 mb-3">Access comprehensive study guides and practice papers for various government exams.</p>
              <Link to="/resources/study-materials" className="text-primary-600 font-medium hover:text-primary-700">
                Browse Resources <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors duration-300">
              <div className="flex items-center mb-3">
                <div className="bg-primary-100 p-2 rounded-md">
                  <i className="fas fa-clipboard-list text-primary-600"></i>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Mock Tests</h3>
              </div>
              <p className="text-gray-600 mb-3">Practice with our collection of mock tests designed to simulate actual government exam patterns.</p>
              <Link to="/resources/mock-tests" className="text-primary-600 font-medium hover:text-primary-700">
                Take Tests <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors duration-300">
              <div className="flex items-center mb-3">
                <div className="bg-primary-100 p-2 rounded-md">
                  <i className="fas fa-chalkboard-teacher text-primary-600"></i>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Coaching Services</h3>
              </div>
              <p className="text-gray-600 mb-3">Get personalized coaching from experienced mentors to enhance your preparation.</p>
              <Link to="/resources/coaching" className="text-primary-600 font-medium hover:text-primary-700">
                Learn More <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">How do I apply for government jobs?</h3>
              <p className="text-gray-600">Most government jobs require you to apply through the official website of the respective department or organization. You may need to register on the portal, fill out an application form, upload required documents, and pay an application fee if applicable.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">What are the common eligibility criteria for government jobs?</h3>
              <p className="text-gray-600">Eligibility criteria typically include age limits, educational qualifications, physical fitness standards (for certain roles), and nationality requirements. Specific criteria vary based on the position and department.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">How long does the selection process take?</h3>
              <p className="text-gray-600">The selection process for government jobs can take several months to complete. It generally involves multiple stages including written exams, interviews, document verification, and medical examinations.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Are there reservations in government jobs?</h3>
              <p className="text-gray-600">Yes, the government provides reservations for certain categories as per constitutional provisions and government policies. These include reservations for Scheduled Castes (SC), Scheduled Tribes (ST), Other Backward Classes (OBC), Economically Weaker Sections (EWS), and Persons with Disabilities (PwD).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentJobsPage; 