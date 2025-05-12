import axios from 'axios';

// API base URL - should be set in your environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get token from local storage
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }
  };
};

// Get all government jobs
export const getGovernmentJobs = async () => {
  try {
    // Try to fetch from API first
    const res = await axios.get(`${API_URL}/government-jobs`);
    return res.data;
  } catch (error) {
    console.error('Error fetching government jobs from API:', error);
    // Fallback to local storage if API fails
    return getGovernmentJobsFromLocalStorage();
  }
};

// Get a single government job by ID
export const getGovernmentJobById = async (id) => {
  try {
    // Try to fetch from API first
    const res = await axios.get(`${API_URL}/government-jobs/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching government job ${id} from API:`, error);
    
    // Fallback to local storage if API fails
    const jobs = getGovernmentJobsFromLocalStorage();
    return jobs.find(job => job.id === id);
  }
};

// Create a new government job (admin only)
export const createGovernmentJob = async (jobData) => {
  try {
    const res = await axios.post(
      `${API_URL}/government-jobs`,
      jobData,
      getAuthConfig()
    );
    return res.data;
  } catch (error) {
    console.error('Error creating government job:', error);
    
    // Fallback to local storage if API fails
    const newJob = {
      id: `job-gov-${Date.now()}`,
      ...jobData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applications: []
    };
    
    // Get existing jobs from local storage
    const jobs = getGovernmentJobsFromLocalStorage();
    jobs.push(newJob);
    localStorage.setItem('govJobs', JSON.stringify(jobs));
    
    return newJob;
  }
};

// Update an existing government job (admin only)
export const updateGovernmentJob = async (id, jobData) => {
  try {
    const res = await axios.put(
      `${API_URL}/government-jobs/${id}`,
      jobData,
      getAuthConfig()
    );
    return res.data;
  } catch (error) {
    console.error(`Error updating government job ${id}:`, error);
    
    // Fallback to local storage if API fails
    let jobs = getGovernmentJobsFromLocalStorage();
    const jobIndex = jobs.findIndex(job => job.id === id);
    
    if (jobIndex !== -1) {
      jobs[jobIndex] = {
        ...jobs[jobIndex],
        ...jobData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('govJobs', JSON.stringify(jobs));
      return jobs[jobIndex];
    }
    
    throw new Error('Job not found');
  }
};

// Delete a government job (admin only)
export const deleteGovernmentJob = async (id) => {
  try {
    const res = await axios.delete(
      `${API_URL}/government-jobs/${id}`,
      getAuthConfig()
    );
    return res.data;
  } catch (error) {
    console.error(`Error deleting government job ${id}:`, error);
    
    // Fallback to local storage if API fails
    let jobs = getGovernmentJobsFromLocalStorage();
    jobs = jobs.filter(job => job.id !== id);
    localStorage.setItem('govJobs', JSON.stringify(jobs));
    
    return { msg: 'Government job removed' };
  }
};

// Apply for a government job (authenticated users)
export const applyForGovernmentJob = async (id) => {
  try {
    const res = await axios.post(
      `${API_URL}/government-jobs/${id}/apply`,
      {},
      getAuthConfig()
    );
    return res.data;
  } catch (error) {
    console.error(`Error applying for government job ${id}:`, error);
    
    // Fallback to local storage if API fails
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      throw new Error('Not authenticated');
    }
    
    let jobs = getGovernmentJobsFromLocalStorage();
    const jobIndex = jobs.findIndex(job => job.id === id);
    
    if (jobIndex !== -1) {
      // Check if already applied
      if (jobs[jobIndex].applications?.some(app => app.user === user.id)) {
        throw new Error('Already applied');
      }
      
      // Add application
      if (!jobs[jobIndex].applications) {
        jobs[jobIndex].applications = [];
      }
      
      const newApplication = {
        id: `app-${Date.now()}`,
        user: user.id,
        status: 'pending',
        date: new Date().toISOString()
      };
      
      jobs[jobIndex].applications.unshift(newApplication);
      localStorage.setItem('govJobs', JSON.stringify(jobs));
      
      return jobs[jobIndex].applications;
    }
    
    throw new Error('Job not found');
  }
};

// Get all government jobs from local storage (fallback)
export const getGovernmentJobsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('govJobs') || '[]');
};

// Save government jobs to local storage (fallback)
export const saveGovernmentJobsToLocalStorage = (jobs) => {
  localStorage.setItem('govJobs', JSON.stringify(jobs));
}; 