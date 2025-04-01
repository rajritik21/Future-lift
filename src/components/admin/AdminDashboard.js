import React, { useState, useEffect } from 'react';
import JobForm from './JobForm';
import JobList from './JobList';
import InternshipForm from './InternshipForm';
import InternshipList from './InternshipList';
import CompanyForm from './CompanyForm';
import CompanyList from './CompanyList';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';

const AdminDashboard = ({ user }) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('jobs');
  
  // Jobs state
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  
  // Internships state
  const [internships, setInternships] = useState([]);
  const [currentInternship, setCurrentInternship] = useState(null);
  const [isEditingInternship, setIsEditingInternship] = useState(false);
  const [showInternshipForm, setShowInternshipForm] = useState(false);
  
  // Companies state
  const [companies, setCompanies] = useState([]);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  
  // Categories state
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch data from your API
    // Simulating API call with localStorage for demo purposes
    const fetchData = () => {
      try {
        const savedJobs = localStorage.getItem('adminJobs');
        const savedInternships = localStorage.getItem('adminInternships');
        const savedCompanies = localStorage.getItem('adminCompanies');
        const savedCategories = localStorage.getItem('adminCategories');
        
        if (savedJobs) setJobs(JSON.parse(savedJobs));
        if (savedInternships) setInternships(JSON.parse(savedInternships));
        if (savedCompanies) setCompanies(JSON.parse(savedCompanies));
        if (savedCategories) setCategories(JSON.parse(savedCategories));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Save data to localStorage when they change
    localStorage.setItem('adminJobs', JSON.stringify(jobs));
  }, [jobs]);
  
  useEffect(() => {
    localStorage.setItem('adminInternships', JSON.stringify(internships));
  }, [internships]);
  
  useEffect(() => {
    localStorage.setItem('adminCompanies', JSON.stringify(companies));
  }, [companies]);
  
  useEffect(() => {
    localStorage.setItem('adminCategories', JSON.stringify(categories));
  }, [categories]);

  // Jobs handlers
  const handleAddJob = (job) => {
    const newJob = {
      ...job,
      _id: Date.now().toString(),
      date: new Date().toISOString(),
      company: {
        _id: job.company || user?._id || 'admin',
        name: job.companyName || user?.name || 'Admin Company',
        logo: job.companyLogo || user?.avatar || 'https://via.placeholder.com/150'
      },
      isActive: true,
      applications: []
    };

    setJobs([newJob, ...jobs]);
    setShowJobForm(false);
  };

  const handleUpdateJob = (updatedJob) => {
    setJobs(jobs.map(job => job._id === updatedJob._id ? updatedJob : job));
    setCurrentJob(null);
    setIsEditingJob(false);
    setShowJobForm(false);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter(job => job._id !== jobId));
    }
  };

  const handleEditJob = (job) => {
    setCurrentJob(job);
    setIsEditingJob(true);
    setShowJobForm(true);
  };

  const handleCancelJobEdit = () => {
    setCurrentJob(null);
    setIsEditingJob(false);
    setShowJobForm(false);
  };
  
  // Internship handlers
  const handleAddInternship = (internship) => {
    const newInternship = {
      ...internship,
      _id: Date.now().toString(),
      date: new Date().toISOString(),
      company: {
        _id: internship.company || user?._id || 'admin',
        name: internship.companyName || user?.name || 'Admin Company',
        logo: internship.companyLogo || user?.avatar || 'https://via.placeholder.com/150'
      },
      isActive: true,
      applications: []
    };

    setInternships([newInternship, ...internships]);
    setShowInternshipForm(false);
  };

  const handleUpdateInternship = (updatedInternship) => {
    setInternships(internships.map(internship => 
      internship._id === updatedInternship._id ? updatedInternship : internship
    ));
    setCurrentInternship(null);
    setIsEditingInternship(false);
    setShowInternshipForm(false);
  };

  const handleDeleteInternship = (internshipId) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      setInternships(internships.filter(internship => internship._id !== internshipId));
    }
  };

  const handleEditInternship = (internship) => {
    setCurrentInternship(internship);
    setIsEditingInternship(true);
    setShowInternshipForm(true);
  };

  const handleCancelInternshipEdit = () => {
    setCurrentInternship(null);
    setIsEditingInternship(false);
    setShowInternshipForm(false);
  };
  
  // Company handlers
  const handleAddCompany = (company) => {
    const newCompany = {
      ...company,
      _id: Date.now().toString(),
      date: new Date().toISOString(),
      isActive: true
    };

    setCompanies([newCompany, ...companies]);
    setShowCompanyForm(false);
  };

  const handleUpdateCompany = (updatedCompany) => {
    setCompanies(companies.map(company => 
      company._id === updatedCompany._id ? updatedCompany : company
    ));
    setCurrentCompany(null);
    setIsEditingCompany(false);
    setShowCompanyForm(false);
  };

  const handleDeleteCompany = (companyId) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      setCompanies(companies.filter(company => company._id !== companyId));
    }
  };

  const handleEditCompany = (company) => {
    setCurrentCompany(company);
    setIsEditingCompany(true);
    setShowCompanyForm(true);
  };

  const handleCancelCompanyEdit = () => {
    setCurrentCompany(null);
    setIsEditingCompany(false);
    setShowCompanyForm(false);
  };
  
  // Category handlers
  const handleAddCategory = (category) => {
    const newCategory = {
      ...category,
      _id: Date.now().toString(),
      date: new Date().toISOString(),
      isActive: true
    };

    setCategories([newCategory, ...categories]);
    setShowCategoryForm(false);
  };

  const handleUpdateCategory = (updatedCategory) => {
    setCategories(categories.map(category => 
      category._id === updatedCategory._id ? updatedCategory : category
    ));
    setCurrentCategory(null);
    setIsEditingCategory(false);
    setShowCategoryForm(false);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(category => category._id !== categoryId));
    }
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsEditingCategory(true);
    setShowCategoryForm(true);
  };

  const handleCancelCategoryEdit = () => {
    setCurrentCategory(null);
    setIsEditingCategory(false);
    setShowCategoryForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'jobs'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Jobs
            </button>
            <button
              onClick={() => setActiveTab('internships')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'internships'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Internships
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'companies'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Companies
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'categories'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Categories
            </button>
          </div>
        </div>
        
        {/* Jobs Tab Content */}
        {activeTab === 'jobs' && (
          <>
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => {
                  setCurrentJob(null);
                  setIsEditingJob(false);
                  setShowJobForm(!showJobForm);
                }}
                className={`px-4 py-2 rounded-md ${
                  showJobForm
                    ? 'bg-gray-500 hover:bg-gray-600'
                    : 'bg-primary-600 hover:bg-primary-700'
                } text-white transition-colors duration-300`}
              >
                {showJobForm ? 'Cancel' : 'Add New Job'}
              </button>
            </div>
            
            {showJobForm && (
              <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {isEditingJob ? 'Edit Job' : 'Add New Job'}
                </h2>
                <JobForm
                  job={currentJob}
                  isEditing={isEditingJob}
                  onSubmit={isEditingJob ? handleUpdateJob : handleAddJob}
                  onCancel={handleCancelJobEdit}
                  companies={companies}
                  categories={categories}
                />
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Manage Job Listings</h2>
                {jobs.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    No jobs found. Start by adding a new job.
                  </div>
                ) : (
                  <JobList
                    jobs={jobs}
                    onEdit={handleEditJob}
                    onDelete={handleDeleteJob}
                  />
                )}
              </div>
            </div>
          </>
        )}
        
        {/* Internships Tab Content */}
        {activeTab === 'internships' && (
          <>
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => {
                  setCurrentInternship(null);
                  setIsEditingInternship(false);
                  setShowInternshipForm(!showInternshipForm);
                }}
                className={`px-4 py-2 rounded-md ${
                  showInternshipForm
                    ? 'bg-gray-500 hover:bg-gray-600'
                    : 'bg-primary-600 hover:bg-primary-700'
                } text-white transition-colors duration-300`}
              >
                {showInternshipForm ? 'Cancel' : 'Add New Internship'}
              </button>
            </div>
            
            {showInternshipForm && (
              <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {isEditingInternship ? 'Edit Internship' : 'Add New Internship'}
                </h2>
                <InternshipForm
                  internship={currentInternship}
                  isEditing={isEditingInternship}
                  onSubmit={isEditingInternship ? handleUpdateInternship : handleAddInternship}
                  onCancel={handleCancelInternshipEdit}
                  companies={companies}
                  categories={categories}
                />
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Manage Internship Listings</h2>
                {internships.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    No internships found. Start by adding a new internship.
                  </div>
                ) : (
                  <InternshipList
                    internships={internships}
                    onEdit={handleEditInternship}
                    onDelete={handleDeleteInternship}
                  />
                )}
              </div>
            </div>
          </>
        )}
        
        {/* Companies Tab Content */}
        {activeTab === 'companies' && (
          <>
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => {
                  setCurrentCompany(null);
                  setIsEditingCompany(false);
                  setShowCompanyForm(!showCompanyForm);
                }}
                className={`px-4 py-2 rounded-md ${
                  showCompanyForm
                    ? 'bg-gray-500 hover:bg-gray-600'
                    : 'bg-primary-600 hover:bg-primary-700'
                } text-white transition-colors duration-300`}
              >
                {showCompanyForm ? 'Cancel' : 'Add New Company'}
              </button>
            </div>
            
            {showCompanyForm && (
              <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {isEditingCompany ? 'Edit Company' : 'Add New Company'}
                </h2>
                <CompanyForm
                  company={currentCompany}
                  isEditing={isEditingCompany}
                  onSubmit={isEditingCompany ? handleUpdateCompany : handleAddCompany}
                  onCancel={handleCancelCompanyEdit}
                />
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Manage Companies</h2>
                {companies.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    No companies found. Start by adding a new company.
                  </div>
                ) : (
                  <CompanyList
                    companies={companies}
                    onEdit={handleEditCompany}
                    onDelete={handleDeleteCompany}
                  />
                )}
              </div>
            </div>
          </>
        )}
        
        {/* Categories Tab Content */}
        {activeTab === 'categories' && (
          <>
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => {
                  setCurrentCategory(null);
                  setIsEditingCategory(false);
                  setShowCategoryForm(!showCategoryForm);
                }}
                className={`px-4 py-2 rounded-md ${
                  showCategoryForm
                    ? 'bg-gray-500 hover:bg-gray-600'
                    : 'bg-primary-600 hover:bg-primary-700'
                } text-white transition-colors duration-300`}
              >
                {showCategoryForm ? 'Cancel' : 'Add New Category'}
              </button>
            </div>
            
            {showCategoryForm && (
              <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {isEditingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <CategoryForm
                  category={currentCategory}
                  isEditing={isEditingCategory}
                  onSubmit={isEditingCategory ? handleUpdateCategory : handleAddCategory}
                  onCancel={handleCancelCategoryEdit}
                />
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
                {categories.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    No categories found. Start by adding a new category.
                  </div>
                ) : (
                  <CategoryList
                    categories={categories}
                    onEdit={handleEditCategory}
                    onDelete={handleDeleteCategory}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 