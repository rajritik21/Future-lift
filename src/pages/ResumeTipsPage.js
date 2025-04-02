import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ResumeTipsPage = () => {
  const [activeTab, setActiveTab] = useState('basics');

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900">Resume Writing Tips</h1>
          <p className="mt-4 text-xl text-gray-600">Create a standout resume that gets you noticed by recruiters</p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center mb-10 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('basics')}
            className={`px-4 py-3 font-medium text-base border-b-2 ${
              activeTab === 'basics' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Resume Basics
          </button>
          <button
            onClick={() => setActiveTab('formats')}
            className={`px-4 py-3 font-medium text-base border-b-2 ${
              activeTab === 'formats' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Resume Formats
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-4 py-3 font-medium text-base border-b-2 ${
              activeTab === 'sections' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Key Sections
          </button>
          <button
            onClick={() => setActiveTab('ats')}
            className={`px-4 py-3 font-medium text-base border-b-2 ${
              activeTab === 'ats' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            ATS Tips
          </button>
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`px-4 py-3 font-medium text-base border-b-2 ${
              activeTab === 'mistakes' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Common Mistakes
          </button>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'basics' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Basics</h2>
                
                <div className="prose max-w-none">
                  <p>Your resume is often the first impression employers have of you. Here are some fundamental principles to create an effective resume:</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Keep it concise</h3>
                  <p>Unless you have extensive relevant experience, aim for a one-page resume. Recruiters typically spend only 6-7 seconds scanning a resume initially.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Tailor for each job</h3>
                  <p>Customize your resume for each position you apply to. Highlight skills and experiences most relevant to the specific job description.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Use a clean, professional design</h3>
                  <p>Choose a simple, professional layout with consistent formatting. Use standard fonts like Arial, Calibri, or Times New Roman in 10-12pt size.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Include keywords</h3>
                  <p>Incorporate industry-specific keywords from the job description to help your resume pass through Applicant Tracking Systems (ATS).</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Focus on achievements</h3>
                  <p>Instead of just listing job duties, highlight your accomplishments using action verbs and quantify results when possible (e.g., "Increased sales by 25%" rather than "Responsible for sales").</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Proofread carefully</h3>
                  <p>Typos and grammatical errors can immediately disqualify you. Have someone else review your resume before submitting.</p>
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-700">Pro Tip</h4>
                  <p className="text-blue-700">Save your resume as a PDF to preserve formatting, unless specifically asked for another format like .docx. Name the file professionally, such as "FirstName_LastName_Resume.pdf".</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'formats' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Formats</h2>
                
                <div className="space-y-8">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Chronological Resume</h3>
                    <p className="mb-4 text-gray-700">The most common format, listing your work history in reverse chronological order (most recent first).</p>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Best for:</h4>
                    <ul className="list-disc pl-5 text-gray-700 mb-4">
                      <li>Candidates with a strong, consistent work history</li>
                      <li>Those staying within the same career path</li>
                      <li>Showcasing career progression</li>
                    </ul>
                    
                    <div className="mt-4">
                      <a href="#" className="text-primary-600 hover:text-primary-800 font-medium">View Sample Template →</a>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Functional Resume</h3>
                    <p className="mb-4 text-gray-700">Emphasizes skills and abilities rather than work history. Groups experience by skill category rather than by job.</p>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Best for:</h4>
                    <ul className="list-disc pl-5 text-gray-700 mb-4">
                      <li>Career changers</li>
                      <li>Those with employment gaps</li>
                      <li>Candidates with highly transferable skills</li>
                    </ul>
                    
                    <div className="mt-4">
                      <a href="#" className="text-primary-600 hover:text-primary-800 font-medium">View Sample Template →</a>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Combination Resume</h3>
                    <p className="mb-4 text-gray-700">Blends chronological and functional formats, highlighting both relevant skills and work history.</p>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Best for:</h4>
                    <ul className="list-disc pl-5 text-gray-700 mb-4">
                      <li>Experienced professionals</li>
                      <li>Those with diverse skill sets</li>
                      <li>Candidates applying for positions requiring specific technical skills and experience</li>
                    </ul>
                    
                    <div className="mt-4">
                      <a href="#" className="text-primary-600 hover:text-primary-800 font-medium">View Sample Template →</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Resume Sections</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-primary-600 mb-3">Contact Information</h3>
                    <p className="text-gray-700 mb-4">Include your name, phone number, email address, city/state, and LinkedIn profile (if applicable). Make sure your email address is professional.</p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <code className="text-sm">
                        John Doe<br />
                        (555) 123-4567<br />
                        johndoe@email.com<br />
                        Bangalore, India<br />
                        linkedin.com/in/johndoe
                      </code>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-primary-600 mb-3">Professional Summary</h3>
                    <p className="text-gray-700 mb-4">A brief 2-3 sentence overview highlighting your experience, key skills, and what makes you a strong candidate. Tailor this to each job application.</p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-sm italic">
                        "Results-oriented software developer with 5+ years of experience building web applications using React.js and Node.js. Specializing in creating responsive, user-friendly interfaces with a focus on performance optimization. Passionate about clean code and collaborative development."
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-primary-600 mb-3">Work Experience</h3>
                    <p className="text-gray-700 mb-4">List your work history in reverse chronological order. Include company name, job title, dates of employment, and 3-5 bullet points describing achievements rather than just duties.</p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="text-sm">
                        <p className="font-medium">Senior Web Developer | Acme Technologies</p>
                        <p className="text-gray-600">January 2020 - Present | Bangalore, India</p>
                        <ul className="list-disc pl-5 mt-2">
                          <li>Developed and maintained client-facing e-commerce platform, increasing conversion rates by 15%</li>
                          <li>Led team of 4 junior developers in redesigning company's flagship product, reducing load times by 40%</li>
                          <li>Implemented automated testing procedures that reduced bug reports by 23%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-primary-600 mb-3">Skills</h3>
                    <p className="text-gray-700 mb-4">List relevant technical, industry-specific, and transferable skills. Organize them by categories for better readability.</p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="text-sm">
                        <p className="font-medium">Technical Skills:</p>
                        <p>JavaScript, React.js, Node.js, Express, MongoDB, HTML5, CSS3, Git, AWS</p>
                        <p className="font-medium mt-2">Soft Skills:</p>
                        <p>Project Management, Team Leadership, Client Communication, Problem-solving</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-primary-600 mb-3">Education</h3>
                    <p className="text-gray-700 mb-4">Include your degrees, institutions, graduation dates, and relevant coursework or achievements.</p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="text-sm">
                        <p className="font-medium">Bachelor of Technology in Computer Science</p>
                        <p>Indian Institute of Technology, Delhi</p>
                        <p className="text-gray-600">Graduated: May 2019 | CGPA: 3.8/4.0</p>
                        <p className="mt-1">Relevant coursework: Data Structures, Algorithms, Database Systems</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-primary-600 mb-3">Optional Sections</h3>
                    <ul className="list-disc pl-5 text-gray-700">
                      <li className="mb-2"><strong>Projects:</strong> Highlight relevant personal or academic projects, especially for recent graduates.</li>
                      <li className="mb-2"><strong>Certifications:</strong> List relevant professional certifications.</li>
                      <li className="mb-2"><strong>Awards & Achievements:</strong> Include recognition that demonstrates your expertise.</li>
                      <li className="mb-2"><strong>Languages:</strong> Mention language proficiencies if relevant to the job.</li>
                      <li className="mb-2"><strong>Volunteer Experience:</strong> Especially useful for demonstrating soft skills or filling experience gaps.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ats' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Applicant Tracking System (ATS) Tips</h2>
                
                <div className="prose max-w-none">
                  <p>Most companies use Applicant Tracking Systems to filter resumes before human recruiters see them. Here's how to optimize your resume for ATS:</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Use standard section headings</h3>
                  <p>Use conventional section titles like "Work Experience," "Education," and "Skills" rather than creative alternatives like "Where I've Made an Impact."</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Include keywords from the job description</h3>
                  <p>Identify key skills, qualifications, and requirements from the job posting and incorporate them naturally throughout your resume. Match terms exactly when possible.</p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-6">
                    <h4 className="font-medium">Example:</h4>
                    <p className="mt-2"><strong>Job posting states:</strong> "Experience with Python programming and data analysis"</p>
                    <p className="mt-1"><strong>In your resume:</strong> "Leveraged Python programming for data analysis projects, resulting in 20% improved prediction accuracy"</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Use a simple, clean format</h3>
                  <p>Avoid tables, headers/footers, text boxes, images, and complex formatting that ATS might not be able to parse correctly.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Use standard file formats</h3>
                  <p>Submit your resume as a .docx or .pdf file unless otherwise specified, as these are most compatible with ATS software.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Spell out acronyms</h3>
                  <p>Include both the acronym and its spelled-out version at least once, especially for industry-specific terms (e.g., "Search Engine Optimization (SEO)").</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Avoid excessive use of graphics</h3>
                  <p>Skills bars, rating systems, and other graphical elements may look appealing but often can't be properly read by ATS software.</p>
                </div>
                
                <div className="mt-8 p-5 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 flex items-center">
                    <i className="fas fa-lightbulb mr-2"></i>
                    ATS Checker Tool
                  </h4>
                  <p className="text-yellow-800 mt-2">
                    After optimizing your resume, consider using an ATS resume checker tool to evaluate how well your resume might perform when processed by an ATS. Many online services offer this feature for free.
                  </p>
                  <div className="mt-4">
                    <Link to="https://enhancv.com/resources/resume-checker/" className="text-primary-600 hover:text-primary-800 font-medium">
                      Check Your Resume with Our ATS Tool →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mistakes' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Resume Mistakes to Avoid</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <i className="fas fa-times text-red-600"></i>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Including a generic objective statement</h3>
                      <p className="mt-1 text-gray-600">Generic objectives like "Seeking a challenging position..." add no value. Instead, use a tailored professional summary highlighting your unique qualifications.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <i className="fas fa-times text-red-600"></i>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Using one resume for all applications</h3>
                      <p className="mt-1 text-gray-600">Tailoring your resume for each job application significantly increases your chances of getting an interview. Highlight the most relevant skills and experiences for each position.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <i className="fas fa-times text-red-600"></i>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Including personal information</h3>
                      <p className="mt-1 text-gray-600">Don't include age, marital status, religion, or other personal details that aren't relevant to your ability to perform the job and could potentially lead to bias.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <i className="fas fa-times text-red-600"></i>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Focusing only on job duties</h3>
                      <p className="mt-1 text-gray-600">Instead of just listing what you were responsible for, highlight your achievements and the results you delivered. Use metrics and numbers whenever possible.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <i className="fas fa-times text-red-600"></i>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Including irrelevant experience</h3>
                      <p className="mt-1 text-gray-600">Focus on experiences and skills that are relevant to the job you're applying for. For most professionals, there's no need to include jobs from more than 10-15 years ago.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <i className="fas fa-times text-red-600"></i>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Using unprofessional email addresses</h3>
                      <p className="mt-1 text-gray-600">Avoid email addresses like "partyguy123@email.com." Use a professional email address that includes your name.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <i className="fas fa-times text-red-600"></i>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Including references or "References available upon request"</h3>
                      <p className="mt-1 text-gray-600">It's assumed that you'll provide references if asked. Save this valuable space for highlighting your qualifications.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <i className="fas fa-times text-red-600"></i>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Using elaborate designs or fonts</h3>
                      <p className="mt-1 text-gray-600">Unless you're in a creative field, stick to clean, professional designs and standard fonts that are easy to read and ATS-friendly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-primary-700 rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 lg:py-16 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block">Ready to create your professional resume?</span>
              </h2>
              <p className="mt-3 text-lg text-gray-300">
                Use our resume builder to create a professionally designed resume in minutes. Choose from expert-designed templates and customize to match your style.
              </p>
            </div>
            <div className="mt-8 md:mt-0 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Link to="https://app.flowcv.com/resumes" className="px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-gray-100 flex items-center justify-center">
                Build My Resume <i className="fas fa-arrow-right ml-2"></i>
              </Link>
              <Link to="https://flowcv.com/resume-templates" className="px-8 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white hover:bg-primary-600 flex items-center justify-center">
                View Templates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTipsPage; 