import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ResumeTipsPage = () => {
  const [activeTab, setActiveTab] = useState('basics');

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900">Resume Writing Tips</h1>
          <p className="mt-4 text-xl text-gray-600">Create a standout resume that gets you noticed by recruiters</p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center mb-10 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('basics')}
            className={`px-6 py-4 font-medium text-base border-b-2 transition-all duration-200 ${
              activeTab === 'basics' ? 'border-primary-500 text-primary-600 bg-primary-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
            }`}
          >
            Resume Basics
          </button>
          <button
            onClick={() => setActiveTab('formats')}
            className={`px-6 py-4 font-medium text-base border-b-2 transition-all duration-200 ${
              activeTab === 'formats' ? 'border-primary-500 text-primary-600 bg-primary-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
            }`}
          >
            Resume Formats
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-6 py-4 font-medium text-base border-b-2 transition-all duration-200 ${
              activeTab === 'sections' ? 'border-primary-500 text-primary-600 bg-primary-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
            }`}
          >
            Key Sections
          </button>
          <button
            onClick={() => setActiveTab('ats')}
            className={`px-6 py-4 font-medium text-base border-b-2 transition-all duration-200 ${
              activeTab === 'ats' ? 'border-primary-500 text-primary-600 bg-primary-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
            }`}
          >
            ATS Tips
          </button>
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`px-6 py-4 font-medium text-base border-b-2 transition-all duration-200 ${
              activeTab === 'mistakes' ? 'border-primary-500 text-primary-600 bg-primary-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
            }`}
          >
            Common Mistakes
          </button>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'basics' && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Basics</h2>
                
                <div className="prose max-w-none">
                  <p>Your resume is often the first impression you make on an employer. A well-structured resume can help you stand out and get shortlisted for interviews. Here are the fundamental principles for building an effective resume:</p>
                  
                  <div className="mt-6 mb-6">
                    <h3 className="text-xl font-semibold mb-3">✅ 1. Keep It Concise</h3>
                    <ul className="list-none pl-0">
                      <li>Unless you have extensive experience, aim for a one-page resume.</li>
                      <li>Recruiters spend an average of 6–7 seconds on an initial scan — make it count!</li>
                    </ul>
                  </div>
                  
                  <div className="mt-6 mb-6">
                    <h3 className="text-xl font-semibold mb-3">🎯 2. Tailor for Each Job</h3>
                    <ul className="list-none pl-0">
                      <li>Avoid using the same resume everywhere.</li>
                      <li>Instead, customize your resume for each job by highlighting the most relevant skills and experiences based on the job description.</li>
                    </ul>
                  </div>
                  
                  <div className="mt-6 mb-6">
                    <h3 className="text-xl font-semibold mb-3">🖋️ 3. Use a Clean, Professional Design</h3>
                    <ul className="list-none pl-0">
                      <li>Choose a simple layout with consistent formatting.</li>
                      <li>Stick to standard fonts like Arial, Calibri, or Times New Roman (10–12 pt).</li>
                      <li>Avoid using colors, graphics, or complex layouts unless you're in a design field.</li>
                    </ul>
                  </div>
                  
                  <div className="mt-6 mb-6">
                    <h3 className="text-xl font-semibold mb-3">🔍 4. Include Keywords for ATS</h3>
                    <ul className="list-none pl-0">
                      <li>Many companies use Applicant Tracking Systems (ATS) to scan resumes.</li>
                      <li>To get through ATS, include keywords from the job posting, especially for skills and tools (e.g., "Python," "React," "Agile").</li>
                    </ul>
                  </div>
                  
                  <div className="mt-6 mb-6">
                    <h3 className="text-xl font-semibold mb-3">📈 5. Focus on Achievements, Not Just Responsibilities</h3>
                    <ul className="list-none pl-0">
                      <li>Don't just say what you did — show how well you did it.</li>
                      <li>✅ Use action verbs + measurable results:</li>
                    </ul>
                    <div className="bg-gray-50 p-3 my-2 rounded">
                      <p className="text-green-600">"Improved website load time by 40%"</p>
                      <p className="text-red-600">❌ Avoid vague phrases like "Handled website work"</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 mb-6">
                    <h3 className="text-xl font-semibold mb-3">🚫 6. Avoid Common Mistakes</h3>
                    <ul className="list-none pl-0">
                      <li>❌ Unprofessional email (e.g., partyboy123@gmail.com)<br/>
                      ✅ Use: ritik.ranjan@email.com</li>
                      <li className="mt-2">❌ Spelling or grammar mistakes<br/>
                      ✅ Always proofread or use tools like Grammarly</li>
                      <li className="mt-2">❌ Including personal info like age, religion, marital status<br/>
                      ✅ Keep it professional and relevant</li>
                    </ul>
                  </div>
                  
                  <div className="mt-6 mb-6">
                    <h3 className="text-xl font-semibold mb-3">💾 7. Save and Name Your File Properly</h3>
                    <ul className="list-none pl-0">
                      <li>Save your resume as a PDF to preserve formatting (unless told otherwise).</li>
                      <li>Use a professional filename, e.g.,<br/>
                      📁 Ritik_Ranjan_Resume.pdf</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-700">💡 Pro Tip:</h4>
                  <p className="text-blue-700">Include only relevant experience, skills, and achievements. For freshers, projects, internships, or online certifications can boost your resume significantly!</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'formats' && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📂 Resume Formats</h2>
                
                <div className="prose max-w-none">
                  <p className="mb-6">Choosing the right resume format is essential to highlight your strengths and land more interviews. Here are the three most widely used resume formats, their structure, and when to use them:</p>
                  
                  <div className="border border-gray-200 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">📘 Chronological Resume</h3>
                    <p className="mb-4 text-gray-700">This is the most common format, where work experience is listed in reverse chronological order (most recent job first).</p>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Structure Includes:</h4>
                    <ul className="list-disc pl-5 text-gray-700 mb-4">
                      <li>Contact Information</li>
                      <li>Summary</li>
                      <li>Work Experience</li>
                      <li>Education</li>
                      <li>Skills</li>
                      <li>Certifications / Projects</li>
                    </ul>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Best for:</h4>
                    <ul className="list-disc pl-5 text-gray-700 mb-4">
                      <li>Candidates with a strong, consistent work history</li>
                      <li>Those staying in the same career path</li>
                      <li>Highlighting career progression</li>
                    </ul>
                    
                    <div className="flex space-x-4 mb-2">
                      <div className="text-green-600">✅ Pros: ATS-friendly, easy to scan</div>
                      <div className="text-red-600">❌ Cons: Not ideal for those with employment gaps</div>
                    </div>
                    
                    <div className="mt-4">
                      <a href="#" className="text-primary-600 hover:text-primary-800 font-medium">👉 View Sample Template →</a>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🧩 Functional Resume</h3>
                    <p className="mb-4 text-gray-700">Focuses on skills and strengths rather than job titles. Groups experience by skill category, not timeline.</p>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Structure Includes:</h4>
                    <ul className="list-disc pl-5 text-gray-700 mb-4">
                      <li>Contact Information</li>
                      <li>Summary / Objective</li>
                      <li>Skills grouped by category</li>
                      <li>Projects / Internships</li>
                      <li>Education</li>
                      <li>Minimal Work Experience</li>
                    </ul>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Best for:</h4>
                    <ul className="list-disc pl-5 text-gray-700 mb-4">
                      <li>Freshers or students</li>
                      <li>Career changers</li>
                      <li>Those with employment gaps</li>
                      <li>Candidates with transferable skills</li>
                    </ul>
                    
                    <div className="flex space-x-4 mb-2">
                      <div className="text-green-600">✅ Pros: Emphasizes what you can do, not just what you've done</div>
                      <div className="text-red-600">❌ Cons: Less common, might confuse ATS</div>
                    </div>
                    
                    <div className="mt-4">
                      <a href="#" className="text-primary-600 hover:text-primary-800 font-medium">👉 View Sample Template →</a>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🔀 Combination Resume</h3>
                    <p className="mb-4 text-gray-700">A hybrid format that balances skills and work history, combining elements of both chronological and functional styles.</p>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Structure Includes:</h4>
                    <ul className="list-disc pl-5 text-gray-700 mb-4">
                      <li>Contact Info</li>
                      <li>Summary</li>
                      <li>Key Skills</li>
                      <li>Work Experience</li>
                      <li>Education</li>
                      <li>Certifications / Projects</li>
                    </ul>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Best for:</h4>
                    <ul className="list-disc pl-5 text-gray-700 mb-4">
                      <li>Experienced professionals</li>
                      <li>Candidates with diverse skill sets</li>
                      <li>Applicants for technical or leadership roles</li>
                    </ul>
                    
                    <div className="flex space-x-4 mb-2">
                      <div className="text-green-600">✅ Pros: Versatile and impactful</div>
                      <div className="text-red-600">❌ Cons: Can become lengthy if not structured well</div>
                    </div>
                    
                    <div className="mt-4">
                      <a href="#" className="text-primary-600 hover:text-primary-800 font-medium">👉 View Sample Template →</a>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">📝 Tips for All Formats</h3>
                    <ul className="list-disc pl-5 text-gray-700">
                      <li>Keep formatting clean and professional</li>
                      <li>Use ATS-friendly layouts (avoid tables/graphics)</li>
                      <li>Always tailor content to the job description</li>
                      <li>Save as PDF unless mentioned otherwise</li>
                      <li>Use a professional filename:<br/>
                      📁 Ritik_Ranjan_Resume.pdf</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Resume Sections</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-primary-600 mb-3">Contact Information</h3>
                    <p className="text-gray-700 mb-4">Include your name, phone number, email address, city/state, and LinkedIn profile (if applicable). Make sure your email address is professional.</p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <code className="text-sm">
                        John Doe<br />
                        (555) 123-4567<br />
                        futurelifthit@gmail.com<br />
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
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">⚙️ ATS-Friendly Resume Tips</h2>
                
                <div className="prose max-w-none">
                  <p className="mb-4">📌 ATS = Applicant Tracking System – software that scans your resume before a human even sees it. If your resume isn't ATS-friendly, it might get rejected automatically.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">✅ Top Tips to Beat the ATS</h3>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium">1️⃣ Use a Simple & Clean Format</h4>
                    <ul className="list-none pl-6 space-y-1 mt-2">
                      <li>✔ Stick to standard fonts (Arial, Calibri, Times New Roman)</li>
                      <li>✔ Avoid columns, text boxes, tables, or images – ATS can't read them properly</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium">2️⃣ Use Keywords from the Job Description</h4>
                    <ul className="list-none pl-6 space-y-1 mt-2">
                      <li>✔ Tailor each resume to match job listings</li>
                      <li>✔ Use the exact words they use for skills, roles, and tools (e.g. "JavaScript" not "JS" if the job says so)</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium">3️⃣ Stick to Standard Headings</h4>
                    <ul className="list-none pl-6 space-y-1 mt-2">
                      <li>✔ Use common terms like:</li>
                    </ul>
                    <div className="pl-10 mt-2 space-y-1">
                      <p>• Summary</p>
                      <p>• Education</p>
                      <p>• Work Experience</p>
                      <p>• Skills</p>
                      <p>• Certifications</p>
                    </div>
                    <ul className="list-none pl-6 space-y-1 mt-2">
                      <li>❌ Avoid fancy labels like "My Journey" or "Core Powers"</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium">4️⃣ Save as PDF (Unless Told Otherwise)</h4>
                    <ul className="list-none pl-6 space-y-1 mt-2">
                      <li>✔ Most ATS can now read PDFs</li>
                      <li>✔ Only use Word format (.docx) if the company specifically asks for it</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium">5️⃣ Don't Use Charts, Icons, or Fancy Design Elements</h4>
                    <ul className="list-none pl-6 space-y-1 mt-2">
                      <li>❌ ATS doesn't recognize them – it may skip content or break the formatting</li>
                      <li>✔ Keep it text-based and structured</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium">6️⃣ List Skills Separately</h4>
                    <ul className="list-none pl-6 space-y-1 mt-2">
                      <li>✔ Create a dedicated "Skills" section</li>
                      <li>✔ Separate soft and hard skills, and include keywords (e.g., React, MySQL, Git)</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium">7️⃣ Use Bullet Points</h4>
                    <ul className="list-none pl-6 space-y-1 mt-2">
                      <li>✔ Makes it easier for both ATS and recruiters to scan your content</li>
                      <li>✔ Begin each point with action verbs like Developed, Managed, Led, Created</li>
                    </ul>
                  </div>
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
                    <ul className="list-disc pl-8 mt-2 text-yellow-800">
                    <li><a href="https://www.jobscan.co/" className="text-primary-600 hover:text-primary-800">Jobscan.co</a></li>
                    <li><a href="https://resumeworded.com/" className="text-primary-600 hover:text-primary-800">ResumeWorded.com</a></li>
                    <li><a href="https://skillsyncer.com/" className="text-primary-600 hover:text-primary-800">SkillSyncer.com</a></li>
                  </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mistakes' && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">❌ Common Resume Mistakes to Avoid</h2>
                
                <div className="prose max-w-none">
                  <p className="mb-6">Even strong candidates often miss opportunities due to simple and avoidable resume mistakes. Make sure your resume doesn't fall into these traps:</p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900">🚫 1. Using a Generic Objective Statement</h3>
                    <p className="text-red-600">❌ "Seeking a challenging position..."</p>
                    <p className="mt-1 text-gray-600">These vague statements add no real value.</p>
                    <p className="mt-2"><span className="text-green-600 font-medium">✅ Instead:</span> Write a tailored professional summary that highlights your unique strengths and aligns with the specific job you're applying for.</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900">🚫 2. Sending the Same Resume for All Applications</h3>
                    <p className="mt-1 text-gray-600">A one-size-fits-all approach rarely works.</p>
                    <p className="mt-2"><span className="text-green-600 font-medium">✅</span> Customize your resume for each role — highlight the most relevant experiences, tools, and skills based on the job description.</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900">🚫 3. Including Irrelevant Personal Information</h3>
                    <p className="mt-1 text-gray-600">Details like age, marital status, religion, or a photo aren't needed — and may lead to unconscious bias.</p>
                    <p className="mt-2"><span className="text-green-600 font-medium">✅</span> Stick to professional, job-related details only.</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900">🚫 4. Focusing Only on Responsibilities, Not Achievements</h3>
                    <p className="mt-1 text-gray-600">Listing what you did isn't enough — employers want to know how well you did it.</p>
                    <p className="mt-2"><span className="text-green-600 font-medium">✅</span> Use action verbs + results + numbers</p>
                    <div className="mt-2 bg-gray-50 p-3 rounded-md">
                      <p className="text-gray-700 font-medium">Example:</p>
                      <p className="text-red-600">❌ "Handled support tickets"</p>
                      <p className="text-green-600">✅ "Resolved 90% of user queries within 24 hours, boosting customer satisfaction scores by 25%"</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900">🚫 5. Including Irrelevant or Outdated Experience</h3>
                    <p className="mt-1 text-gray-600">Including unrelated jobs from 10+ years ago only clutters your resume.</p>
                    <p className="mt-2"><span className="text-green-600 font-medium">✅</span> Focus on roles and skills that are most relevant to the job you're applying for.</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900">🚫 6. Using an Unprofessional Email Address</h3>
                    <p className="mt-1 text-gray-600">Avoid emails like partyguy123@email.com or cutepie_ritik@email.com</p>
                    <p className="mt-2"><span className="text-green-600 font-medium">✅</span> Use a simple, professional email like:<br />
                    📧 ritik.ranjan@email.com</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900">🚫 7. Writing "References Available Upon Request"</h3>
                    <p className="mt-1 text-gray-600">This phrase is outdated and unnecessary.</p>
                    <p className="mt-2"><span className="text-green-600 font-medium">✅</span> If an employer needs references, they'll ask. Use this space to showcase skills or achievements instead.</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900">🚫 8. Using Complex Designs, Fonts, or Colors</h3>
                    <p className="mt-1 text-gray-600">Unless you're in a creative/design field, avoid over-styling. It can confuse ATS (Applicant Tracking Systems) or appear unprofessional.</p>
                    <p className="mt-2"><span className="text-green-600 font-medium">✅</span> Stick to a clean, consistent layout using standard fonts (Arial, Calibri, Times New Roman), and avoid excessive graphics or colors.</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900">🚫 9. Spelling & Grammar Mistakes</h3>
                    <p className="mt-1 text-gray-600">Even one typo can cost you the job.</p>
                    <p className="mt-2"><span className="text-green-600 font-medium">✅</span> Always proofread your resume, or use tools like Grammarly and get feedback from a peer or mentor.</p>
                  </div>
                  
                  <div className="mt-8 p-5 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 flex items-center">
                      <span className="mr-2">💡</span> Pro Tip:
                    </h4>
                    <p className="text-yellow-800 mt-2">
                      Save as PDF to maintain formatting, unless a .docx is specifically requested. Use a clear, professional file name:<br />
                      📁 Ritik_Ranjan_Resume.pdf
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
            <div className="relative">
              <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 200 L 100 300 L 0 400 L 200 600 L 0 800 L 800 800 L 800 0 L 0 0 Z" fill="white"></path>
                </svg>
              </div>
              <div className="px-6 py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 lg:py-16 flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
                <div className="md:max-w-2xl">
                  <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    <span className="block">Ready to create your professional resume?</span>
                  </h2>
                  <p className="mt-4 text-lg text-gray-100">
                    Use our resume builder to create a professionally designed resume in minutes. Choose from expert-designed templates and customize to match your style.
                  </p>
                </div>
                <div className="mt-8 md:mt-0 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <Link to="https://app.flowcv.com/resumes" className="px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-gray-100 flex items-center justify-center transition-all duration-200">
                    Build My Resume <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                  <Link to="https://flowcv.com/resume-templates" className="px-8 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white hover:bg-primary-500 flex items-center justify-center transition-all duration-200">
                    View Templates
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

export default ResumeTipsPage; 