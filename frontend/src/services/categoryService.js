import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get a single category by ID
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    throw error;
  }
};

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// Update a category
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(`${API_URL}/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Error updating category with ID ${id}:`, error);
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category with ID ${id}:`, error);
    throw error;
  }
};

// Fallback to localStorage if API fails
export const getCategoriesFromLocalStorage = () => {
  try {
    const savedCategories = localStorage.getItem('adminCategories');
    if (savedCategories) {
      return JSON.parse(savedCategories);
    }
    return [];
  } catch (error) {
    console.error('Error loading categories from localStorage:', error);
    return [];
  }
};

export const saveCategoryToLocalStorage = (categories) => {
  try {
    localStorage.setItem('adminCategories', JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories to localStorage:', error);
  }
}; 