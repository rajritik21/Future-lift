import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AptitudePracticePage = () => {
  const aptitudeTopics = [
    {
      id: 1,
      title: 'Arithmetic Aptitude',
      description: 'Master mathematical concepts like ratios, averages, interest, and number systems with practice exercises.',
      icon: '🧮',
      color: 'blue',
      link: 'https://www.indiabix.com/aptitude/questions-and-answers/'
    },
    {
      id: 2,
      title: 'Data Interpretation',
      description: 'Analyze charts, graphs, and tables to extract meaningful information and draw conclusions.',
      icon: '📊',
      color: 'green',
      link: 'https://www.indiabix.com/data-interpretation/questions-and-answers/'
    },
    {
      id: 3,
      title: 'Verbal Ability',
      description: 'Enhance your language skills with grammar, vocabulary, reading comprehension, and verbal reasoning exercises.',
      icon: '📝',
      color: 'purple',
      link: 'https://www.indiabix.com/verbal-ability/questions-and-answers/'
    },
    {
      id: 4,
      title: 'Logical Reasoning',
      description: 'Test your critical thinking with logical puzzles, syllogisms, analogies, and pattern recognition problems.',
      icon: '🔄',
      color: 'orange',
      link: 'https://www.indiabix.com/logical-reasoning/questions-and-answers/'
    },
    {
      id: 5,
      title: 'Verbal Reasoning',
      description: 'Develop logical arguments and reasoning skills with various verbal reasoning problems and exercises.',
      icon: '🔤',
      color: 'red',
      link: 'https://www.indiabix.com/verbal-reasoning/questions-and-answers/'
    },
    {
      id: 6,
      title: 'Nonverbal Reasoning',
      description: 'Improve your abstract reasoning with pictorial, diagrammatic, and spatial reasoning tests.',
      icon: '🔢',
      color: 'indigo',
      link: 'https://www.indiabix.com/non-verbal-reasoning/questions-and-answers/'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <Helmet>
        <title>Aptitude Practice | FutureLift Job Portal</title>
        <meta name="description" content="Sharpen your mind with real-test aptitude questions. Practice logical reasoning, quantitative aptitude, verbal ability, and more." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            🧠 Aptitude Practice
          </h1>
          <p className="text-xl text-primary-600 font-semibold">
            Sharpen Your Mind with Real-Test Aptitude Questions
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <p className="text-gray-700 text-lg mb-8">
              Practice with topic-wise problems:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {aptitudeTopics.map((topic) => (
                <div 
                  key={topic.id} 
                  className={`p-6 rounded-lg border-l-4 border-${topic.color}-500 bg-${topic.color}-50 hover:shadow-md transition-shadow duration-300`}
                >
                  <div className="flex items-start">
                    <span className="text-3xl mr-4">{topic.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{topic.title}</h3>
                      <p className="text-gray-600 mb-4">
                        {topic.description}
                      </p>
                      <Link 
                        to={topic.link}
                        className={`inline-block text-${topic.color}-700 hover:text-${topic.color}-900 font-medium`}
                      >
                        Start practicing →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <div className="bg-primary-50 p-6 rounded-lg border border-primary-100 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">🔥 Timed tests and difficulty levels included</h3>
                  <p className="text-gray-700">
                    Track your score and improve over time!
                  </p>
                </div>
                <div>
                  <Link 
                    to="https://www.indiabix.com/online-test/aptitude-test/"
                    className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                  >
                    <span className="mr-2">🎯</span>
                    Try Timed Test
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Why Practice Aptitude?</h3>
              <div className="space-y-6 mt-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-start">
                    <span className="text-primary-600 mr-2">📌</span>
                    <span>1. Crack Campus, Corporate & Government Exams</span>
                  </h4>
                  <p className="text-gray-600 ml-6">
                    Whether you're preparing for campus placements, MNC hiring rounds, or competitive government exams (like SSC, Banking, Railways, etc.), strong aptitude skills are a must to qualify the first stage.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-start">
                    <span className="text-primary-600 mr-2">📌</span>
                    <span>2. Sharpen Core Reasoning & Problem-Solving Skills</span>
                  </h4>
                  <p className="text-gray-600 ml-6">
                    Aptitude practice strengthens your logical, verbal, and quantitative reasoning — essential for coding rounds, personal interviews, and even daily decision-making.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-start">
                    <span className="text-primary-600 mr-2">📌</span>
                    <span>3. Improve Accuracy, Speed & Confidence</span>
                  </h4>
                  <p className="text-gray-600 ml-6">
                    Regular practice helps you solve faster under pressure, minimize silly mistakes, and track your progress through mock tests and timed quizzes.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">🌐 Top 5 Websites for Aptitude Practice</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="mb-3 md:mb-0 md:mr-6 md:w-1/4">
                      <h4 className="font-bold text-lg text-gray-800">1. IndiaBix</h4>
                      
                    </div>
                    <div className="md:w-3/4">
                      <ul className="space-y-1 mb-4">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">Huge collection of aptitude, reasoning, verbal, and technical MCQs</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">Topic-wise practice + explanations</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">Great for freshers, govt exams & company tests</span>
                        </li>
                      </ul>
                      <a href="https://www.indiabix.com" target="_blank" rel="noopener noreferrer" 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                        Start Practicing on IndiaBix
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="mb-3 md:mb-0 md:mr-6 md:w-1/4">
                      <h4 className="font-bold text-lg text-gray-800">2. PrepInsta</h4>
                      
                    </div>
                    <div className="md:w-3/4">
                      <ul className="space-y-1 mb-4">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">Focused on placement preparation (TCS, Infosys, Wipro, etc.)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">Company-specific aptitude questions</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">Prime subscription includes coding + interview prep too</span>
                        </li>
                      </ul>
                      <a href="https://prepinsta.com/complete-aptitude-preparation/?utm_source=home+page&utm_medium=navigation" target="_blank" rel="noopener noreferrer" 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200">
                        Explore Company Tests
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="mb-3 md:mb-0 md:mr-6 md:w-1/4">
                      <h4 className="font-bold text-lg text-gray-800">3. GeeksforGeeks</h4>
                      
                    </div>
                    <div className="md:w-3/4">
                      <ul className="space-y-1 mb-4">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">Best for technical aptitude + DSA + reasoning</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">Practice quizzes, puzzles, and previous placement papers</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">Good mix of beginner to advanced levels</span>
                        </li>
                      </ul>
                      <a href="https://www.geeksforgeeks.org/aptitude-questions-and-answers/" target="_blank" rel="noopener noreferrer" 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200">
                        Access GFG Aptitude
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="mb-3 md:mb-0 md:mr-6 md:w-1/4">
                      <h4 className="font-bold text-lg text-gray-800">4. Testbook</h4>
                      
                    </div>
                    <div className="md:w-3/4">
                      <ul className="space-y-1 mb-4">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">Perfect for government exam aspirants (Bank, SSC, Railways)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">Topic-wise practice sets & full mock tests</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">Mobile app available for on-the-go learning</span>
                        </li>
                      </ul>
                      <a href="https://www.testbook.com" target="_blank" rel="noopener noreferrer" 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200">
                        Try Free Mock Tests
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="mb-3 md:mb-0 md:mr-6 md:w-1/4">
                      <h4 className="font-bold text-lg text-gray-800">5. CareerRide</h4>
                      
                    </div>
                    <div className="md:w-3/4">
                      <ul className="space-y-1 mb-4">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">Simple interface with wide aptitude question bank</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">Covers aptitude, reasoning, and interview questions</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">Useful for both freshers and competitive exam aspirants</span>
                        </li>
                      </ul>
                      <a href="https://www.careerride.com/online-aptitude-test.aspx" target="_blank" rel="noopener noreferrer" 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200">
                        Take Online Tests
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 px-8 py-4">
            <div className="flex flex-wrap justify-between items-center">
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Related Resources</h4>
                <div className="mt-2 space-x-3">
                  <Link to="/resources/resume-tips" className="text-primary-600 hover:text-primary-800 font-medium">Resume Tips</Link>
                  <Link to="/resources/interview-tips" className="text-primary-600 hover:text-primary-800 font-medium">Interview Tips</Link>
                  <Link to="/resources/mock-tests" className="text-primary-600 hover:text-primary-800 font-medium">Mock Tests</Link>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <Link 
                  to="/contact" 
                  className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
                >
                  Need help with aptitude?
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

export default AptitudePracticePage; 