import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component will scroll the window to the top whenever
// the pathname changes (i.e., on navigation)
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash in the URL, scroll to that element
    if (hash) {
      // Give browser a little time to render before scrolling
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Otherwise, scroll to top on page navigation
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop; 