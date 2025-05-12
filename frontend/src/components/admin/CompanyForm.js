import React, { useState, useEffect } from 'react';

const CompanyForm = ({ company, isEditing, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    website: '',
    industry: '',
    location: '',
    description: '',
    foundedYear: '',
    employeeCount: '',
    rating: '4.0',
    size: 'Small (1-50)',
    isActive: true
  });

  const [errors, setErrors] = useState({});
  const [previewLogo, setPreviewLogo] = useState('');

  useEffect(() => {
    if (isEditing && company) {
      setFormData({
        ...company,
        foundedYear: company.foundedYear || '',
        employeeCount: company.employeeCount || '',
        rating: company.rating || '4.0'
      });
      setPreviewLogo(company.logo || '');
    }
  }, [isEditing, company]);

  useEffect(() => {
    if (formData.logo && isValidUrl(formData.logo)) {
      setPreviewLogo(formData.logo);
    }
  }, [formData.logo]);

  const companySizes = [
    'Small (1-50)',
    'Medium (51-200)',
    'Large (201-1000)',
    'Enterprise (1000+)'
  ];

  const industries = [
    'Information Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Retail',
    'Manufacturing',
    'Media & Entertainment',
    'Transportation',
    'Hospitality',
    'Construction',
    'Agriculture',
    'Energy',
    'Real Estate',
    'Telecommunications',
    'Other'
  ];

  const employeeCountOptions = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1,000-5,000',
    '5,000-10,000',
    '10,000+',
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Company name is required';
    if (!formData.industry.trim()) newErrors.industry = 'Industry is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (formData.website && !isValidUrl(formData.website)) 
      newErrors.website = 'Please enter a valid URL';
    if (formData.logo && !isValidUrl(formData.logo)) 
      newErrors.logo = 'Please enter a valid URL for the logo';
    if (formData.rating && (parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 5))
      newErrors.rating = 'Rating must be between 0 and 5';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Preview Card */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Company Card Preview</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md">
          <div className="p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden mr-4 border border-gray-200">
                {previewLogo ? (
                  <img 
                    src={previewLogo} 
                    alt={formData.name || 'Company logo'} 
                    className="h-full w-full object-contain"
                    onError={() => setPreviewLogo('')}
                  />
                ) : (
                  <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M3 7h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{formData.name || 'Company Name'}</h3>
                <p className="text-sm text-gray-600">{formData.industry || 'Industry'}</p>
              </div>
            </div>
            
            <p className="mt-4 text-sm text-gray-600 line-clamp-3">
              {formData.description || 'Company description will appear here. Enter a detailed description to showcase your company.'}
            </p>
            
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{formData.location || 'Location'}</span>
            </div>
            
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M3 7h18" />
              </svg>
              <span>{formData.employeeCount || 'Employee count'} employees</span>
            </div>
            
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-gray-600 font-medium">{formData.rating || '4.0'}</span>
              </div>
              
              <div className="ml-auto">
                <span className="text-primary-600 text-sm font-medium">View Company →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Company Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Industry*
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                  errors.industry ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select an industry</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry}</p>}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Company Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                Logo URL
              </label>
              <input
                type="text"
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                  errors.logo ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.logo && <p className="mt-1 text-sm text-red-600">{errors.logo}</p>}
              <p className="mt-1 text-xs text-gray-500">Enter a direct URL to the company logo image</p>
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Website URL
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                  errors.website ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location*
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country or 'Global'"
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>

            <div>
              <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700">
                Number of Employees
              </label>
              <select
                id="employeeCount"
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">Select employee count</option>
                {employeeCountOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700">
                Founded Year
              </label>
              <input
                type="number"
                id="foundedYear"
                name="foundedYear"
                value={formData.foundedYear}
                onChange={handleChange}
                min="1800"
                max={new Date().getFullYear()}
                placeholder={new Date().getFullYear()}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                Company Rating (0-5)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                  errors.rating ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Company Description</h3>
          <div>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed description of the company..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            ></textarea>
            <p className="mt-2 text-sm text-gray-500">
              Write a compelling company description that highlights key information about the company's mission, values, and what makes it unique.
            </p>
          </div>

          <div className="mt-4 flex items-center">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
              Active Company (visible on the platform)
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {isEditing ? 'Update Company' : 'Add Company'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm; 