import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Custom hook that allows us to scroll to a section by ID
 * This handles both direct scrolling and navigation to a URL with hash
 */
const useScrollToSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to scroll to a section by ID
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    
    if (element) {
      // If we're already on the right page, scroll directly
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Otherwise, navigate to the page with the hash
      // The ScrollToTop component will handle scrolling once the page loads
      if (location.pathname === '/') {
        navigate(`/#${sectionId}`);
      } else {
        navigate(`/#${sectionId}`, { replace: true });
      }
    }
  };

  return scrollToSection;
};

export default useScrollToSection; 