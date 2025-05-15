import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResumeSection = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [education, setEducation] = useState([{ 
    degree: '', 
    institution: '', 
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    marks: '',
    totalMarks: '',
    percentage: '',
    gradingSystem: 'percentage',
    cgpa: '',
    maxCgpa: ''
  }]);
  const [skills, setSkills] = useState([{ name: '', level: 'Beginner' }]);
  const [certifications, setCertifications] = useState([{
    name: '',
    issuer: '',
    dateObtained: '',
    expiryDate: '',
    credentialId: ''
  }]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          return;
        }
        
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        };
        
        const res = await axios.get('/api/profiles/me', config);
        setProfile(res.data);
        
        // Set resume info if available
        if (res.data.resume) {
          setResumeUrl(res.data.resume.url);
          setResumeName(res.data.resume.filename || 'Your Resume');
        }
        
        // Set education if available
        if (res.data.education && res.data.education.length > 0) {
          setEducation(res.data.education);
        }
        
        // Set skills if available
        if (res.data.skills && res.data.skills.length > 0) {
          const formattedSkills = res.data.skills.map(skill => {
            if (typeof skill === 'string') {
              return { name: skill, level: 'Intermediate' };
            }
            return skill;
          });
          setSkills(formattedSkills);
        }
        
        // Set certifications if available
        if (res.data.certifications && res.data.certifications.length > 0) {
          setCertifications(res.data.certifications);
        }
        
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setResumeName(file.name);
    }
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index] = { 
      ...updatedEducation[index], 
      [field]: field === 'current' ? !updatedEducation[index].current : value 
    };
    
    // If changing the grading system, reset the related fields
    if (field === 'gradingSystem') {
      if (value === 'percentage') {
        updatedEducation[index].cgpa = '';
        updatedEducation[index].maxCgpa = '10.0';
      } else if (value === 'cgpa') {
        updatedEducation[index].marks = '';
        updatedEducation[index].totalMarks = '';
        updatedEducation[index].percentage = '';
      }
    }
    
    // Calculate percentage when marks or totalMarks change
    if ((field === 'marks' || field === 'totalMarks') && updatedEducation[index].gradingSystem !== 'cgpa') {
      const marks = field === 'marks' ? value : updatedEducation[index].marks;
      const totalMarks = field === 'totalMarks' ? value : updatedEducation[index].totalMarks;
      
      if (marks && totalMarks && !isNaN(marks) && !isNaN(totalMarks) && Number(totalMarks) > 0) {
        const percentage = ((Number(marks) / Number(totalMarks)) * 100).toFixed(2);
        updatedEducation[index].percentage = percentage;
      } else {
        updatedEducation[index].percentage = '';
      }
    }
    
    setEducation(updatedEducation);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { 
        degree: '', 
        institution: '', 
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        marks: '',
        totalMarks: '',
        percentage: '',
        gradingSystem: 'percentage',
        cgpa: '',
        maxCgpa: ''
      }
    ]);
  };

  const removeEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    setSkills([...skills, { name: '', level: 'Beginner' }]);
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleCertificationChange = (index, field, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = { ...updatedCertifications[index], [field]: value };
    setCertifications(updatedCertifications);
  };

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        name: '',
        issuer: '',
        dateObtained: '',
        expiryDate: '',
        credentialId: ''
      }
    ]);
  };

  const removeCertification = (index) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setMessage({ 
        type: 'error', 
        text: 'Please select a resume file to upload' 
      });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setMessage({ 
          type: 'error', 
          text: 'Authentication token not found. Please login again.' 
        });
        return;
      }
      
      // Create form data for the file upload
      const formData = new FormData();
      formData.append('resume', resumeFile);
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token
        }
      };
      
      // Upload resume
      const res = await axios.post('/api/profiles/resume', formData, config);
      
      if (res.data && res.data.resume) {
        setResumeUrl(res.data.resume.url);
        setResumeName(res.data.resume.filename || resumeFile.name);
        setResumeFile(null);
        
        setMessage({ 
          type: 'success', 
          text: 'Resume uploaded successfully!' 
        });
      }
      
    } catch (err) {
      console.error('Error uploading resume:', err);
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.msg || 'Failed to upload resume' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setMessage({
          type: 'error',
          text: 'Authentication token not found. Please login again.'
        });
        return;
      }
      
      // If there's a resume file waiting to be uploaded, upload it first
      if (resumeFile) {
        await handleResumeUpload(e);
      }
      
      const formData = new FormData();
      
      // Add education, skills, and certifications
      formData.append('education', JSON.stringify(education));
      formData.append('skills', JSON.stringify(skills));
      formData.append('certifications', JSON.stringify(certifications));
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token
        }
      };
      
      // Update profile
      const res = await axios.post('/api/profiles/qualifications', formData, config);
      setProfile(res.data);
      
      setMessage({ 
        type: 'success', 
        text: 'Qualifications updated successfully!' 
      });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
      
    } catch (err) {
      console.error('Error updating qualifications:', err);
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.msg || 'Failed to update qualifications' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Resume & Qualifications</h2>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Resume Upload Section */}
        <div className="mb-6 border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Resume/CV</h3>
          
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <div className="flex-grow">
              {resumeUrl ? (
                <div className="flex items-center mb-3 gap-3">
                  <i className="fas fa-file-pdf text-red-500 text-xl"></i>
                  <span className="font-medium">{resumeName || 'Your Resume'}</span>
                  <div className="flex gap-2 ml-2">
                    <a 
                      href={resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded hover:bg-primary-700"
                    >
                      <i className="fas fa-eye mr-1"></i> View
                    </a>
                    <label 
                      htmlFor="resume" 
                      className="inline-flex items-center px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-200 cursor-pointer"
                    >
                      <i className="fas fa-sync-alt mr-1"></i> Update
                    </label>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 mb-3">No resume uploaded yet</p>
              )}
              
              <div className="relative">
                {!resumeUrl && (
                  <label 
                    htmlFor="resume" 
                    className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none cursor-pointer"
                  >
                    <i className="fas fa-upload mr-2"></i>
                    Upload Resume
                  </label>
                )}
                <input 
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleResumeChange}
                  className="sr-only"
                  accept=".pdf,.doc,.docx"
                />
              </div>
              
              {resumeFile && (
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Selected file:</span> {resumeFile.name}
                </div>
              )}
            </div>
            
            <div className="mt-3 md:mt-0 text-sm text-gray-500 md:ml-6 md:w-1/3">
              <p>Upload your resume in PDF, DOC, or DOCX format (max 5MB).</p>
              <p className="mt-1">This will be shared with employers when you apply for jobs.</p>
            </div>
          </div>
        </div>
        
        {/* Education Section */}
        <div className="mb-6 border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Education</h3>
            <button
              type="button"
              onClick={addEducation}
              className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
            >
              <i className="fas fa-plus mr-1"></i> Add Education
            </button>
          </div>
          
          {education.map((edu, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label htmlFor={`degree-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Degree/Certificate
                  </label>
                  <input
                    type="text"
                    id={`degree-${index}`}
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Bachelor of Science"
                  />
                </div>
                
                <div>
                  <label htmlFor={`institution-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Institution
                  </label>
                  <input
                    type="text"
                    id={`institution-${index}`}
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Stanford University"
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor={`fieldOfStudy-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Field of Study
                </label>
                <input
                  type="text"
                  id={`fieldOfStudy-${index}`}
                  value={edu.fieldOfStudy}
                  onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., Computer Science"
                />
              </div>
              
              {/* Grading System Selection */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grading System
                </label>
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`percentage-system-${index}`}
                      name={`grading-system-${index}`}
                      checked={!edu.gradingSystem || edu.gradingSystem === 'percentage'}
                      onChange={() => handleEducationChange(index, 'gradingSystem', 'percentage')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <label htmlFor={`percentage-system-${index}`} className="ml-2 block text-sm text-gray-700">
                      Percentage/Marks
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`cgpa-system-${index}`}
                      name={`grading-system-${index}`}
                      checked={edu.gradingSystem === 'cgpa'}
                      onChange={() => handleEducationChange(index, 'gradingSystem', 'cgpa')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <label htmlFor={`cgpa-system-${index}`} className="ml-2 block text-sm text-gray-700">
                      CGPA
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Conditional Rendering Based on Grading System */}
              {(!edu.gradingSystem || edu.gradingSystem === 'percentage') ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <label htmlFor={`marks-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Marks Obtained
                    </label>
                    <input
                      type="number"
                      id={`marks-${index}`}
                      value={edu.marks}
                      onChange={(e) => handleEducationChange(index, 'marks', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g., 850"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`totalMarks-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Total Marks
                    </label>
                    <input
                      type="number"
                      id={`totalMarks-${index}`}
                      value={edu.totalMarks}
                      onChange={(e) => handleEducationChange(index, 'totalMarks', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g., 1000"
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`percentage-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Percentage
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id={`percentage-${index}`}
                        value={edu.percentage ? `${edu.percentage}%` : ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                        readOnly
                      />
                      {edu.marks && edu.totalMarks && Number(edu.percentage) > 0 && (
                        <div 
                          className="absolute inset-y-0 right-0 w-1/2 bg-primary-100 opacity-40 pointer-events-none rounded-r-md"
                          style={{ 
                            width: `${Math.min(100, Number(edu.percentage))}%`,
                            transition: 'width 0.3s ease' 
                          }}
                        ></div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label htmlFor={`cgpa-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      CGPA
                    </label>
                    <input
                      type="number"
                      id={`cgpa-${index}`}
                      value={edu.cgpa}
                      onChange={(e) => handleEducationChange(index, 'cgpa', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g., 8.5"
                      min="0"
                      step="0.01"
                      max={edu.maxCgpa || 10}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`maxCgpa-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum CGPA Scale
                    </label>
                    <select
                      id={`maxCgpa-${index}`}
                      value={edu.maxCgpa || "10.0"}
                      onChange={(e) => handleEducationChange(index, 'maxCgpa', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="4.0">4.0 Scale</option>
                      <option value="5.0">5.0 Scale</option>
                      <option value="10.0">10.0 Scale</option>
                    </select>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    id={`startDate-${index}`}
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    id={`endDate-${index}`}
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    disabled={edu.current}
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`current-${index}`}
                    checked={edu.current}
                    onChange={() => handleEducationChange(index, 'current')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`current-${index}`} className="ml-2 block text-sm text-gray-700">
                    I am currently studying here
                  </label>
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  id={`description-${index}`}
                  value={edu.description}
                  onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Additional information about your studies"
                ></textarea>
              </div>
              
              {education.length > 1 && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                  >
                    <i className="fas fa-trash-alt mr-1"></i> Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Skills Section */}
        <div className="mb-6 border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Skills</h3>
            <button
              type="button"
              onClick={addSkill}
              className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
            >
              <i className="fas fa-plus mr-1"></i> Add Skill
            </button>
          </div>
          
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center mb-3 last:mb-0">
              <div className="flex-grow grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., JavaScript, Project Management"
                  />
                </div>
                
                <div>
                  <select
                    value={skill.level}
                    onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
              
              {skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="ml-3 text-red-600 hover:text-red-800"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          ))}
        </div>
        
        {/* Certifications Section */}
        <div className="mb-6 border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Certifications</h3>
            <button
              type="button"
              onClick={addCertification}
              className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
            >
              <i className="fas fa-plus mr-1"></i> Add Certification
            </button>
          </div>
          
          {certifications.map((cert, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label htmlFor={`certName-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Certification Name
                  </label>
                  <input
                    type="text"
                    id={`certName-${index}`}
                    value={cert.name}
                    onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., AWS Certified Solutions Architect"
                  />
                </div>
                
                <div>
                  <label htmlFor={`issuer-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    id={`issuer-${index}`}
                    value={cert.issuer}
                    onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Amazon Web Services"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label htmlFor={`dateObtained-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Date Obtained
                  </label>
                  <input
                    type="month"
                    id={`dateObtained-${index}`}
                    value={cert.dateObtained}
                    onChange={(e) => handleCertificationChange(index, 'dateObtained', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor={`expiryDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="month"
                    id={`expiryDate-${index}`}
                    value={cert.expiryDate}
                    onChange={(e) => handleCertificationChange(index, 'expiryDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor={`credentialId-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Credential ID (Optional)
                </label>
                <input
                  type="text"
                  id={`credentialId-${index}`}
                  value={cert.credentialId}
                  onChange={(e) => handleCertificationChange(index, 'credentialId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., ABC123456"
                />
              </div>
              
              {certifications.length > 1 && (
                <div className="flex justify-end mt-3">
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                  >
                    <i className="fas fa-trash-alt mr-1"></i> Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Qualifications'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeSection; 