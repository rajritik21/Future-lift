import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industry, setIndustry] = useState('all');

  const companiesData = [
    {
      id: 1,
      name: 'Accenture',
      logo: 'https://logo.clearbit.com/accenture.com',
      industry: 'Information Technology',
      location: 'Global',
      description: 'Accenture is a global professional services company with leading capabilities in digital, cloud and security.',
      jobCount: 35,
      rating: 4.2,
    },
    {
      id: 2,
      name: 'Microsoft',
      logo: 'https://logo.clearbit.com/microsoft.com',
      industry: 'Software',
      location: 'Global',
      description: 'Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington.',
      jobCount: 28,
      rating: 4.5,
    },
    {
      id: 3,
      name: 'Google',
      logo: 'https://logo.clearbit.com/google.com',
      industry: 'Software',
      location: 'Global',
      description: 'Google LLC is an American multinational technology company that specializes in Internet-related services and products.',
      jobCount: 22,
      rating: 4.6,
    },
    {
      id: 4,
      name: 'TCS',
      logo: 'https://logo.clearbit.com/tcs.com',
      industry: 'Information Technology',
      location: 'Global',
      description: 'Tata Consultancy Services is an Indian multinational information technology services and consulting company.',
      jobCount: 41,
      rating: 4.0,
    },
    {
      id: 5,
      name: 'Infosys',
      logo: 'https://logo.clearbit.com/infosys.com',
      industry: 'Information Technology',
      location: 'Global',
      description: 'Infosys Limited is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.',
      jobCount: 37,
      rating: 3.9,
    },
    {
      id: 6,
      name: 'Wipro',
      logo: 'https://logo.clearbit.com/wipro.com',
      industry: 'Information Technology',
      location: 'Global',
      description: 'Wipro Limited is an Indian multinational corporation that provides information technology, consulting and business process services.',
      jobCount: 33,
      rating: 3.8,
    },
    {
      id: 7,
      name: 'Amazon',
      logo: 'https://logo.clearbit.com/amazon.com',
      industry: 'E-commerce',
      location: 'Global',
      description: 'Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
      jobCount: 25,
      rating: 4.3,
    },
    {
      id: 8,
      name: 'IBM',
      logo: 'https://logo.clearbit.com/ibm.com',
      industry: 'Information Technology',
      location: 'Global',
      description: 'IBM is an American multinational technology company headquartered in Armonk, New York, with operations in over 170 countries.',
      jobCount: 30,
      rating: 4.1,
    },
  ];

  const industries = ['all', 'Information Technology', 'Software', 'E-commerce', 'Finance', 'Healthcare'];

  // Filter companies based on search term and industry
  const filteredCompanies = companiesData.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industry === 'all' || company.industry === industry;
    return matchesSearch && matchesIndustry;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleIndustryChange = (e) => {
    setIndustry(e.target.value);
  };

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <section className="bg-primary-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">
              Top Companies Hiring Now
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-200">
              Discover great places to work and find your next career opportunity
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="w-full md:w-auto">
              <select
                value={industry}
                onChange={handleIndustryChange}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind === 'all' ? 'All Industries' : ind}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Link 
              to={`/companies/${company.id}`} 
              key={company.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden mr-4">
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="max-h-12 max-w-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=4f46e5&color=fff`;
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.industry}</p>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{company.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <i className="fas fa-map-marker-alt w-5 h-5 mr-1 text-gray-400"></i>
                  {company.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <i className="fas fa-briefcase w-5 h-5 mr-1 text-gray-400"></i>
                  {company.jobCount} Jobs Available
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fas fa-star text-yellow-400 mr-1"></i>
                  <span className="text-sm font-medium text-gray-600">{company.rating}</span>
                </div>
                <span className="text-primary-600 text-sm font-medium flex items-center">
                  View Company
                  <i className="fas fa-arrow-right ml-2"></i>
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredCompanies.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <i className="fas fa-building text-gray-300 text-5xl mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </section>

      <section className="bg-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Companies Choose FutureLift</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Join hundreds of employers who trust FutureLift for their hiring needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <i className="fas fa-users text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quality Candidates</h3>
              <p className="text-gray-500">Access a pool of pre-screened, qualified candidates for your specific industry needs.</p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <i className="fas fa-bolt text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Fast Hiring</h3>
              <p className="text-gray-500">Our efficient platform helps you find the right talent quickly, reducing time-to-hire.</p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <i className="fas fa-chart-line text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics & Insights</h3>
              <p className="text-gray-500">Get detailed analytics on your job postings and candidate engagement metrics.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/employers/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              Get Started as an Employer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompaniesPage; 