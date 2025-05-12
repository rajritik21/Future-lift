import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import CategoryList from '../components/admin/CategoryList';
import CategoryForm from '../components/admin/CategoryForm';
import { getCategories } from '../services/categoryService';

const AdminCategoriesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again later.');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddNew = () => {
    setCurrentCategory(null);
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
    setCurrentCategory(null);
  };

  return (
    <AdminLayout>
      {showForm ? (
        <CategoryForm category={currentCategory} onBack={handleBack} />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Categories</h1>
            <button
              onClick={handleAddNew}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Add New Category
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          ) : (
            <CategoryList 
              categories={categories} 
              onEdit={handleEdit} 
            />
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCategoriesPage; 