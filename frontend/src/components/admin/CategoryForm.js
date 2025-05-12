import React, { useState, useEffect } from 'react';

const CategoryForm = ({ category, isEditing, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    slug: '',
    isActive: true
  });

  const [errors, setErrors] = useState({});
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (isEditing && category) {
      setFormData({
        ...category,
        slug: category.slug || ''
      });
      setAutoSlug(!category.slug);
    }
  }, [isEditing, category]);

  // Generate a slug from the name
  const generateSlug = (name) => {
    return name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  // Update slug when name changes if autoSlug is true
  useEffect(() => {
    if (autoSlug && formData.name) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.name)
      }));
    }
  }, [formData.name, autoSlug]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Category name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.slug.trim()) newErrors.slug = 'URL slug is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'name' && autoSlug) {
      // When name changes and autoSlug is enabled, update slug too
      setFormData({
        ...formData,
        [name]: value,
        slug: generateSlug(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
    
    // If user manually edits the slug, disable auto-generation
    if (name === 'slug') {
      setAutoSlug(false);
    }
  };

  const toggleAutoSlug = () => {
    if (!autoSlug && formData.name) {
      // When re-enabling auto-slug, regenerate from current name
      setFormData({
        ...formData,
        slug: generateSlug(formData.name)
      });
    }
    setAutoSlug(!autoSlug);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Available icon options (simple SVG icon names)
  const iconOptions = [
    { value: 'code', label: 'Code / Programming' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'finance', label: 'Finance' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'support', label: 'Customer Support' },
    { value: 'data', label: 'Data Science' },
    { value: 'admin', label: 'Administrative' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Category Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            URL Slug*
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              disabled={autoSlug}
              className={`block w-full rounded-md ${autoSlug ? 'bg-gray-100' : ''} border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                errors.slug ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={toggleAutoSlug}
              className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {autoSlug ? 'Edit' : 'Auto'}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            This will be used in the URL: /categories/<span className="font-medium">{formData.slug}</span>
          </p>
          {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
        </div>

        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
            Category Icon
          </label>
          <select
            id="icon"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="">Select an icon</option>
            {iconOptions.map((icon) => (
              <option key={icon.value} value={icon.value}>
                {icon.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Brief description of the job category"
          ></textarea>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
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
            Active Category
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
          {isEditing ? 'Update Category' : 'Add Category'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm; 