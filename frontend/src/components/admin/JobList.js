import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const JobList = ({ jobs = [], onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const jobsArray = Array.isArray(jobs) ? jobs : [];

  const filteredJobs = jobsArray.filter(
    (job) =>
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date || 0) - new Date(a.date || 0);
      case 'oldest':
        return new Date(a.date || 0) - new Date(b.date || 0);
      case 'title':
        return (a.title || '').localeCompare(b.title || '');
      case 'company':
        return (a.company?.name || '').localeCompare(b.company?.name || '');
      case 'location':
        return (a.location || '').localeCompare(b.location || '');
      default:
        return new Date(b.date || 0) - new Date(a.date || 0);
    }
  });

  return (
    <div>
      <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="w-full md:w-1/4">
          <select
            value={sortBy}
            onChange={handleSort}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">By Title</option>
            <option value="company">By Company</option>
            <option value="location">By Location</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Job
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date Posted
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedJobs.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  {searchTerm
                    ? 'No jobs match your search. Try different keywords.'
                    : 'No jobs found.'}
                </td>
              </tr>
            ) : (
              sortedJobs.map((job) => (
                <tr key={job._id || `job-${Math.random()}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {job.company?.logo ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={job.company.logo}
                            alt={job.company.name || 'Company'}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                            {job.company?.name ? job.company.name.charAt(0) : 'C'}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {job.title || 'Untitled Job'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {job.company?.name || 'Unknown Company'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{job.category || 'Uncategorized'}</div>
                    <div className="text-sm text-gray-500">{job.jobType || 'Not specified'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{job.location || 'Not specified'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.date
                      ? formatDistanceToNow(new Date(job.date), {
                          addSuffix: true,
                        })
                      : 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        job.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {job.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit && onEdit(job)}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(job._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList; 