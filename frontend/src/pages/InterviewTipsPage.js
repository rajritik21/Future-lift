import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const InterviewTipsPage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 min-h-screen pt-20">
      <Helmet>
        <title>Interview Tips | FutureLift Job Portal</title>
        <meta name="description" content="Master your next interview with confidence. Get expert advice on common questions, the STAR method, and interview preparation." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            📌 Interview Tips
          </h1>
          <p className="text-xl text-primary-600 font-semibold">
            Master Your Next Interview with Confidence
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
          <div className="p-8">
            <p className="text-gray-700 text-lg mb-6">
              Interviews can be nerve-wracking — but with the right preparation, you can turn anxiety into confidence. Here's your go-to guide for acing your next interview!
            </p>
            
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">🎯 1. Common HR & Technical Questions</h3>
                <p className="text-gray-600 mb-3">
                  Get ready to answer the most asked HR and technical questions confidently.
                </p>
                <p className="text-gray-600 mb-2">💬 Examples include:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>"Tell me about yourself"</li>
                  <li>"Why do you want to work here?"</li>
                  <li>"What are your strengths and weaknesses?"</li>
                </ul>
                <p className="text-gray-600 mt-3">
                  Also, prepare for domain-specific questions in areas like coding, finance, data, marketing, etc.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">⭐ 2. Use the STAR Method</h3>
                <p className="text-gray-600 mb-3">
                  Structure your answers to behavioral questions using:
                </p>
                <p className="text-gray-600 font-medium">
                  S – Situation | T – Task | A – Action | R – Result
                </p>
                <div className="mt-4 bg-blue-50 p-4 rounded-md">
                  <p className="text-gray-700 font-medium mb-2">💡 Example:</p>
                  <p className="text-gray-600 mb-2">"Describe a time you faced a challenge at work" →</p>
                  <p className="text-gray-600">
                    Talk about the scenario, what needed to be done, your actions, and the outcome. It keeps your answer clear, focused, and impressive!
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">✅ 3. Interview Do's & Don'ts</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Do's</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✔</span>
                        <span className="text-gray-600">Maintain good eye contact</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✔</span>
                        <span className="text-gray-600">Greet politely and smile</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✔</span>
                        <span className="text-gray-600">Research the company in advance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✔</span>
                        <span className="text-gray-600">Ask thoughtful questions at the end</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Don'ts</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✖</span>
                        <span className="text-gray-600">Interrupt the interviewer</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✖</span>
                        <span className="text-gray-600">Speak negatively about past employers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✖</span>
                        <span className="text-gray-600">Forget to silence your phone</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✖</span>
                        <span className="text-gray-600">Appear over-rehearsed or robotic</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">👔 4. Dress for Success</h3>
                <p className="text-gray-600 mb-3">
                  Your appearance matters. Dress professionally based on the industry:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="font-medium mr-2">Tech/Startup:</span>
                    <span>Smart casual</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">Corporate/Finance:</span>
                    <span>Formal (blazer, tie, dress shoes)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">Creative fields:</span>
                    <span>Smart but expressive</span>
                  </li>
                </ul>
                <p className="text-gray-600 mt-3">
                  Also, maintain open body language and sit up straight to project confidence.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">🎙️ 5. Practice with Mock Interviews</h3>
                <p className="text-gray-600 mb-3">
                  Practice makes perfect. Try:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>Peer-to-peer mock interviews</li>
                  <li>Recording yourself and reviewing your tone, pace, and body language</li>
                  <li>Online platforms offering mock interview simulations</li>
                </ul>
                <p className="text-gray-600 mt-3">
                  This helps you refine your answers and reduce interview-day anxiety.
                </p>
              </div>
            </div>
            
            <div className="mt-10 space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">🔹 HR Round Resources</h3>
                <p className="text-gray-600 mb-3">
                  Perfect for freshers and experienced candidates preparing for behavioral and situational questions.
                </p>
                <div className="space-y-2">
                  <a href="https://drive.google.com/drive/folders/1--_MnRbIKNtEThE3ZB4STDS9SFDsjJAx?usp=sharing" target="_blank" className="flex items-center text-primary-600 hover:text-primary-800">
                    <span className="mr-2">📄</span>
                    <span>Top  HR Interview Questions And Answers(PDF)</span>
                  </a>
                  <a href="https://drive.google.com/drive/folders/1UboR0drJGvuiSXbUPFEUJQMFks0-9Cb3?usp=drive_link" className="flex items-center text-primary-600 hover:text-primary-800">
                    <span className="mr-2">📄</span>
                    <span>Behavioral Interview Answers Using STAR Method (PDF)</span>
                  </a>
                  <a href ="https://drive.google.com/drive/folders/1znK0S6dxmpNz3euQHmHIz-HExPMK0sQq?usp=drive_link" target="_blank" className="flex items-center text-primary-600 hover:text-primary-800">
                    <span className="mr-2">📄</span>
                    <span>Interview Etiquette & Body Language Tips (PDF)</span>
                  </a>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">🔹 Technical Round Resources</h3>
                <p className="text-gray-600 mb-3">
                  Boost your technical knowledge with quick revision notes and cheat sheets for key subjects:
                </p>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-3">Available Topics:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
                    <div className="flex items-center">
                      <i className="fas fa-code text-blue-500 mr-2"></i>
                      <span>C++</span>
                    </div>
                    <div className="flex items-center">
                       <i className="fab fa-css3-alt text-blue-500 mr-2"></i>
                      <span>CSS</span>
                    </div>
                    <div className="flex items-center">
                       <i className="fas fa-atom text-blue-500 mr-2"></i>
                      <span>DSA</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fab fa-html5 text-blue-500 mr-2"></i>
                      <span>HTML</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fab fa-java text-blue-500 mr-2"></i>
                      <span>Java</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fab fa-js text-blue-500 mr-2"></i>
                      <span>JavaScript</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fab fa-python text-blue-500 mr-2"></i>
                      <span>Python</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fab fa-react text-blue-500 mr-2"></i>
                      <span>React</span>
                    </div>
                     <div className="flex items-center">
                       <i className="fas fa-database text-blue-500 mr-2"></i>
                      <span>SQL</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://drive.google.com/drive/folders/1DqrltG3vB5Nkj6yMwbj_FB0ZzTxJxG8j?usp=drive_link" // !!! REPLACE WITH ACTUAL LINK !!!
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
                >
                  View All Technical Notes
                  <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h4a1 1 0 001-1V4a1 1 0 00-1-1h-4zm-1 4a1 1 0 011-1h5a1 1 0 110 2h-5a1 1 0 01-1-1zm1 3a1 1 0 100 2h4a1 1 0 100-2h-4zM7 13a1 1 0 011-1h5a1 1 0 110 2h-5a1 1 0 01-1-1zM4 7a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm1 3a1 1 0 000 2h1a1 1 0 100-2H5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 px-8 py-4">
            <div className="flex flex-wrap justify-between items-center">
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Related Resources</h4>
                <div className="mt-2 space-x-3">
                  <Link to="/resources/resume-tips" className="text-primary-600 hover:text-primary-800 font-medium">Resume Tips</Link>
                  <Link to="/resources/aptitude-practice" className="text-primary-600 hover:text-primary-800 font-medium">Aptitude Practice</Link>
                  <Link to="/resources/mock-tests" className="text-primary-600 hover:text-primary-800 font-medium">Mock Tests</Link>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <Link 
                  to="/contact" 
                  className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
                >
                  Need personalized help?
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

export default InterviewTipsPage; 