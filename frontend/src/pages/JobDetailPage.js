import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: ''
  });

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchJobData = () => {
      setLoading(true);
      
      // Mock job data
      setTimeout(() => {
        const mockJob = {
          id: parseInt(id),
          title: 'Senior Software Engineer',
          company: {
            id: 1,
            name: 'Accenture',
            logo: 'https://logo.clearbit.com/accenture.com',
            location: 'Bengaluru, India'
          },
          jobType: 'Full-time',
          location: 'Bengaluru, India',
          salary: '₹20-25 LPA',
          experience: '5+ years',
          postedDate: new Date(2023, 3, 15),
          applicationDeadline: new Date(2023, 4, 15),
          description: `
We are looking for a Senior Software Engineer to join our talented engineering team. You will play a key role in developing new features, maintaining existing functionality, and ensuring the performance and stability of our products.

You will work in a collaborative environment with designers, product managers, and other engineers to solve complex technical challenges and deliver outstanding user experiences.
          `,
          responsibilities: [
            'Design, develop, and maintain high-quality software solutions',
            'Collaborate with cross-functional teams to define, design, and ship new features',
            'Identify and fix bugs and performance issues',
            'Write clean, maintainable, and well-documented code',
            'Participate in code reviews and mentor junior developers',
            'Stay up-to-date with emerging trends and technologies'
          ],
          requirements: [
            '5+ years of professional software development experience',
            'Proficiency in Java, Spring Boot, or similar technologies',
            'Experience with RESTful APIs and microservices architecture',
            'Familiarity with cloud platforms (AWS, Azure, or GCP)',
            'Knowledge of SQL and NoSQL databases',
            'Strong problem-solving skills and attention to detail',
            'Excellent communication and teamwork abilities'
          ],
          skills: ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'AWS', 'SQL', 'NoSQL'],
          benefits: [
            'Competitive salary and performance bonuses',
            'Health insurance and wellness programs',
            'Flexible work arrangements',
            'Professional development opportunities',
            'Collaborative and inclusive work environment',
            'Modern office space with amenities'
          ],
          applicationCount: 42,
          viewCount: 1250,
          isRemote: false,
          isFeatured: true
        };
        
        setJob(mockJob);
        setLoading(false);
      }, 1000);
    };
    
    fetchJobData();
  }, [id]);

  const handleApplyClick = () => {
    setIsApplying(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setApplicationData({
      ...applicationData,
      resume: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would submit the application to an API
    // For now, we'll just simulate a successful submission
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Show success message and redirect
      alert('Your application has been submitted successfully!');
      navigate('/jobs');
    }, 1500);
  };

  if (loading) {
    return (
      <div className="pt-16 flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="pt-16 flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <i className="fas fa-exclamation-circle text-gray-300 text-6xl mb-4"></i>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h2>
        <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <Link to="/jobs" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md transition-colors duration-300">
          Browse Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      {/* Job Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-start md:items-center">
              <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200 overflow-hidden">
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="h-10 w-10 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${job.company.name}&background=4f46e5&color=fff`;
                  }}
                />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <i className="fas fa-building flex-shrink-0 mr-1.5 text-gray-400"></i>
                    <Link to={`/companies/${job.company.id}`} className="hover:text-primary-600">
                      {job.company.name}
                    </Link>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <i className="fas fa-map-marker-alt flex-shrink-0 mr-1.5 text-gray-400"></i>
                    {job.location}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <i className="fas fa-briefcase flex-shrink-0 mr-1.5 text-gray-400"></i>
                    {job.jobType}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <i className="fas fa-clock flex-shrink-0 mr-1.5 text-gray-400"></i>
                    Posted {formatDistanceToNow(job.postedDate, { addSuffix: true })}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row sm:mt-0 sm:space-x-3">
              <button
                onClick={handleApplyClick}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Apply Now
              </button>
              <button className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <i className="far fa-bookmark mr-2"></i>
                Save Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Job Description</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="whitespace-pre-line">{job.description}</p>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {job.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Benefits</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {!isApplying ? (
              <>
                {/* Job Overview Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Job Overview</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <i className="fas fa-calendar-alt text-primary-600 mt-1"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Date Posted</p>
                        <p className="text-sm text-gray-900">{job.postedDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <i className="fas fa-hourglass-end text-primary-600 mt-1"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Application Deadline</p>
                        <p className="text-sm text-gray-900">{job.applicationDeadline.toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <i className="fas fa-money-bill-wave text-primary-600 mt-1"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Salary</p>
                        <p className="text-sm text-gray-900">{job.salary}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <i className="fas fa-briefcase text-primary-600 mt-1"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Job Type</p>
                        <p className="text-sm text-gray-900">{job.jobType}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <i className="fas fa-user-graduate text-primary-600 mt-1"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Experience</p>
                        <p className="text-sm text-gray-900">{job.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <i className="fas fa-users text-primary-600 mt-1"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Applications</p>
                        <p className="text-sm text-gray-900">{job.applicationCount} applications</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Company Card */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">About Company</h2>
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200 overflow-hidden">
                      <img
                        src={job.company.logo}
                        alt={job.company.name}
                        className="h-10 w-10 object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${job.company.name}&background=4f46e5&color=fff`;
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-medium text-gray-900">{job.company.name}</h3>
                      <p className="text-sm text-gray-500">{job.company.location}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/companies/${job.company.id}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-900"
                    >
                      View Company Profile
                      <i className="fas fa-arrow-right ml-2 text-xs"></i>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Apply for this position</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={applicationData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={applicationData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={applicationData.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                        Resume/CV
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <i className="fas fa-file-upload text-gray-400 text-3xl"></i>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="resume"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="resume"
                                name="resume"
                                type="file"
                                required
                                onChange={handleFileChange}
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 2MB</p>
                        </div>
                      </div>
                      {applicationData.resume && (
                        <p className="mt-2 text-sm text-gray-500">
                          Selected file: {applicationData.resume.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                        Cover Letter
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        rows={4}
                        value={applicationData.coverLetter}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="Tell us why you're a great fit for this position..."
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setIsApplying(false)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Submit Application
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Jobs */}
      <section className="bg-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-6">Similar Jobs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 201, title: 'Full Stack Developer', company: 'Microsoft', location: 'Hyderabad, India' },
              { id: 202, title: 'Java Developer', company: 'TCS', location: 'Bengaluru, India' },
              { id: 203, title: 'Backend Engineer', company: 'Amazon', location: 'Remote' }
            ].map((similarJob) => (
              <Link 
                key={similarJob.id}
                to={`/jobs/${similarJob.id}`} 
                className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{similarJob.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{similarJob.company}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="fas fa-map-marker-alt w-5 h-5 mr-1 text-gray-400"></i>
                    {similarJob.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetailPage; 