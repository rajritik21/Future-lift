import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGovernmentJob } from '../../services/governmentJobService';

const JobPostingForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Main job form data
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    salary: '',
    qualification: '',
    description: '',
    applicationBeginDate: '',
    applicationDeadlineDate: '',
    completeFormLastDate: '',
    examDate: '',
    admitCardDate: '',
    experienceRequired: '',
    vacancies: 0,
  });

  // Application Fee
  const [applicationFee, setApplicationFee] = useState({
    general: '',
    sc_st: '',
    ph: '',
    women: '',
    paymentMethods: ['Debit Card', 'Credit Card', 'Net Banking']
  });

  // Age Limit
  const [ageLimit, setAgeLimit] = useState({
    asOnDate: '',
    minimumAge: '',
    maximumAge: '',
    relaxationRules: ''
  });

  // Category-wise vacancy
  const [categoryVacancy, setCategoryVacancy] = useState({
    UR: 0,
    OBC: 0,
    EWS: 0,
    SC: 0,
    ST: 0
  });

  // State-wise vacancy
  const [stateVacancy, setStateVacancy] = useState([
    { state: 'Uttar Pradesh', vacancies: 0 },
    { state: 'Bihar', vacancies: 0 },
    { state: 'Jharkhand', vacancies: 0 },
    { state: 'Madhya Pradesh', vacancies: 0 },
    { state: 'New Delhi', vacancies: 0 },
    { state: 'Chhattisgarh', vacancies: 0 },
    { state: 'Rajasthan', vacancies: 0 },
    { state: 'Himachal Pradesh', vacancies: 0 },
    { state: 'Haryana', vacancies: 0 },
    { state: 'Punjab', vacancies: 0 },
    { state: 'Uttarakhand', vacancies: 0 },
    { state: 'Tamil Nadu', vacancies: 0 },
    { state: 'Telangana', vacancies: 0 },
    { state: 'Odisha', vacancies: 0 },
    { state: 'Kerala', vacancies: 0 },
    { state: 'Andhra Pradesh', vacancies: 0 },
    { state: 'Maharashtra', vacancies: 0 },
    { state: 'Assam', vacancies: 0 },
    { state: 'Manipur', vacancies: 0 },
    { state: 'Nagaland', vacancies: 0 },
    { state: 'Karnataka', vacancies: 0 },
    { state: 'West Bengal', vacancies: 0 },
    { state: 'Gujarat', vacancies: 0 },
    { state: 'Jammu & Kashmir', vacancies: 0 },
    { state: 'Chandigarh UT', vacancies: 0 },
    { state: 'Goa', vacancies: 0 },
    { state: 'Dadra and Nagar Haveli', vacancies: 0 },
    { state: 'Daman and Diu', vacancies: 0 }
  ]);

  // Application instructions
  const [applicationInstructions, setApplicationInstructions] = useState('');

  // Handle main form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle application fee changes
  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setApplicationFee({
      ...applicationFee,
      [name]: value
    });
  };

  // Handle age limit changes
  const handleAgeChange = (e) => {
    const { name, value } = e.target;
    setAgeLimit({
      ...ageLimit,
      [name]: value
    });
  };

  // Handle category vacancy changes
  const handleCategoryVacancyChange = (e) => {
    const { name, value } = e.target;
    setCategoryVacancy({
      ...categoryVacancy,
      [name]: parseInt(value) || 0
    });
  };

  // Handle state vacancy changes
  const handleStateVacancyChange = (index, value) => {
    const newStateVacancy = [...stateVacancy];
    newStateVacancy[index].vacancies = parseInt(value) || 0;
    setStateVacancy(newStateVacancy);
  };

  // Calculate total vacancies
  const calculateTotalVacancies = () => {
    return Object.values(categoryVacancy).reduce((sum, current) => sum + current, 0);
  };

  // Update total vacancies in form data
  const updateTotalVacancies = () => {
    const total = calculateTotalVacancies();
    setFormData({
      ...formData,
      vacancies: total
    });
    return total;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    // Validate form
    if (!formData.title || !formData.department) {
      setMessage({ type: 'error', text: 'Please fill out all required fields' });
      setIsSubmitting(false);
      return;
    }

    // Update total vacancies
    const totalVacancies = updateTotalVacancies();

    try {
      // Create the job data object
      const jobData = {
        ...formData,
        vacancies: totalVacancies,
        applicationFee,
        ageLimit,
        categoryVacancy,
        stateVacancy: stateVacancy.filter(sv => sv.vacancies > 0),
        applicationInstructions
      };

      // Submit to backend API using the service
      await createGovernmentJob(jobData);
      
      setMessage({ 
        type: 'success', 
        text: 'Government job posted successfully! It will be available once approved.' 
      });
      
      // Reset form after successful submission
      setTimeout(() => {
        navigate('/admin/jobs');
      }, 2000);
    } catch (error) {
      console.error('Error posting job:', error);
      setMessage({ 
        type: 'error', 
        text: `Failed to post job: ${error.response?.data?.msg || error.message || 'Unknown error'}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Post Government Job</h1>
      
      {message.text && (
        <div className={`p-4 mb-6 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Job Information */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Job Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="e.g. ₹56,100 - ₹1,77,500"
              />
            </div>
            
            <div>
              <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1">Qualification Required</label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="experienceRequired" className="block text-sm font-medium text-gray-700 mb-1">Experience Required</label>
              <input
                type="text"
                id="experienceRequired"
                name="experienceRequired"
                value={formData.experienceRequired}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="e.g. 2+ years"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            ></textarea>
          </div>
        </div>
        
        {/* Important Dates */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Important Dates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="applicationBeginDate" className="block text-sm font-medium text-gray-700 mb-1">Application Begin Date</label>
              <input
                type="date"
                id="applicationBeginDate"
                name="applicationBeginDate"
                value={formData.applicationBeginDate}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="applicationDeadlineDate" className="block text-sm font-medium text-gray-700 mb-1">Last Date for Apply Online</label>
              <input
                type="date"
                id="applicationDeadlineDate"
                name="applicationDeadlineDate"
                value={formData.applicationDeadlineDate}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="completeFormLastDate" className="block text-sm font-medium text-gray-700 mb-1">Complete Form Last Date</label>
              <input
                type="date"
                id="completeFormLastDate"
                name="completeFormLastDate"
                value={formData.completeFormLastDate}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="examDate" className="block text-sm font-medium text-gray-700 mb-1">Exam Date</label>
              <input
                type="text"
                id="examDate"
                name="examDate"
                value={formData.examDate}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="e.g. As per Schedule"
              />
            </div>
            
            <div>
              <label htmlFor="admitCardDate" className="block text-sm font-medium text-gray-700 mb-1">Admit Card Available</label>
              <input
                type="text"
                id="admitCardDate"
                name="admitCardDate"
                value={formData.admitCardDate}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="e.g. Before Exam"
              />
            </div>
          </div>
        </div>
        
        {/* Application Fee */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Fee</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="general" className="block text-sm font-medium text-gray-700 mb-1">General / OBC / EWS</label>
              <input
                type="text"
                id="general"
                name="general"
                value={applicationFee.general}
                onChange={handleFeeChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="e.g. 600/-"
              />
            </div>
            
            <div>
              <label htmlFor="sc_st" className="block text-sm font-medium text-gray-700 mb-1">SC / ST</label>
              <input
                type="text"
                id="sc_st"
                name="sc_st"
                value={applicationFee.sc_st}
                onChange={handleFeeChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="e.g. 100/-"
              />
            </div>
            
            <div>
              <label htmlFor="ph" className="block text-sm font-medium text-gray-700 mb-1">PH (Divyang)</label>
              <input
                type="text"
                id="ph"
                name="ph"
                value={applicationFee.ph}
                onChange={handleFeeChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="e.g. 100/-"
              />
            </div>
            
            <div>
              <label htmlFor="women" className="block text-sm font-medium text-gray-700 mb-1">All Category Women Candidates</label>
              <input
                type="text"
                id="women"
                name="women"
                value={applicationFee.women}
                onChange={handleFeeChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="e.g. 100/-"
              />
            </div>
          </div>
        </div>
        
        {/* Age Limit */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Age Limit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="asOnDate" className="block text-sm font-medium text-gray-700 mb-1">As on Date</label>
              <input
                type="date"
                id="asOnDate"
                name="asOnDate"
                value={ageLimit.asOnDate}
                onChange={handleAgeChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="minimumAge" className="block text-sm font-medium text-gray-700 mb-1">Minimum Age (years)</label>
              <input
                type="number"
                id="minimumAge"
                name="minimumAge"
                value={ageLimit.minimumAge}
                onChange={handleAgeChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="maximumAge" className="block text-sm font-medium text-gray-700 mb-1">Maximum Age (years)</label>
              <input
                type="number"
                id="maximumAge"
                name="maximumAge"
                value={ageLimit.maximumAge}
                onChange={handleAgeChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="relaxationRules" className="block text-sm font-medium text-gray-700 mb-1">Age Relaxation Rules</label>
              <textarea
                id="relaxationRules"
                name="relaxationRules"
                value={ageLimit.relaxationRules}
                onChange={handleAgeChange}
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Describe any age relaxation rules"
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Vacancy Details */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Vacancy Details (Category Wise)</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label htmlFor="UR" className="block text-sm font-medium text-gray-700 mb-1">UR</label>
              <input
                type="number"
                id="UR"
                name="UR"
                value={categoryVacancy.UR}
                onChange={handleCategoryVacancyChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                min="0"
              />
            </div>
            
            <div>
              <label htmlFor="OBC" className="block text-sm font-medium text-gray-700 mb-1">OBC</label>
              <input
                type="number"
                id="OBC"
                name="OBC"
                value={categoryVacancy.OBC}
                onChange={handleCategoryVacancyChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                min="0"
              />
            </div>
            
            <div>
              <label htmlFor="EWS" className="block text-sm font-medium text-gray-700 mb-1">EWS</label>
              <input
                type="number"
                id="EWS"
                name="EWS"
                value={categoryVacancy.EWS}
                onChange={handleCategoryVacancyChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                min="0"
              />
            </div>
            
            <div>
              <label htmlFor="SC" className="block text-sm font-medium text-gray-700 mb-1">SC</label>
              <input
                type="number"
                id="SC"
                name="SC"
                value={categoryVacancy.SC}
                onChange={handleCategoryVacancyChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                min="0"
              />
            </div>
            
            <div>
              <label htmlFor="ST" className="block text-sm font-medium text-gray-700 mb-1">ST</label>
              <input
                type="number"
                id="ST"
                name="ST"
                value={categoryVacancy.ST}
                onChange={handleCategoryVacancyChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                min="0"
              />
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-blue-800">
              <strong>Total Vacancies:</strong> {calculateTotalVacancies()}
            </p>
          </div>
        </div>
        
        {/* State-wise Vacancy */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">State-wise Vacancy Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stateVacancy.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <label className="block text-sm font-medium text-gray-700 w-1/2">{item.state}</label>
                <input
                  type="number"
                  value={item.vacancies}
                  onChange={(e) => handleStateVacancyChange(index, e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  min="0"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Application Instructions */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Instructions</h2>
          <textarea
            value={applicationInstructions}
            onChange={(e) => setApplicationInstructions(e.target.value)}
            rows={6}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Provide detailed instructions on how to apply..."
          ></textarea>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostingForm; 