/**
 * Background pattern utilities for the platform cards
 */

/**
 * Generate a data URL for an SVG pattern
 * @param {string} pattern - SVG pattern content
 * @param {string} bgColor - Background color (hex or name)
 * @param {string} fgColor - Foreground color (hex or name)
 * @returns {string} - Data URL for the SVG pattern
 */
export const generatePatternDataUrl = (pattern, bgColor = '#ffffff', fgColor = '#0056D2') => {
  const encodedPattern = encodeURIComponent(pattern.replace(/\s+/g, ' ').trim());
  return `data:image/svg+xml,${encodedPattern}`.replace('#BGCOLOR', bgColor).replace('#FGCOLOR', fgColor);
};

// Pattern definitions for platforms
export const platformPatterns = {
  'coursera': generatePatternDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" fill="#BGCOLOR"/>
      <circle cx="25" cy="25" r="15" fill="#FGCOLOR" opacity="0.1"/>
      <circle cx="75" cy="75" r="15" fill="#FGCOLOR" opacity="0.1"/>
      <circle cx="25" cy="75" r="10" fill="#FGCOLOR" opacity="0.1"/>
      <circle cx="75" cy="25" r="10" fill="#FGCOLOR" opacity="0.1"/>
    </svg>
  `, '#f0f7ff', '#0056D2'),
  
  'edx': generatePatternDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" fill="#BGCOLOR"/>
      <path d="M0 20H100M0 40H100M0 60H100M0 80H100" stroke="#FGCOLOR" stroke-width="2" opacity="0.1"/>
    </svg>
  `, '#f5f5f5', '#000B1D'),
  
  'udemy': generatePatternDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" fill="#BGCOLOR"/>
      <circle cx="50" cy="50" r="30" fill="#FGCOLOR" opacity="0.05"/>
      <circle cx="50" cy="50" r="20" fill="#FGCOLOR" opacity="0.05"/>
      <circle cx="50" cy="50" r="10" fill="#FGCOLOR" opacity="0.05"/>
    </svg>
  `, '#faf5ff', '#A435F0'),
  
  'google-digital-garage': generatePatternDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" fill="#BGCOLOR"/>
      <rect x="10" y="10" width="20" height="20" fill="#4285F4" opacity="0.1"/>
      <rect x="40" y="10" width="20" height="20" fill="#34A853" opacity="0.1"/>
      <rect x="70" y="10" width="20" height="20" fill="#FBBC05" opacity="0.1"/>
      <rect x="10" y="40" width="20" height="20" fill="#EA4335" opacity="0.1"/>
      <rect x="40" y="40" width="20" height="20" fill="#4285F4" opacity="0.1"/>
      <rect x="70" y="40" width="20" height="20" fill="#34A853" opacity="0.1"/>
      <rect x="10" y="70" width="20" height="20" fill="#FBBC05" opacity="0.1"/>
      <rect x="40" y="70" width="20" height="20" fill="#EA4335" opacity="0.1"/>
      <rect x="70" y="70" width="20" height="20" fill="#4285F4" opacity="0.1"/>
    </svg>
  `, '#ffffff', '#4285F4'),
  
  'linkedin-learning': generatePatternDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" fill="#BGCOLOR"/>
      <path d="M20 20L80 80M80 20L20 80" stroke="#FGCOLOR" stroke-width="2" opacity="0.1"/>
      <rect x="35" y="35" width="30" height="30" rx="4" stroke="#FGCOLOR" stroke-width="2" opacity="0.1"/>
    </svg>
  `, '#f0f7ff', '#0A66C2'),
  
  'infosys-springboard': generatePatternDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" fill="#BGCOLOR"/>
      <circle cx="20" cy="20" r="10" fill="#FGCOLOR" opacity="0.1"/>
      <circle cx="50" cy="20" r="10" fill="#FGCOLOR" opacity="0.1"/>
      <circle cx="80" cy="20" r="10" fill="#FGCOLOR" opacity="0.1"/>
      <circle cx="20" cy="50" r="10" fill="#FGCOLOR" opacity="0.1"/>
      <circle cx="50" cy="50" r="10" fill="#FGCOLOR" opacity="0.1"/>
      <circle cx="80" cy="50" r="10" fill="#FGCOLOR" opacity="0.1"/>
      <circle cx="20" cy="80" r="10" fill="#FGCOLOR" opacity="0.1"/>
      <circle cx="50" cy="80" r="10" fill="#FGCOLOR" opacity="0.1"/>
      <circle cx="80" cy="80" r="10" fill="#FGCOLOR" opacity="0.1"/>
    </svg>
  `, '#e6f2ff', '#007CC3'),
  
  'great-learning-academy': generatePatternDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" fill="#BGCOLOR"/>
      <path d="M0 0L100 100M20 0L100 80M40 0L100 60M60 0L100 40M80 0L100 20M0 20L80 100M0 40L60 100M0 60L40 100M0 80L20 100" stroke="#FGCOLOR" stroke-width="1" opacity="0.1"/>
    </svg>
  `, '#fff8f5', '#FF7F3F'),
  
  'nptel-(swayam)': generatePatternDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" fill="#BGCOLOR"/>
      <circle cx="50" cy="50" r="40" stroke="#C70039" stroke-width="1" opacity="0.1"/>
      <circle cx="50" cy="50" r="30" stroke="#C70039" stroke-width="1" opacity="0.1"/>
      <circle cx="50" cy="50" r="20" stroke="#C70039" stroke-width="1" opacity="0.1"/>
      <circle cx="50" cy="50" r="10" stroke="#C70039" stroke-width="1" opacity="0.1"/>
      <path d="M30 50H70M50 30V70" stroke="#F5A700" stroke-width="1" opacity="0.1"/>
    </svg>
  `, '#ffffff', '#C70039'),
  
  'futurelearn': generatePatternDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" fill="#BGCOLOR"/>
      <rect x="10" y="20" width="80" height="10" fill="#FGCOLOR" opacity="0.1"/>
      <rect x="10" y="40" width="60" height="10" fill="#FGCOLOR" opacity="0.1"/>
      <rect x="10" y="60" width="70" height="10" fill="#FGCOLOR" opacity="0.1"/>
      <rect x="80" y="40" width="10" height="10" fill="#FGCOLOR" opacity="0.1"/>
      <rect x="70" y="60" width="20" height="10" fill="#FGCOLOR" opacity="0.1"/>
    </svg>
  `, '#fff0fb', '#DE00A5'),
  
  'alison': generatePatternDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" fill="#BGCOLOR"/>
      <path d="M30 70L50 30L70 70H30Z" stroke="#FGCOLOR" stroke-width="2" opacity="0.1"/>
      <path d="M20 80L50 20L80 80H20Z" stroke="#FGCOLOR" stroke-width="2" opacity="0.1"/>
    </svg>
  `, '#f5f5f8', '#41D6C3'),
  
  'khan-academy': generatePatternDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" fill="#BGCOLOR"/>
      <path d="M80 40L50 20L30 40L50 60L80 40Z" fill="#FGCOLOR" opacity="0.1"/>
      <path d="M50 60L30 40L20 50L30 80L50 60Z" fill="#FGCOLOR" opacity="0.1"/>
      <path d="M50 60L30 80L70 90L80 40L50 60Z" fill="#FGCOLOR" opacity="0.1"/>
    </svg>
  `, '#e6faf6', '#14BF96'),
  
  'skillup-by-simplilearn': generatePatternDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" fill="#BGCOLOR"/>
      <path d="M20 30L40 50L20 70" stroke="#FGCOLOR" stroke-width="2" opacity="0.1"/>
      <path d="M70 70L80 80L70 90" stroke="#FGCOLOR" stroke-width="2" opacity="0.1"/>
      <path d="M40 50L50 60L80 20" stroke="#FGCOLOR" stroke-width="2" opacity="0.1"/>
    </svg>
  `, '#fff5f0', '#F26C0D')
};

export default platformPatterns; 