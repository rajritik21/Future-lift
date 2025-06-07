import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const CareerGuidancePage = () => {
  const careerPaths = [
    {
      id: 1,
      title: 'Information Technology',
      description: 'Build the future with code and technology',
      paths: ['Software Developer', 'Data Scientist', 'UX/UI Designer', 'Cloud Engineer', 'DevOps Specialist', 'AI/ML Engineer'],
      icon: '💻'
    },
    {
      id: 2,
      title: 'Finance & Accounting',
      description: 'Shape financial futures and drive business growth',
      paths: ['Chartered Accountant', 'Investment Banker', 'Risk Analyst', 'Financial Advisor', 'FinTech Developer', 'Financial Controller'],
      icon: '💰'
    },
    {
      id: 3,
      title: 'Marketing & Growth',
      description: 'Drive business success through strategic marketing',
      paths: ['Digital Marketer', 'SEO Specialist', 'Brand Manager', 'Content Strategist', 'Growth Hacker', 'Marketing Analyst'],
      icon: '📢'
    },
    {
      id: 4,
      title: 'Creative & Design',
      description: 'Create beautiful and functional digital experiences',
      paths: ['Graphic Designer', 'UI/UX Designer', 'Product Designer', 'Motion Graphics Artist', 'Illustrator', '3D Designer'],
      icon: '🎨'
    },
    {
      id: 5,
      title: 'Healthcare & Bio Sciences',
      description: 'Impact lives through healthcare innovation',
      paths: ['Clinical Research Associate', 'Healthcare Administrator', 'Biomedical Engineer', 'Public Health Analyst', 'Health IT Specialist', 'Medical Data Scientist'],
      icon: '⚕️'
    }
  ];

  const features = [
    {
      icon: '🔍',
      title: 'Discover Your Ideal Career',
      description: 'Unlock your potential with tools designed to match your skills, interests, and personality with the right career paths.',
      points: [
        'Take smart assessments to uncover hidden strengths',
        'Explore roles that align with your preferences and values',
        "Find careers you'll actually enjoy and excel in"
      ]
    },
    {
      icon: '📊',
      title: 'Explore Trending Job Roles & Growing Industries',
      description: 'Stay ahead by knowing where the world of work is heading.',
      points: [
        'Get insights into fast-growing industries (AI, FinTech, Green Energy, etc.)',
        'Learn about in-demand skills, emerging job roles, and changing salary trends',
        'Make choices based on real market data, not just assumptions'
      ]
    },
    {
      icon: '🗺️',
      title: 'Step-by-Step Career Roadmaps',
      description: 'Know exactly what to learn, when, and why.',
      points: [
        'Career journeys from beginner to expert level',
        'Essential skills, tools, and certifications for each stage',
        'Guidance tailored for specific domains'
      ]
    },
    {
      icon: '🛠️',
      title: 'Build, Switch, and Grow',
      description: 'We provide actionable resources for every stage of your professional journey.',
      points: [
        'Create standout resumes & LinkedIn profiles',
        'Fill skill gaps with curated upskilling resources',
        'Transition careers smoothly — even between industries',
        'Access guides on freelancing, remote work, entrepreneurship & more'
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <Helmet>
        <title>Career Guidance | FutureLift Job Portal</title>
        <meta name="description" content="Find your path and shape your future with personalized career guidance. Explore different career options based on your skills." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            🎯 Career Guidance
          </h1>
          <p className="text-xl text-primary-600 font-semibold">
            Find Your Path. Shape Your Future. Succeed with Clarity.
          </p>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Whether you're a student, recent graduate, or working professional planning your next step — we're here to help you make informed, confident career decisions.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Main Features Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="p-8">
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <div key={index} className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                    <div className="flex items-start">
                      <span className="text-3xl mr-4">{feature.icon}</span>
                  <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                        <ul className="space-y-2">
                          {feature.points.map((point, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-500 mr-2">✔️</span>
                              <span className="text-gray-700">{point}</span>
                            </li>
                          ))}
                        </ul>
                  </div>
                </div>
                  </div>
                ))}
              </div>
              
              {/* Mentorship Section */}
              <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <div className="text-3xl mr-4">👨‍🏫</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">1-on-1 Mentorship (Coming Soon)</h3>
                    <p className="text-gray-700 mt-2">
                      Ask questions. Get answers. Grow with guidance.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✔️</span>
                        <span>Book personalized sessions with professionals from your dream industry</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✔️</span>
                        <span>Gain resume feedback, career insights, interview prep, and more</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        📥 Join the waitlist now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Career Paths Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">🔥 Popular Career Paths & Roadmaps</h2>
              
              <div className="space-y-6">
                {careerPaths.map((career) => (
                  <div key={career.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="bg-gray-50 p-4 border-b flex items-center justify-between">
                      <div className="flex items-center">
                      <span className="text-3xl mr-3">{career.icon}</span>
                        <div>
                      <h3 className="text-xl font-semibold text-gray-800">{career.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{career.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {career.paths.map((path, index) => (
                          <li key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-sm">
                            <div className="flex items-start mb-2">
                              <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                              <div>
                                <span className="text-gray-800 font-medium">{path}</span>
                                
                                {/* Career descriptions */}
                                {career.id === 1 && index === 0 && (
                                  <p className="text-xs text-gray-600 mt-1">Create, test and maintain software applications. $75k-$140k/yr.</p>
                                )}
                                {career.id === 1 && index === 1 && (
                                  <p className="text-xs text-gray-600 mt-1">Analyze data and build predictive models. $90k-$160k/yr.</p>
                                )}
                                {career.id === 1 && index === 2 && (
                                  <p className="text-xs text-gray-600 mt-1">Design intuitive and beautiful user interfaces. $70k-$130k/yr.</p>
                                )}
                                {career.id === 1 && index === 3 && (
                                  <p className="text-xs text-gray-600 mt-1">Build and maintain cloud infrastructure. $85k-$150k/yr.</p>
                                )}
                                {career.id === 1 && index === 4 && (
                                  <p className="text-xs text-gray-600 mt-1">Integrate development and operations processes. $85k-$145k/yr.</p>
                                )}
                                {career.id === 1 && index === 5 && (
                                  <p className="text-xs text-gray-600 mt-1">Build and deploy machine learning and AI models. $95k-$170k/yr.</p>
                                )}
                                
                                {career.id === 2 && index === 0 && (
                                  <p className="text-xs text-gray-600 mt-1">Prepare and examine financial records. $60k-$120k/yr.</p>
                                )}
                                {career.id === 2 && index === 1 && (
                                  <p className="text-xs text-gray-600 mt-1">Facilitate financial transactions and mergers. $85k-$200k+/yr.</p>
                                )}
                                {career.id === 2 && index === 2 && (
                                  <p className="text-xs text-gray-600 mt-1">Identify and mitigate financial risks. $70k-$140k/yr.</p>
                                )}
                                {career.id === 2 && index === 3 && (
                                  <p className="text-xs text-gray-600 mt-1">Provide investment and financial guidance. $65k-$150k/yr.</p>
                                )}
                                {career.id === 2 && index === 4 && (
                                  <p className="text-xs text-gray-600 mt-1">Build technology for finance applications. $80k-$160k/yr.</p>
                                )}
                                {career.id === 2 && index === 5 && (
                                  <p className="text-xs text-gray-600 mt-1">Manage financial operations and reporting. $90k-$150k/yr.</p>
                                )}
                                
                                {career.id === 3 && index === 0 && (
                                  <p className="text-xs text-gray-600 mt-1">Execute digital campaigns across platforms. $55k-$110k/yr.</p>
                                )}
                                {career.id === 3 && index === 1 && (
                                  <p className="text-xs text-gray-600 mt-1">Optimize content for search engines. $50k-$100k/yr.</p>
                                )}
                                {career.id === 3 && index === 2 && (
                                  <p className="text-xs text-gray-600 mt-1">Develop and maintain brand identity. $75k-$150k/yr.</p>
                                )}
                                {career.id === 3 && index === 3 && (
                                  <p className="text-xs text-gray-600 mt-1">Create content aligned with business goals. $60k-$120k/yr.</p>
                                )}
                                {career.id === 3 && index === 4 && (
                                  <p className="text-xs text-gray-600 mt-1">Find rapid ways to grow business metrics. $70k-$160k/yr.</p>
                                )}
                                {career.id === 3 && index === 5 && (
                                  <p className="text-xs text-gray-600 mt-1">Analyze marketing data and campaign performance. $65k-$120k/yr.</p>
                                )}
                                
                                {career.id === 4 && index === 0 && (
                                  <p className="text-xs text-gray-600 mt-1">Create visual content for various media. $50k-$100k/yr.</p>
                                )}
                                {career.id === 4 && index === 1 && (
                                  <p className="text-xs text-gray-600 mt-1">Design intuitive user interfaces. $70k-$130k/yr.</p>
                                )}
                                {career.id === 4 && index === 2 && (
                                  <p className="text-xs text-gray-600 mt-1">Lead end-to-end product design process. $80k-$150k/yr.</p>
                                )}
                                {career.id === 4 && index === 3 && (
                                  <p className="text-xs text-gray-600 mt-1">Create animations for digital media. $60k-$120k/yr.</p>
                                )}
                                {career.id === 4 && index === 4 && (
                                  <p className="text-xs text-gray-600 mt-1">Produce custom illustrations. $45k-$95k/yr.</p>
                                )}
                                {career.id === 4 && index === 5 && (
                                  <p className="text-xs text-gray-600 mt-1">Design 3D models and environments. $60k-$120k/yr.</p>
                                )}
                                
                                {career.id === 5 && index === 0 && (
                                  <p className="text-xs text-gray-600 mt-1">Manage clinical trials and research. $65k-$120k/yr.</p>
                                )}
                                {career.id === 5 && index === 1 && (
                                  <p className="text-xs text-gray-600 mt-1">Manage operations of healthcare facilities. $70k-$140k/yr.</p>
                                )}
                                {career.id === 5 && index === 2 && (
                                  <p className="text-xs text-gray-600 mt-1">Design medical devices and equipment. $75k-$130k/yr.</p>
                                )}
                                {career.id === 5 && index === 3 && (
                                  <p className="text-xs text-gray-600 mt-1">Study health trends and improve community health. $60k-$115k/yr.</p>
                                )}
                                {career.id === 5 && index === 4 && (
                                  <p className="text-xs text-gray-600 mt-1">Apply IT solutions to healthcare challenges. $70k-$125k/yr.</p>
                                )}
                                {career.id === 5 && index === 5 && (
                                  <p className="text-xs text-gray-600 mt-1">Analyze and interpret medical data for insights. $85k-$150k/yr.</p>
                                )}
                                
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {/* IT Tags */}
                                  {index === 0 && career.id === 1 && (
                                    <>
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Coding</span>
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Problem Solving</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Entry to Senior</span>
                                    </>
                                  )}
                                  {index === 1 && career.id === 1 && (
                                    <>
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Analytics</span>
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">ML/AI</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Mid to Senior</span>
                                    </>
                                  )}
                                  {index === 2 && career.id === 1 && (
                                    <>
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Design</span>
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">User Research</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Entry to Senior</span>
                                    </>
                                  )}
                                  {index === 3 && career.id === 1 && (
                                    <>
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Infrastructure</span>
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">AWS/Azure</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Mid to Senior</span>
                                    </>
                                  )}
                                  {index === 4 && career.id === 1 && (
                                    <>
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">CI/CD</span>
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Automation</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Mid to Senior</span>
                                    </>
                                  )}
                                  {index === 5 && career.id === 1 && (
                                    <>
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Machine Learning</span>
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">AI</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Mid to Senior</span>
                                    </>
                                  )}
                                  
                                  {/* Finance tags */}
                                  {index === 0 && career.id === 2 && (
                                    <>
                                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Accounting</span>
                                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Taxation</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Entry to Senior</span>
                                    </>
                                  )}
                                  {index === 1 && career.id === 2 && (
                                    <>
                                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Markets</span>
                                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Deals</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Mid to Senior</span>
                                    </>
                                  )}
                                  
                                  {index === 5 && career.id === 2 && (
                                    <>
                                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Accounting</span>
                                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Leadership</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Mid to Senior</span>
                                    </>
                                  )}
                                  
                                  {/* Marketing tags */}
                                  {index === 0 && career.id === 3 && (
                                    <>
                                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">PPC</span>
                                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Social Media</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Entry to Mid</span>
                                    </>
                                  )}
                                  {index === 2 && career.id === 3 && (
                                    <>
                                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Brand Strategy</span>
                                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Market Analysis</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Mid to Senior</span>
                                    </>
                                  )}
                                  
                                  {index === 5 && career.id === 3 && (
                                    <>
                                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Data</span>
                                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Analytics</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Mid Level</span>
                                    </>
                                  )}
                                  
                                  {/* Design tags */}
                                  {index === 0 && career.id === 4 && (
                                    <>
                                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">Visual Design</span>
                                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">Branding</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Entry to Senior</span>
                                    </>
                                  )}
                                  {index === 1 && career.id === 4 && (
                                    <>
                                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">User Experience</span>
                                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">Wireframing</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Entry to Senior</span>
                                    </>
                                  )}
                                  
                                  {index === 5 && career.id === 4 && (
                                    <>
                                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">3D Modeling</span>
                                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">Blender/Maya</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Mid to Senior</span>
                                    </>
                                  )}
                                  
                                  {/* Healthcare tags */}
                                  {index === 0 && career.id === 5 && (
                                    <>
                                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Clinical Trials</span>
                                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Data Analysis</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Entry to Mid</span>
                                    </>
                                  )}
                                  {index === 2 && career.id === 5 && (
                                    <>
                                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Medical Devices</span>
                                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">R&D</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Mid to Senior</span>
                                    </>
                                  )}
                                  {index === 5 && career.id === 5 && (
                                    <>
                                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Medical Data</span>
                                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">ML/AI</span>
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Mid to Senior</span>
                                    </>
                                  )}
                                </div>
                                
                                {/* Add career stats */}
                                <div className="mt-3 pt-2 border-gray-200 grid grid-cols-3 gap-1 border-t">
                                  <div className="text-xs flex items-center">
                                    <span className="text-gray-500 mr-1">Growth:</span>
                                    {(career.id === 1 && (index === 0 || index === 1)) || (career.id === 5 && index === 0) ? (
                                      <span className="text-green-600 font-medium">High 📈</span>
                                    ) : (career.id === 1 && (index === 2 || index === 3)) || (career.id === 3 && index === 0) ? (
                                      <span className="text-green-600 font-medium">Medium 📊</span>
                                    ) : (
                                      <span className="text-yellow-600 font-medium">Stable 📉</span>
                                    )}
                                  </div>
                                  <div className="text-xs flex items-center">
                                    <span className="text-gray-500 mr-1">Remote:</span>
                                    {(career.id === 1) || (career.id === 3 && (index === 0 || index === 1)) || (career.id === 4 && (index === 0 || index === 1)) ? (
                                      <span className="text-green-600 font-medium">High ✓</span>
                                    ) : (career.id === 2 && index !== 1) || (career.id === 3 && index === 2) || (career.id === 5 && index === 0) ? (
                                      <span className="text-yellow-600 font-medium">Medium</span>
                                    ) : (
                                      <span className="text-red-600 font-medium">Limited</span>
                                    )}
                                  </div>
                                  <div className="text-xs flex items-center">
                                    <span className="text-gray-500 mr-1">Learning:</span>
                                    {(career.id === 1 && index === 0) || (career.id === 4 && index === 0) ? (
                                      <span className="text-yellow-600 font-medium">Moderate</span>
                                    ) : (career.id === 1 && (index === 1 || index === 3 || index === 4 || index === 5)) || (career.id === 2 && (index === 0 || index === 1)) ? (
                                      <span className="text-red-600 font-medium">Steep</span>
                                    ) : (
                                      <span className="text-green-600 font-medium">Gentle</span>
                                    )}
                                  </div>
                                  <div className="text-xs flex items-center col-span-3 mt-1">
                                    <span className="text-gray-500 mr-1">Key Skills:</span>
                                    {career.id === 1 && index === 0 && (
                                      <span className="font-medium">Python, Java, JavaScript, Git</span>
                                    )}
                                    {career.id === 1 && index === 1 && (
                                      <span className="font-medium">Python, R, SQL, Statistics</span>
                                    )}
                                    {career.id === 1 && index === 2 && (
                                      <span className="font-medium">Figma, Adobe XD, HTML/CSS</span>
                                    )}
                                    {career.id === 1 && index === 3 && (
                                      <span className="font-medium">AWS, Azure, Terraform</span>
                                    )}
                                    {career.id === 1 && index === 4 && (
                                      <span className="font-medium">Docker, Kubernetes, CI/CD</span>
                                    )}
                                    {career.id === 1 && index === 5 && (
                                      <span className="font-medium">TensorFlow, PyTorch, Deep Learning</span>
                                    )}
                                    
                                    {career.id === 2 && index === 0 && (
                                      <span className="font-medium">Accounting, Tax, Excel</span>
                                    )}
                                    {career.id === 2 && index === 1 && (
                                      <span className="font-medium">Finance, Valuation, M&A</span>
                                    )}
                                    {career.id === 2 && index === 2 && (
                                      <span className="font-medium">Risk Models, Compliance</span>
                                    )}
                                    {career.id === 2 && index === 3 && (
                                      <span className="font-medium">Financial Planning, CFP</span>
                                    )}
                                    {career.id === 2 && index === 4 && (
                                      <span className="font-medium">Finance + Programming</span>
                                    )}
                                    {career.id === 2 && index === 5 && (
                                      <span className="font-medium">Financial Reporting, Management</span>
                                    )}
                                    
                                    {career.id === 3 && index === 0 && (
                                      <span className="font-medium">Analytics, Content, SEM</span>
                                    )}
                                    {career.id === 3 && index === 1 && (
                                      <span className="font-medium">Keywords, Technical SEO</span>
                                    )}
                                    {career.id === 3 && index === 2 && (
                                      <span className="font-medium">Strategy, Consumer Psych</span>
                                    )}
                                    {career.id === 3 && index === 3 && (
                                      <span className="font-medium">Writing, Strategy, SEO</span>
                                    )}
                                    {career.id === 3 && index === 4 && (
                                      <span className="font-medium">Analytics, A/B Testing</span>
                                    )}
                                    {career.id === 3 && index === 5 && (
                                      <span className="font-medium">Data Analysis, Reporting, Excel</span>
                                    )}
                                    
                                    {career.id === 4 && index === 0 && (
                                      <span className="font-medium">Adobe CC, Typography</span>
                                    )}
                                    {career.id === 4 && index === 1 && (
                                      <span className="font-medium">Figma, Prototyping, UX</span>
                                    )}
                                    {career.id === 4 && index === 2 && (
                                      <span className="font-medium">UI/UX, Research, Strategy</span>
                                    )}
                                    {career.id === 4 && index === 3 && (
                                      <span className="font-medium">After Effects, 3D, Motion</span>
                                    )}
                                    {career.id === 4 && index === 4 && (
                                      <span className="font-medium">Drawing, Digital Painting</span>
                                    )}
                                    {career.id === 4 && index === 5 && (
                                      <span className="font-medium">Blender, Maya, 3D Modeling</span>
                                    )}
                                    
                                    {career.id === 5 && index === 0 && (
                                      <span className="font-medium">Data, Protocol, Research</span>
                                    )}
                                    {career.id === 5 && index === 1 && (
                                      <span className="font-medium">Operations, Healthcare</span>
                                    )}
                                    {career.id === 5 && index === 2 && (
                                      <span className="font-medium">Engineering, Medical, Design</span>
                                    )}
                                    {career.id === 5 && index === 3 && (
                                      <span className="font-medium">Epi, Stats, Public Health</span>
                                    )}
                                    {career.id === 5 && index === 4 && (
                                      <span className="font-medium">Healthcare, IT Systems</span>
                                    )}
                                    {career.id === 5 && index === 5 && (
                                      <span className="font-medium">Python, Statistics, Healthcare</span>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Recommended Resources */}
                                {(career.id === 1 && (index === 0 || index === 1)) || 
                                 (career.id === 2 && (index === 0 || index === 1)) || 
                                 (career.id === 3 && (index === 0 || index === 2)) || 
                                 (career.id === 4 && (index === 0 || index === 1)) || 
                                 (career.id === 5 && (index === 0 || index === 2)) ? (
                                  <div className="mt-2 text-xs">
                                    <span className="text-primary-600 cursor-pointer hover:underline">View Learning Path →</span>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex justify-center">
                        {career.id === 1 ? (
                          <a 
                            href="https://www.geeksforgeeks.org/top-it-career-paths/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none transition-colors duration-200"
                          >
                            📍 View Detailed Information Technology Roadmap
                            <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </a>
                        ) : career.id === 2 ? (
                          <a 
                            href="https://corporatefinanceinstitute.com/resources/career-map/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none transition-colors duration-200"
                          >
                            📍 View Detailed Finance & Accounting Roadmap
                            <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </a>
                        ) : career.id === 3 ? (
                          <a 
                            href="https://www.coursera.org/resources/job-leveling-matrix-for-digital-marketing-career-pathways"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none transition-colors duration-200"
                          >
                            📍 View Detailed Marketing & Growth Roadmap
                            <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </a>
                        ) : career.id === 4 ? (
                          <a 
                            href="https://www.indeed.com/career-advice/finding-a-job/careers-in-design-and-technology"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none transition-colors duration-200"
                          >
                            📍 View Detailed Creative & Design Roadmap
                            <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </a>
                        ) : career.id === 5 ? (
                          <a 
                            href="https://www.biotecnika.org/2025/05/biotech-career-after-college-best-career-guide-for-graduates/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none transition-colors duration-200"
                          >
                            📍 View Detailed Healthcare & Bio Sciences Roadmap
                            <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </a>
                        ) : (
                          <Link 
                            to={`/resources/career-paths/${career.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none transition-colors duration-200"
                          >
                            📍 View Detailed {career.title.split(' ')[0]} Roadmap
                            <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-100 px-8 py-4">
              <div className="flex flex-wrap justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Related Resources</h4>
                  <div className="mt-2 space-x-3">
                    <Link to="/resources/resume-tips" className="text-primary-600 hover:text-primary-800 font-medium">Resume Tips</Link>
                    <Link to="/resources/interview-tips" className="text-primary-600 hover:text-primary-800 font-medium">Interview Tips</Link>
                    <Link to="/resources/free-courses" className="text-primary-600 hover:text-primary-800 font-medium">Free Courses</Link>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Link 
                    to="/contact" 
                    className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
                  >
                    Need personalized career guidance?
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

export default CareerGuidancePage; 