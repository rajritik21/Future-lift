import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const GovernmentJobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/government-jobs/${id}`);
        setJob(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching government job details:', err);
        setError('Failed to load job details. Please try again later.');
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
        <Link to="/jobs/government" className="text-primary-600 hover:underline">
          &larr; Back to Government Jobs
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>Job not found</p>
        </div>
        <Link to="/jobs/government" className="text-primary-600 hover:underline">
          &larr; Back to Government Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <Link to="/jobs/government" className="text-primary-600 hover:underline mb-6 inline-block">
          &larr; Back to Government Jobs
        </Link>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-lg text-gray-600 mt-2">{job.department}</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Details</h3>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-700">
                    <span className="font-medium w-32">Location:</span> 
                    <span>{job.location}</span>
                  </p>
                  <p className="flex items-center text-gray-700">
                    <span className="font-medium w-32">Vacancies:</span> 
                    <span>{job.vacancies}</span>
                  </p>
                  <p className="flex items-center text-gray-700">
                    <span className="font-medium w-32">Salary:</span> 
                    <span>{job.salary}</span>
                  </p>
                  <p className="flex items-center text-gray-700">
                    <span className="font-medium w-32">Type:</span> 
                    <span>{job.jobType}</span>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Dates</h3>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-700">
                    <span className="font-medium w-32">Posted On:</span> 
                    <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                  </p>
                  <p className="flex items-center text-gray-700">
                    <span className="font-medium w-32">Last Date:</span> 
                    <span>{new Date(job.lastDate).toLocaleDateString()}</span>
                  </p>
                  <p className="flex items-center text-gray-700">
                    <span className="font-medium w-32">Exam Date:</span> 
                    <span>{job.examDate ? new Date(job.examDate).toLocaleDateString() : 'To be announced'}</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <div className="prose max-w-none">
                <p className="text-gray-700">{job.description}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Qualifications</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {job.qualifications && job.qualifications.map((qualification, index) => (
                  <li key={index}>{qualification}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Apply</h3>
              <div className="prose max-w-none">
                <p className="text-gray-700">{job.applicationProcess}</p>
              </div>
            </div>
            
            <div className="mt-8">
              <a 
                href={job.applyLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentJobDetailPage; 