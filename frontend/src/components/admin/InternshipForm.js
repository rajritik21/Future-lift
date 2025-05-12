import React, { useState, useEffect } from 'react';

const InternshipForm = ({ internship, isEditing, onSubmit, onCancel, companies, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    duration: '3 months',
    category: '',
    stipend: '',
    skills: '',
    startDate: '',
    isRemote: false,
    isActive: true,
    companyName: '',
    company: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && internship) {
      setFormData({
        ...internship,
        skills: Array.isArray(internship.skills) ? internship.skills.join(', ') : internship.skills,
        company: internship.company?._id || '',
        companyName: internship.company?.name || '',
        startDate: internship.startDate ? new Date(internship.startDate).toISOString().split('T')[0] : ''
      });
    }
  }, [isEditing, internship]);

  const durations = [
    '1 month',
    '2 months',
    '3 months',
    '6 months',
    '1 year',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.skills.trim()) newErrors.skills = 'At least one skill is required';
    if (companies && companies.length > 0 && !formData.company) newErrors.company = 'Company is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // If selecting a company from dropdown, update the company name
    if (name === 'company' && companies) {
      const selectedCompany = companies.find(c => c._id === value);
      if (selectedCompany) {
        setFormData(prev => ({
          ...prev,
          company: value,
          companyName: selectedCompany.name
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Process skills as an array
      const processedData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim())
      };
      
      onSubmit(processedData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Internship Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {companies && companies.length > 0 ? (
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company*
            </label>
            <select
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
          </div>
        ) : (
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name*
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
        )}

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
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration*
          </label>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            {durations.map((duration) => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category*
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a category</option>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))
            ) : (
              ['Software Development', 'Web Development', 'UI/UX Design', 'Data Science', 'Marketing', 'Content Writing', 'Other'].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))
            )}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="stipend" className="block text-sm font-medium text-gray-700">
            Stipend
          </label>
          <input
            type="text"
            id="stipend"
            name="stipend"
            value={formData.stipend}
            onChange={handleChange}
            placeholder="e.g., $500/month, Unpaid"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
            Skills* (comma separated)
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g., JavaScript, React, Node.js"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
              errors.skills ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Internship Description*
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            value={formData.description}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          ></textarea>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="md:col-span-2 flex items-center space-x-6">
          <div className="flex items-center">
            <input
              id="isRemote"
              name="isRemote"
              type="checkbox"
              checked={formData.isRemote}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isRemote" className="ml-2 block text-sm text-gray-900">
              Remote Internship
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
              Active Listing
            </label>
          </div>
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
          {isEditing ? 'Update Internship' : 'Add Internship'}
        </button>
      </div>
    </form>
  );
};

export default InternshipForm; 