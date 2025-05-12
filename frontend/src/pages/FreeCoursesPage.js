import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const FreeCoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'tech', name: 'Technology' },
    { id: 'soft', name: 'Soft Skills' },
    { id: 'career', name: 'Career Development' },
    { id: 'design', name: 'Design' },
    { id: 'business', name: 'Business' }
  ];
  
  const courses = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      provider: 'Google',
      category: 'tech',
      image: '/images/courses/web-dev.jpg',
      duration: '6 weeks',
      level: 'Beginner',
      rating: 4.7,
      description: 'Learn HTML, CSS, and JavaScript to build responsive websites from scratch.',
      link: 'https://developers.google.com/web',
      tags: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 2,
      title: 'Python for Data Science',
      provider: 'Microsoft',
      category: 'tech',
      image: '/images/courses/python.jpg',
      duration: '8 weeks',
      level: 'Intermediate',
      rating: 4.8,
      description: 'Master Python programming and essential libraries for data analysis and visualization.',
      link: 'https://docs.microsoft.com/en-us/learn/paths/python-data-science/',
      tags: ['Python', 'Data Science', 'Analytics']
    },
    {
      id: 3,
      title: 'Effective Communication in the Workplace',
      provider: 'Coursera',
      category: 'soft',
      image: '/images/courses/communication.jpg',
      duration: '4 weeks',
      level: 'All Levels',
      rating: 4.5,
      description: 'Improve your communication skills for better workplace relationships and career advancement.',
      link: 'https://www.coursera.org/learn/communication',
      tags: ['Communication', 'Workplace', 'Soft Skills']
    },
    {
      id: 4,
      title: 'Resume Writing & LinkedIn Optimization',
      provider: 'FutureLift',
      category: 'career',
      image: '/images/courses/resume.jpg',
      duration: '2 weeks',
      level: 'Beginner',
      rating: 4.9,
      description: 'Create a standout resume and optimize your LinkedIn profile to attract recruiters.',
      link: '/resources/resume-tips',
      tags: ['Resume', 'LinkedIn', 'Job Search']
    },
    {
      id: 5,
      title: 'UI/UX Design Principles',
      provider: 'Google',
      category: 'design',
      image: '/images/courses/ui-ux.jpg',
      duration: '5 weeks',
      level: 'Intermediate',
      rating: 4.6,
      description: 'Learn user-centered design principles to create intuitive and engaging digital experiences.',
      link: 'https://developers.google.com/design',
      tags: ['UI', 'UX', 'Design Thinking']
    },
    {
      id: 6,
      title: 'Introduction to Cloud Computing',
      provider: 'AWS',
      category: 'tech',
      image: '/images/courses/cloud.jpg',
      duration: '6 weeks',
      level: 'Beginner',
      rating: 4.7,
      description: 'Understand the fundamentals of cloud computing and get started with AWS services.',
      link: 'https://aws.amazon.com/training/digital/',
      tags: ['Cloud', 'AWS', 'Infrastructure']
    },
    {
      id: 7,
      title: 'Digital Marketing Essentials',
      provider: 'Coursera',
      category: 'business',
      image: '/images/courses/marketing.jpg',
      duration: '7 weeks',
      level: 'Beginner',
      rating: 4.5,
      description: 'Learn the core concepts of digital marketing, including SEO, social media, and content strategy.',
      link: 'https://www.coursera.org/learn/digital-marketing',
      tags: ['Marketing', 'SEO', 'Social Media']
    },
    {
      id: 8,
      title: 'Emotional Intelligence at Work',
      provider: 'LinkedIn Learning',
      category: 'soft',
      image: '/images/courses/emotional.jpg',
      duration: '3 weeks',
      level: 'All Levels',
      rating: 4.8,
      description: 'Develop emotional intelligence skills to enhance workplace relationships and leadership effectiveness.',
      link: 'https://www.linkedin.com/learning',
      tags: ['EQ', 'Leadership', 'Self-Awareness']
    }
  ];
  
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <Helmet>
        <title>Free Courses & Certifications | FutureLift Job Portal</title>
        <meta name="description" content="Discover free courses and certifications in web development, data science, soft skills, and more. Upskill yourself and boost your career." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            🎓 Free Courses / Certifications
          </h1>
          <p className="text-xl text-primary-600 font-semibold">
            Learn. Grow. Get Certified – For Free!
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="p-8">
              <p className="text-gray-700 text-lg mb-6">
                Upskill with hand-picked free resources:
              </p>
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mb-8">
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                        selectedCategory === category.id 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
              
              {filteredCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map(course => (
                    <div key={course.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="h-48 overflow-hidden">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg text-gray-800">{course.title}</h3>
                          <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full font-medium">
                            {course.provider}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {course.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            {course.duration}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            {course.level}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            {course.rating}
                          </div>
                        </div>
                        <a 
                          href={course.link} 
                          target={course.link.startsWith('http') ? '_blank' : '_self'}
                          rel={course.link.startsWith('http') ? 'noopener noreferrer' : ''}
                          className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                        >
                          Enroll Now
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No courses found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                  <button 
                    onClick={() => {setSelectedCategory('all'); setSearchTerm('');}}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
            
            <div className="bg-primary-50 p-6 border-t border-primary-100">
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="bg-primary-100 rounded-full p-3">
                    <svg className="h-10 w-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">🎓 Add certificates to your profile instantly!</h3>
                  <p className="text-gray-700 mb-4">
                    Complete any course and earn a certificate to add to your FutureLift profile. Make your profile stand out to potential employers by showcasing your continuous learning journey.
                  </p>
                  <Link
                    to="/dashboard/profile"
                    className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Update your profile with certificates
                    <svg className="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 px-8 py-4">
              <div className="flex flex-wrap justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Related Resources</h4>
                  <div className="mt-2 space-x-3">
                    <Link to="/resources/resume-tips" className="text-primary-600 hover:text-primary-800 font-medium">Resume Tips</Link>
                    <Link to="/resources/career-guidance" className="text-primary-600 hover:text-primary-800 font-medium">Career Guidance</Link>
                    <Link to="/resources/webinars-events" className="text-primary-600 hover:text-primary-800 font-medium">Webinars & Events</Link>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Link 
                    to="/contact" 
                    className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
                  >
                    Suggest a course to add
                    <svg className="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeCoursesPage; 