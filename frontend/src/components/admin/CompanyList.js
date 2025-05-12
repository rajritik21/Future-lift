import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const CompanyList = ({ companies, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
      case 'industry':
        return a.industry.localeCompare(b.industry);
      case 'location':
        return a.location.localeCompare(b.location);
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  // Generate star rating display
  const renderStarRating = (rating) => {
    const ratingValue = parseFloat(rating) || 0;
    return (
      <div className="flex items-center">
        <span className="text-yellow-400 mr-1 font-medium">{ratingValue.toFixed(1)}</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg 
              key={star} 
              className={`h-4 w-4 ${star <= Math.round(ratingValue) ? 'text-yellow-400' : 'text-gray-300'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={handleSort}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">By Name</option>
                <option value="rating">By Rating</option>
                <option value="industry">By Industry</option>
                <option value="location">By Location</option>
              </select>
            </div>
            <div className="flex items-center justify-end">
              <div className="bg-gray-100 p-1 rounded-md flex space-x-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
                  title="Grid view"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
                  title="List view"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {filteredCompanies.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            Showing {filteredCompanies.length} of {companies.length} companies
          </div>
        )}
      </div>

      {sortedCompanies.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M3 7h18" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No companies found</h3>
          <p className="mt-1 text-gray-500">Start by adding a new company or try a different search.</p>
        </div>
      ) : viewMode === 'grid' ? (
        // Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCompanies.map((company) => (
            <div
              key={company._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-5">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden border border-gray-200 mr-4">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/80?text=' + company.name.charAt(0);
                        }}
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-400">{company.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                    <p className="text-sm text-gray-600">{company.industry}</p>
                  </div>
                </div>
                
                <p className="mt-4 text-sm text-gray-600 line-clamp-3">
                  {company.description || `${company.name} is a company in the ${company.industry} industry.`}
                </p>
                
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <svg className="h-5 w-5 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{company.location}</span>
                </div>
                
                {company.employeeCount && (
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg className="h-5 w-5 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>{company.employeeCount} employees</span>
                  </div>
                )}
                
                <div className="mt-4 flex items-center justify-between">
                  {company.rating ? (
                    renderStarRating(company.rating)
                  ) : (
                    <div></div>
                  )}
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onEdit(company)}
                      className="text-primary-600 hover:text-primary-900 p-1"
                      title="Edit company"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(company._id)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete company"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
                      company.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {company.isActive ? 'Active' : 'Inactive'}
                  </span>
                  
                  {company.foundedYear && (
                    <div className="text-xs text-gray-500">
                      Founded: {company.foundedYear}
                    </div>
                  )}
                </div>
                
                {company.website && (
                  <div className="mt-4 flex justify-end">
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
                    >
                      <span>View Company</span>
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View
        <div className="space-y-4">
          {sortedCompanies.map((company) => (
            <div
              key={company._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden border border-gray-200">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/80?text=' + company.name.charAt(0);
                        }}
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-400">{company.name.charAt(0)}</span>
                    )}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900">{company.name}</h3>
                        {company.rating && (
                          <div className="ml-3">{renderStarRating(company.rating)}</div>
                        )}
                      </div>
                      <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {company.location}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M3 7h18"
                            />
                          </svg>
                          {company.industry}
                        </div>
                        {company.employeeCount && (
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            {company.employeeCount} employees
                          </div>
                        )}
                        {company.foundedYear && (
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            Founded: {company.foundedYear}
                          </div>
                        )}
                      </div>
                      {company.website && (
                        <div className="mt-2">
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:text-primary-700"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          company.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {company.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        Added {formatDistanceToNow(new Date(company.date), { addSuffix: true })}
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <button
                          onClick={() => onEdit(company)}
                          className="inline-flex items-center px-3 py-1 border border-primary-300 text-sm font-medium rounded text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(company._id)}
                          className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  {company.description && (
                    <div className="mt-2 text-sm text-gray-500">
                      <p className="line-clamp-2">{company.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyList; 