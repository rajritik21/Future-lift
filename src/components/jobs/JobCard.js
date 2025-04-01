import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {job.company && job.company.logo ? (
              <img
                className="h-12 w-12 object-contain rounded"
                src={job.company.logo}
                alt={job.company.name}
              />
            ) : (
              <div className="h-12 w-12 bg-primary-100 rounded flex items-center justify-center text-primary-700 font-bold text-xl">
                {job.company && job.company.name ? job.company.name.charAt(0) : 'C'}
              </div>
            )}
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{job.title}</h3>
              <p className="text-sm text-gray-600">
                {job.company ? job.company.name : 'Company Name'}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
              {job.jobType}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              {job.date ? formatDistanceToNow(new Date(job.date), { addSuffix: true }) : 'Recently posted'}
            </span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <svg
              className="h-5 w-5 mr-2 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="text-sm">{job.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg
              className="h-5 w-5 mr-2 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <span className="text-sm">{job.category}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg
              className="h-5 w-5 mr-2 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span className="text-sm">{job.experience}</span>
          </div>
          
          {job.salary && (
            <div className="flex items-center text-gray-600">
              <svg
                className="h-5 w-5 mr-2 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-sm">{job.salary}</span>
            </div>
          )}
        </div>

        <div className="mt-2">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {job.skills && job.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
            {job.skills && job.skills.length > 4 && (
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <Link
            to={`/jobs/${job._id}`}
            className="text-primary-600 hover:text-primary-800 text-sm font-medium"
          >
            View Details
          </Link>
          <Link
            to={`/jobs/${job._id}/apply`}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard; 