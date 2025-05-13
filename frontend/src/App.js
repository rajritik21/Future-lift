import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CompaniesPage from './pages/CompaniesPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Sitemap from './pages/Sitemap';
import { Login, Register } from './components/auth';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import FAQPage from './pages/FAQPage';
import ResumeTipsPage from './pages/ResumeTipsPage';
import InterviewTipsPage from './pages/InterviewTipsPage';
import AptitudePracticePage from './pages/AptitudePracticePage';
import CareerGuidancePage from './pages/CareerGuidancePage';
import MockTestsPage from './pages/MockTestsPage';
import FreeCoursesPage from './pages/FreeCoursesPage';
import WebinarsEventsPage from './pages/WebinarsEventsPage';
import GovernmentJobsPage from './pages/GovernmentJobsPage';
import GovernmentJobDetailPage from './pages/GovernmentJobDetailPage';
import Todo from './components/Todo';
import { getCategories, getCategoriesFromLocalStorage } from './services/categoryService';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminRegisterPage from './pages/AdminRegisterPage';
import AdminAccessCodesPage from './pages/AdminAccessCodesPage';

// Import new admin pages
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminJobsPage from './pages/AdminJobsPage';
import AdminCompaniesPage from './pages/AdminCompaniesPage';
import AdminProfilePage from './pages/AdminProfilePage';
import AdminInternshipsPage from './pages/AdminInternshipsPage';
import AdminCategoriesPage from './pages/AdminCategoriesPage';
import UserLoginPage from './pages/UserLoginPage';

// Private route component for protected routes
const PrivateRoute = ({ element, allowedUserTypes }) => {
  const isAuthenticated = localStorage.getItem('token') !== null || localStorage.getItem('user') !== null;
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedUserTypes && !allowedUserTypes.includes(user.userType)) {
    return <Navigate to="/" replace />;
  }
  
  return element;
};

const App = () => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    loading: true
  });
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    // Check for stored token and user info
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');
      if (token || userString) {
        // Here you would normally validate the token with the backend
        const user = JSON.parse(userString || '{}');
        setAuth({
          isAuthenticated: true,
          user,
          loading: false
        });
      } else {
        setAuth({
          isAuthenticated: false,
          user: null,
          loading: false
        });
      }
    };

    checkAuth();
    
    // Load categories from API
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
        setCategoriesLoading(false);
      } catch (error) {
        console.error('Error loading categories from API:', error);
        // Fallback to localStorage if API fails
        const localCategories = getCategoriesFromLocalStorage();
        setCategories(localCategories);
        setCategoriesLoading(false);
      }
    };
    
    loadCategories();
    
    // Set up event listener for the custom categoriesUpdated event
    const handleCategoriesUpdated = () => {
      loadCategories();
    };
    
    window.addEventListener('categoriesUpdated', handleCategoriesUpdated);
    
    return () => {
      window.removeEventListener('categoriesUpdated', handleCategoriesUpdated);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({
      isAuthenticated: false,
      user: null,
      loading: false
    });
  };

  if (auth.loading || categoriesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar 
          isAuthenticated={auth.isAuthenticated} 
          logout={logout} 
          userType={auth.user?.userType} 
          categories={categories}
        />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/companies/:id" element={<CompanyDetailPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/government" element={<GovernmentJobsPage />} />
            <Route path="/jobs/government/:id" element={<GovernmentJobDetailPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/sitemap" element={<Sitemap />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<UserLoginPage />} />
            <Route path="/register" element={<Navigate to="/login?signup=true" replace />} />
            <Route path="/auth" element={<Navigate to="/login" replace />} />
            
            {/* Admin Auth Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/register" element={<AdminRegisterPage />} />
            
            <Route path="/faq" element={<FAQPage />} />
            
            {/* Resource Pages */}
            <Route path="/resources/resume-tips" element={<ResumeTipsPage />} />
            <Route path="/resources/interview-tips" element={<InterviewTipsPage />} />
            <Route path="/resources/aptitude-practice" element={<AptitudePracticePage />} />
            <Route path="/resources/career-guidance" element={<CareerGuidancePage />} />
            <Route path="/resources/mock-tests" element={<MockTestsPage />} />
            <Route path="/resources/free-courses" element={<FreeCoursesPage />} />
            <Route path="/resources/webinars-events" element={<WebinarsEventsPage />} />
            
            {/* User Routes */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute 
                  element={<DashboardPage />} 
                  allowedUserTypes={['jobseeker', 'employer', 'admin']} 
                />
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <PrivateRoute 
                  element={<AdminDashboardPage />} 
                  allowedUserTypes={['admin']} 
                />
              } 
            />
            <Route 
              path="/admin/jobs" 
              element={
                <PrivateRoute 
                  element={<AdminJobsPage />} 
                  allowedUserTypes={['admin']} 
                />
              } 
            />
            <Route 
              path="/admin/internships" 
              element={
                <PrivateRoute 
                  element={<AdminInternshipsPage />} 
                  allowedUserTypes={['admin']} 
                />
              } 
            />
            <Route 
              path="/admin/companies" 
              element={
                <PrivateRoute 
                  element={<AdminCompaniesPage />} 
                  allowedUserTypes={['admin']} 
                />
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <PrivateRoute 
                  element={<AdminUsersPage />} 
                  allowedUserTypes={['admin']} 
                />
              } 
            />
            <Route 
              path="/admin/categories" 
              element={
                <PrivateRoute 
                  element={<AdminCategoriesPage />} 
                  allowedUserTypes={['admin']} 
                />
              } 
            />
            <Route 
              path="/admin/profile" 
              element={
                <PrivateRoute 
                  element={<AdminProfilePage />} 
                  allowedUserTypes={['admin']} 
                />
              } 
            />
            <Route 
              path="/admin/access-codes" 
              element={
                <PrivateRoute 
                  element={<AdminAccessCodesPage />} 
                  allowedUserTypes={['admin']} 
                />
              } 
            />
            
            {/* Add more routes as needed */}
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
