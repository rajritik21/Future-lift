import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import InternshipList from '../components/admin/InternshipList';
import InternshipForm from '../components/admin/InternshipForm';

const AdminInternshipsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentInternship, setCurrentInternship] = useState(null);

  const handleAddNew = () => {
    setCurrentInternship(null);
    setShowForm(true);
  };

  const handleEdit = (internship) => {
    setCurrentInternship(internship);
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
    setCurrentInternship(null);
  };

  return (
    <AdminLayout>
      {showForm ? (
        <InternshipForm internship={currentInternship} onBack={handleBack} />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Internships</h1>
            <button
              onClick={handleAddNew}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Add New Internship
            </button>
          </div>
          <InternshipList onEdit={handleEdit} />
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminInternshipsPage; 