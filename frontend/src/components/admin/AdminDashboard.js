import React, { useState, useEffect } from 'react';
import JobForm from './JobForm';
import JobList from './JobList';
import InternshipForm from './InternshipForm';
import InternshipList from './InternshipList';
import CompanyForm from './CompanyForm';
import CompanyList from './CompanyList';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { 
  getCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory,
  getCategoriesFromLocalStorage,
  saveCategoryToLocalStorage
} from '../../services/categoryService';
import { Link } from 'react-router-dom';

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
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch data from your API
    const fetchData = async () => {
      try {
        setLoading(true);
        // For now, let's still use localStorage for jobs, internships, and companies
        const savedJobs = localStorage.getItem('adminJobs');
        const savedInternships = localStorage.getItem('adminInternships');
        const savedCompanies = localStorage.getItem('adminCompanies');
        
        if (savedJobs) setJobs(JSON.parse(savedJobs));
        if (savedInternships) setInternships(JSON.parse(savedInternships));
        if (savedCompanies) setCompanies(JSON.parse(savedCompanies));
        
        // For categories, try to fetch from the API first
        try {
          const fetchedCategories = await getCategories();
          setCategories(fetchedCategories);
          // Also update localStorage as a backup
          saveCategoryToLocalStorage(fetchedCategories);
        } catch (apiError) {
          console.error('Error fetching categories from API:', apiError);
          // Fallback to localStorage if API fails
          const localCategories = getCategoriesFromLocalStorage();
          setCategories(localCategories);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
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
  
  // We no longer need to save categories to localStorage here
  // as it's done in the API service after successful API operations

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
  const handleAddCategory = async (category) => {
    try {
      // First, try to add the category via the API
      const savedCategory = await createCategory(category);
      setCategories([savedCategory, ...categories]);
      setShowCategoryForm(false);
      
      // Trigger event to update navbar
      window.dispatchEvent(new Event('categoriesUpdated'));
    } catch (error) {
      console.error('Error adding category:', error);
      // Fallback to localStorage if API fails
      const newCategory = {
        ...category,
        _id: Date.now().toString(),
        date: new Date().toISOString(),
        isActive: true
      };
      const updatedCategories = [newCategory, ...categories];
      setCategories(updatedCategories);
      saveCategoryToLocalStorage(updatedCategories);
      setShowCategoryForm(false);
      
      // Trigger event to update navbar
      window.dispatchEvent(new Event('categoriesUpdated'));
    }
  };

  const handleUpdateCategory = async (updatedCategory) => {
    try {
      // First, try to update the category via the API
      const result = await updateCategory(updatedCategory._id, updatedCategory);
      setCategories(categories.map(category => 
        category._id === updatedCategory._id ? result : category
      ));
      setCurrentCategory(null);
      setIsEditingCategory(false);
      setShowCategoryForm(false);
      
      // Trigger event to update navbar
      window.dispatchEvent(new Event('categoriesUpdated'));
    } catch (error) {
      console.error('Error updating category:', error);
      // Fallback to localStorage if API fails
      const updatedCategories = categories.map(category => 
        category._id === updatedCategory._id ? updatedCategory : category
      );
      setCategories(updatedCategories);
      saveCategoryToLocalStorage(updatedCategories);
      setCurrentCategory(null);
      setIsEditingCategory(false);
      setShowCategoryForm(false);
      
      // Trigger event to update navbar
      window.dispatchEvent(new Event('categoriesUpdated'));
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        // First, try to delete the category via the API
        await deleteCategory(categoryId);
        const updatedCategories = categories.filter(category => category._id !== categoryId);
        setCategories(updatedCategories);
        
        // Trigger event to update navbar
        window.dispatchEvent(new Event('categoriesUpdated'));
      } catch (error) {
        console.error('Error deleting category:', error);
        // Fallback to localStorage if API fails
        const updatedCategories = categories.filter(category => category._id !== categoryId);
        setCategories(updatedCategories);
        saveCategoryToLocalStorage(updatedCategories);
        
        // Trigger event to update navbar
        window.dispatchEvent(new Event('categoriesUpdated'));
      }
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

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Welcome to the admin dashboard. Manage jobs, internships, companies, and categories.
        </p>
        
        {/* Actions */}
        <div className="mb-6 flex items-center justify-between">
          <Link 
            to="/admin/profile" 
            className="text-primary-600 hover:text-primary-800 flex items-center transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            View/Edit Admin Profile
          </Link>
          
          <Link 
            to="/admin/users" 
            className="text-primary-600 hover:text-primary-800 flex items-center transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Manage Admin Users
          </Link>
        </div>
        
        <div className="border-b border-gray-200 mb-6">
          {/* Tab Navigation */}
          <div className="flex space-x-4">
            {['jobs', 'internships', 'companies', 'categories'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-4 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors duration-300`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
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