import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import JobList from '../components/admin/JobList';
import JobForm from '../components/admin/JobForm';

const AdminJobsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  const handleAddNew = () => {
    setCurrentJob(null);
    setShowForm(true);
  };

  const handleEdit = (job) => {
    setCurrentJob(job);
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
    setCurrentJob(null);
  };

  return (
    <AdminLayout>
      {showForm ? (
        <JobForm job={currentJob} onBack={handleBack} />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Jobs</h1>
            <button
              onClick={handleAddNew}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Add New Job
            </button>
          </div>
          <JobList onEdit={handleEdit} />
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminJobsPage; 