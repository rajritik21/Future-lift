import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Import company logo components
import { 
  TCSLogo, 
  InfosysLogo, 
  WiproLogo, 
  AccentureLogo, 
  CognizantLogo, 
  HCLLogo 
} from '../assets/company-logos/mock-test/CompanyLogos';

const MockTestsPage = () => {
  const companyTests = [
    {
      id: 1,
      name: 'TCS National Qualifier Test',
      logo: <TCSLogo />,
      duration: '180 minutes',
      sections: ['Verbal Ability', 'Reasoning', 'Quantitative Aptitude', 'Coding'],
      difficulty: 'Medium'
    },
    {
      id: 2,
      name: 'Infosys InfyTQ',
      logo: <InfosysLogo />,
      duration: '180 minutes',
      sections: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Programming'],
      difficulty: 'Medium-Hard'
    },
    {
      id: 3,
      name: 'Wipro NLTH',
      logo: <WiproLogo />,
      duration: '150 minutes',
      sections: ['Aptitude', 'Written Communication', 'Coding Assessment'],
      difficulty: 'Medium'
    },
    {
      id: 4,
      name: 'Accenture Coding Assessment',
      logo: <AccentureLogo />,
      duration: '90 minutes',
      sections: ['Cognitive Ability', 'Technical Assessment', 'Coding Challenge'],
      difficulty: 'Medium-Hard'
    },
    {
      id: 5,
      name: 'Cognizant GenC',
      logo: <CognizantLogo />,
      duration: '120 minutes',
      sections: ['Quantitative Ability', 'Reasoning', 'Verbal Ability', 'Coding'],
      difficulty: 'Medium'
    },
    {
      id: 6,
      name: 'HCL TechBee',
      logo: <HCLLogo />,
      duration: '120 minutes',
      sections: ['Quantitative Ability', 'Logical Reasoning', 'Verbal Ability'],
      difficulty: 'Easy-Medium'
    }
  ];

  const generalTests = [
    {
      id: 1,
      name: 'Aptitude Full Test',
      icon: '📊',
      duration: '60 minutes',
      questions: 50,
      difficulty: 'Varies'
    },
    {
      id: 2,
      name: 'Reasoning Advanced',
      icon: '🧩',
      duration: '45 minutes',
      questions: 30,
      difficulty: 'Hard'
    },
    {
      id: 3,
      name: 'Verbal Ability Comprehensive',
      icon: '📝',
      duration: '30 minutes',
      questions: 40,
      difficulty: 'Medium'
    },
    {
      id: 4,
      name: 'Data Interpretation Challenge',
      icon: '📈',
      duration: '45 minutes',
      questions: 25,
      difficulty: 'Hard'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <Helmet>
        <title>Mock Tests | FutureLift Job Portal</title>
        <meta name="description" content="Practice through full-length mock exams for company-specific tests, aptitude, reasoning, and coding practice." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            📝 Mock Tests
          </h1>
          <p className="text-xl text-primary-600 font-semibold">
            Test Yourself Before the Real Test!
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-10">
          <div className="p-8">
            <p className="text-gray-700 text-lg mb-8">
              Practice through full-length mock exams:
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Company-specific tests</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyTests.map((test) => (
                <div key={test.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-5 border-b bg-gray-50 flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 mr-4 overflow-hidden flex items-center justify-center">
                      {test.logo}
                    </div>
                    <h3 className="font-semibold text-lg">{test.name}</h3>
                  </div>
                  <div className="p-5">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-medium text-gray-800">{test.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Difficulty:</span>
                        <span className="font-medium text-gray-800">{test.difficulty}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Sections:</span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {test.sections.map((section, index) => (
                            <span key={index} className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs">
                              {section}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <Link
                        to={`/resources/mock-tests/${test.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                      >
                        Start Test
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-12">General aptitude and reasoning tests</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {generalTests.map((test) => (
                <div key={test.id} className="flex bg-gray-50 rounded-lg overflow-hidden border hover:shadow-md transition-shadow duration-300">
                  <div className="w-20 flex-shrink-0 flex items-center justify-center bg-primary-100 text-3xl">
                    {test.icon}
                  </div>
                  <div className="flex-grow p-5">
                    <h3 className="font-semibold text-lg mb-2">{test.name}</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{test.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{test.questions} questions</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        <span>{test.difficulty}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link
                        to={`/resources/mock-tests/general/${test.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-primary-600 hover:text-primary-800 font-medium"
                      >
                        Take this test →
                      </Link>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">📊 Get instant scores, explanations, and progress tracking</h3>
                  <p className="text-gray-700 mb-4">
                    Our mock tests provide detailed analytics to help you identify strengths and weaknesses. View performance history across tests and track your improvement over time.
                  </p>
                  <Link
                    to="/resources/mock-tests/dashboard"
                    className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
                  >
                    View your test analytics dashboard
                    <svg className="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 px-8 py-4">
            <div className="flex flex-wrap justify-between items-center">
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Related Resources</h4>
                <div className="mt-2 space-x-3">
                  <Link to="/resources/aptitude-practice" className="text-primary-600 hover:text-primary-800 font-medium">Aptitude Practice</Link>
                  <Link to="/resources/interview-tips" className="text-primary-600 hover:text-primary-800 font-medium">Interview Tips</Link>
                  <Link to="/resources/free-courses" className="text-primary-600 hover:text-primary-800 font-medium">Free Courses</Link>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <Link 
                  to="/contact" 
                  className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
                >
                  Need custom test preparation?
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
  );
};

export default MockTestsPage; 