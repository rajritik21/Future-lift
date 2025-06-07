import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { platformLogos } from '../assets/platform-logos/PlatformLogos';
import { platformPatterns } from '../utils/backgroundPatterns';

const FreeCoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('courses'); // 'courses' or 'platforms'
  
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'tech', name: 'Technology' },
    { id: 'soft', name: 'Soft Skills' },
    { id: 'career', name: 'Career Development' },
    { id: 'design', name: 'Design' },
    { id: 'business', name: 'Business' }
  ];
  
  // Platform data for free courses and certifications
  const platforms = [
    {
      id: 1,
      name: 'Coursera',
      description: 'Free with audit / financial aid. Courses from top universities like Stanford, Google, Meta, IBM.',
      link: 'https://www.coursera.org/courses?query=free',
      categories: ['Tech', 'Business', 'Science', 'Arts', 'Health'],
      highlight: 'Financial aid available for certificates',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 2,
      name: 'edX',
      description: 'Free to audit, pay for certificate. Harvard, MIT, Microsoft – strong academic focus.',
      link: 'https://www.edx.org/search?tab=course',
      categories: ['Computer Science', 'Business', 'Engineering', 'Humanities'],
      highlight: 'University-grade courses',
      color: 'from-red-500 to-red-700'
    },
    {
      id: 3,
      name: 'Udemy',
      description: 'Often offers free coupons. Variety of tech & non-tech courses – search for free ones.',
      link: 'https://www.udemy.com/courses/free/',
      categories: ['Development', 'IT', 'Business', 'Design', 'Marketing'],
      highlight: 'Wide variety of practical skills',
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: 4,
      name: 'Google Digital Garage',
      description: 'Free certifications on digital marketing, career skills, etc.',
      link: 'https://learndigital.withgoogle.com/digitalgarage/',
      categories: ['Digital Marketing', 'Career Development', 'Data'],
      highlight: 'Google-recognized certificates',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 5,
      name: 'LinkedIn Learning',
      description: '1-month free trial. Career development, tech, soft skills.',
      link: 'https://www.linkedin.com/learning/',
      categories: ['Software', 'Business', 'Creative'],
      highlight: 'Certificates display on LinkedIn profile',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 6,
      name: 'Infosys Springboard',
      description: '100% free. Tech-focused courses with certifications – ideal for students.',
      link: 'https://infyspringboard.onwingspan.com/web/en/page/home',
      categories: ['Programming', 'Cloud', 'Cybersecurity'],
      highlight: 'Industry-aligned tech content',
      color: 'from-green-500 to-green-700'
    },
    {
      id: 7,
      name: 'Great Learning Academy',
      description: 'Free IT and software courses with certificates.',
      link: 'https://www.mygreatlearning.com/academy',
      categories: ['Data Science', 'Cloud', 'AI/ML', 'Programming'],
      highlight: 'Focused on in-demand tech skills',
      color: 'from-indigo-500 to-indigo-700'
    },
    {
      id: 8,
      name: 'NPTEL (SWAYAM)',
      description: 'Government of India initiative – courses from IITs & IISc.',
      link: 'https://swayam.gov.in/NPTEL',
      categories: ['Engineering', 'Science', 'Management', 'Humanities'],
      highlight: 'Government-recognized certificates',
      color: 'from-orange-500 to-orange-700'
    },
    {
      id: 9,
      name: 'FutureLearn',
      description: 'UK-based – free short courses and upgrade options.',
      link: 'https://www.futurelearn.com/courses',
      categories: ['Business', 'Healthcare', 'Science', 'Teaching'],
      highlight: 'Short courses from UK universities',
      color: 'from-pink-500 to-pink-700'
    },
    {
      id: 10,
      name: 'Alison',
      description: 'Free certificates on business, tech, language, etc.',
      link: 'https://alison.com/',
      categories: ['IT', 'Business', 'Health', 'Languages'],
      highlight: 'Diploma and certificate courses',
      color: 'from-green-600 to-green-800'
    },
    {
      id: 11,
      name: 'Khan Academy',
      description: 'Basic subjects – good for beginners (not certification-focused).',
      link: 'https://www.khanacademy.org/',
      categories: ['Math', 'Science', 'Computing', 'Economics'],
      highlight: 'Great for fundamentals',
      color: 'from-teal-500 to-teal-700'
    },
    {
      id: 12,
      name: 'SkillUp by Simplilearn',
      description: 'Free learning paths with certificates.',
      link: 'https://www.simplilearn.com/skillup-free-online-courses',
      categories: ['Digital Marketing', 'Data Science', 'Project Management'],
      highlight: 'Career-oriented learning paths',
      color: 'from-cyan-500 to-cyan-700'
    }
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
      title: 'Microsoft for Java Developers',
      provider: 'Microsoft',
      category: 'tech',
      image: '/images/courses/java.jpg',
      duration: '8 weeks',
      level: 'Intermediate',
      rating: 4.8,
      description: 'Learn how to develop Java applications and services with Microsoft technologies and tools.',
      link: 'https://learn.microsoft.com/en-gb/java/',
      tags: ['Java', 'Azure', 'OpenJDK']
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
      link: 'https://www.coursera.org/specializations/digital-marketing',
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
    },
    {
      id: 9,
      title: 'Machine Learning Specialization',
      provider: 'Stanford & DeepLearning.AI',
      category: 'tech',
      image: '/images/courses/ml.jpg',
      duration: '2 months',
      level: 'Beginner',
      rating: 4.9,
      description: 'Master fundamental AI concepts and develop practical machine learning skills in this 3-course program by Andrew Ng.',
      link: 'https://www.coursera.org/specializations/machine-learning-introduction',
      tags: ['Machine Learning', 'AI', 'Python', 'TensorFlow']
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
        <style>
        {`
          .hover-glow:hover {
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
          }
          
          .tag-animate:hover {
            transform: translateY(-3px);
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          
          .platform-header {
            background-size: 400% 400%;
            animation: gradientAnimation 15s ease infinite;
          }
          
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          
          .text-stroke {
            -webkit-text-stroke: 1px rgba(255,255,255,0.3);
          }
        `}
        </style>
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
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-8 justify-center">
            <button
              onClick={() => setSelectedTab('courses')}
              className={`px-6 py-3 font-medium text-lg ${
                selectedTab === 'courses'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Free Courses
            </button>
            <button
              onClick={() => setSelectedTab('platforms')}
              className={`px-6 py-3 font-medium text-lg ${
                selectedTab === 'platforms'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Learning Platforms
            </button>
          </div>
          
          {selectedTab === 'courses' ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              {/* Decorative header with pattern */}
              <div className="h-24 bg-gradient-to-r from-primary-500 to-indigo-600 relative overflow-hidden platform-header">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <h2 className="text-7xl font-extrabold text-white text-stroke uppercase tracking-wider">Free Courses</h2>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-6">
                  <h2 className="text-2xl font-bold text-white">Upskill with hand-picked free resources</h2>
                  <div className="bg-white rounded-full p-2">
                    <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mb-8">
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
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
                  
                  <div className="relative mx-auto md:mx-0">
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
                    {filteredCourses.map((course, index) => (
                      <div 
                        key={course.id} 
                        className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] flex flex-col bg-white hover-glow"
                      >
                        <div className="h-48 overflow-hidden relative">
                          {/* Replace image with stylized course title and provider logo */}
                          <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-r 
                            ${course.category === 'tech' ? 'from-blue-500 to-indigo-600' : 
                             course.category === 'design' ? 'from-purple-500 to-pink-600' :
                             course.category === 'business' ? 'from-green-500 to-emerald-600' :
                             course.category === 'soft' ? 'from-orange-500 to-amber-600' :
                             course.category === 'career' ? 'from-red-500 to-rose-600' :
                             'from-gray-500 to-slate-600'} platform-header`}>
                            
                            {/* Large stylized course name as background */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                              <h2 className="text-4xl font-extrabold text-white text-stroke uppercase tracking-wider text-center px-4">{course.title}</h2>
                            </div>
                            
                            {/* Provider logo or icon */}
                            <div className="w-20 h-20 bg-white rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center border-4 border-white shadow-lg z-10">
                              {course.id === 9 ? (
                                <img src="https://logo.clearbit.com/coursera.org" alt="Coursera" className="w-12 h-12 object-contain" />
                              ) : course.provider === 'Google' ? (
                                <img src="https://logo.clearbit.com/google.com" alt="Google" className="w-12 h-12 object-contain" />
                              ) : course.provider === 'Microsoft' ? (
                                <img src="https://logo.clearbit.com/microsoft.com" alt="Microsoft" className="w-12 h-12 object-contain" />
                              ) : course.provider === 'Coursera' ? (
                                <img src="https://logo.clearbit.com/coursera.org" alt="Coursera" className="w-12 h-12 object-contain" />
                              ) : course.provider === 'FutureLift' ? (
                                <div className="text-2xl font-bold text-primary-600">FL</div>
                              ) : course.provider === 'LinkedIn Learning' ? (
                                <img src="https://logo.clearbit.com/linkedin.com" alt="LinkedIn" className="w-12 h-12 object-contain" />
                              ) : course.provider === 'AWS' ? (
                                <img src="https://logo.clearbit.com/aws.amazon.com" alt="AWS" className="w-12 h-12 object-contain" />
                              ) : (
                                <div className="text-2xl font-bold text-primary-600">
                                  {course.provider.charAt(0)}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                            <div className="p-4 w-full">
                              <span className="bg-white text-primary-800 text-xs px-2 py-1 rounded-full font-medium">
                                {course.provider}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <div className="mb-2">
                            <h3 className="font-semibold text-lg text-gray-800">{course.title}</h3>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {course.tags.map((tag, index) => (
                              <span 
                                key={index} 
                                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full transition-all duration-300 tag-animate"
                              >
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
                          <div className="mt-auto">
                            <a 
                              href={course.link} 
                              target={course.link.startsWith('http') ? '_blank' : '_self'}
                              rel={course.link.startsWith('http') ? 'noopener noreferrer' : ''}
                              className={`block w-full text-center text-white font-medium py-2 px-4 rounded-md transition-all duration-300 hover:shadow-md bg-gradient-to-r 
                                ${course.category === 'tech' ? 'from-blue-500 to-indigo-600' : 
                                 course.category === 'design' ? 'from-purple-500 to-pink-600' :
                                 course.category === 'business' ? 'from-green-500 to-emerald-600' :
                                 course.category === 'soft' ? 'from-orange-500 to-amber-600' :
                                 course.category === 'career' ? 'from-red-500 to-rose-600' :
                                 'from-primary-500 to-primary-700'}`}
                            >
                              Enroll Now
                            </a>
                          </div>
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
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="p-8">
                <p className="text-gray-700 text-lg mb-6">
                  Top Platforms Offering Free Courses & Certifications:
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {platforms.map((platform, index) => (
                    <div 
                      key={platform.id} 
                      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] flex flex-col bg-white hover-glow"
                    >
                      <div className={`platform-header bg-gradient-to-r ${platform.color} relative h-32 flex items-center justify-center overflow-hidden`}>
                        {/* Large stylized platform name as background */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                          <h2 className="text-6xl font-extrabold text-white text-stroke uppercase tracking-wider">{platform.name}</h2>
                        </div>
                        
                        {/* Centered large logo */}
                        <div className="w-24 h-24 bg-white rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center border-4 border-white shadow-lg z-10 transition-transform duration-300 hover:scale-110">
                          {platform.name === 'Coursera' ? (
                            <img src="https://logo.clearbit.com/coursera.org" alt="Coursera" className="w-16 h-16 object-contain" />
                          ) : platformLogos[platform.name] ? (
                            <div className="w-16 h-16 flex items-center justify-center">
                              {platformLogos[platform.name]}
                            </div>
                          ) : (
                            <div className="text-3xl font-bold text-primary-600">
                              {platform.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-5 pt-3 flex flex-col flex-grow">
                        <h3 className="font-semibold text-lg text-center mb-3">{platform.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {platform.description}
                        </p>
                        <div className="mb-4">
                          <div className="text-sm text-gray-500 mb-1">Categories:</div>
                          <div className="flex flex-wrap gap-2">
                            {platform.categories.map((category, index) => (
                              <span 
                                key={index} 
                                className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs transition-all duration-300 tag-animate"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center mb-4 text-sm">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className="text-gray-700">{platform.highlight}</span>
                        </div>
                        <div className="mt-auto">
                          <a 
                            href={platform.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block w-full text-center bg-gradient-to-r ${platform.color} text-white font-medium py-2 px-4 rounded-md transition-all duration-300 hover:shadow-md`}
                          >
                            Visit Platform
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 bg-yellow-50 p-6 rounded-lg border border-yellow-100">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <div className="bg-yellow-100 rounded-full p-3">
                        <svg className="h-10 w-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">💡 Pro Tips For Free Learning</h3>
                      <p className="text-gray-700">
                        <ul className="list-disc list-inside space-y-1 mt-2">
                          <li>Use the "Audit" option on Coursera to access course content for free</li>
                          <li>Look for "Financial Aid" options on platforms like Coursera and edX</li>
                          <li>Check for limited-time offers on platforms like Udemy</li>
                          <li>Create a learning schedule to stay consistent with your courses</li>
                          <li>Join online communities to find more free resources</li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
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