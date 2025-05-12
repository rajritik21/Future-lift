import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import CompanyList from '../components/admin/CompanyList';
import CompanyForm from '../components/admin/CompanyForm';

const AdminCompaniesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);

  const handleAddNew = () => {
    setCurrentCompany(null);
    setShowForm(true);
  };

  const handleEdit = (company) => {
    setCurrentCompany(company);
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
    setCurrentCompany(null);
  };

  return (
    <AdminLayout>
      {showForm ? (
        <CompanyForm company={currentCompany} onBack={handleBack} />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Companies</h1>
            <button
              onClick={handleAddNew}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Add New Company
            </button>
          </div>
          <CompanyList onEdit={handleEdit} />
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCompaniesPage; 