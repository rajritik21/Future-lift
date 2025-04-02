import React, { useState } from 'react';

const FAQPage = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      questions: [
        {
          id: 'what-is-futurelift',
          question: 'What is FutureLift?',
          answer: 'FutureLift is a comprehensive job portal designed to connect job seekers with employers. Our platform offers tools for resume building, job searching, career advice, and more to help you advance in your career journey.'
        },
        {
          id: 'is-registration-free',
          question: 'Is registration free?',
          answer: 'Yes, registration on FutureLift is completely free for job seekers. You can create a profile, upload your resume, search for jobs, and apply to open positions without any cost.'
        },
        {
          id: 'account-deletion',
          question: 'How do I delete my account?',
          answer: 'To delete your account, go to your account settings, scroll to the bottom of the page, and click on "Delete Account". You\'ll be asked to confirm this action. Please note that account deletion is permanent and all your data will be removed from our system.'
        }
      ]
    },
    {
      id: 'job-seeking',
      title: 'For Job Seekers',
      questions: [
        {
          id: 'resume-visibility',
          question: 'Who can see my resume?',
          answer: 'Your resume is only visible to employers and recruiters who have active job listings on our platform. You can also adjust your privacy settings to control who sees your resume and personal information.'
        },
        {
          id: 'application-tracking',
          question: 'How do I track my job applications?',
          answer: 'You can track all your job applications from your dashboard. We provide real-time updates on the status of your applications, including when an employer views your resume or when a position has been filled.'
        },
        {
          id: 'profile-optimization',
          question: 'How can I make my profile more attractive to employers?',
          answer: 'To make your profile stand out, make sure to complete all sections, include a professional photo, list relevant skills, detail your work experience, and keep your profile updated. Regularly updating your skills and achievements will increase your visibility to potential employers.'
        },
        {
          id: 'job-alerts',
          question: 'How do job alerts work?',
          answer: 'Job alerts notify you when new positions matching your preferences and skills are posted. You can set up alerts based on job title, location, industry, or specific skills. Alerts can be delivered via email or push notifications based on your preferences.'
        }
      ]
    },
    {
      id: 'employers',
      title: 'For Employers',
      questions: [
        {
          id: 'post-job',
          question: 'How do I post a job?',
          answer: 'To post a job, sign in to your employer account, click on "Post a Job" button, fill out the job details including title, description, requirements, and benefits, select the job type and location options, review your listing, and submit. Your job will be visible to qualified candidates after review.'
        },
        {
          id: 'pricing',
          question: 'What are the pricing plans for employers?',
          answer: 'We offer flexible pricing plans for employers based on your hiring needs. These range from basic plans for occasional hiring to premium plans for companies with ongoing recruitment needs. Visit our Pricing page for detailed information on features and costs.'
        },
        {
          id: 'candidate-search',
          question: 'How can I search for candidates?',
          answer: 'You can search for candidates using our advanced filtering system. Filter by skills, experience, education, location, and more to find the perfect match for your position. Premium plans offer additional search features and direct messaging capabilities.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      questions: [
        {
          id: 'browser-compatibility',
          question: 'Which browsers are supported?',
          answer: 'FutureLift is optimized for the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend keeping your browser updated to the latest version.'
        },
        {
          id: 'reset-password',
          question: 'How do I reset my password?',
          answer: 'To reset your password, click on "Forgot Password" on the login page. Enter the email address associated with your account, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
        },
        {
          id: 'technical-issues',
          question: 'I\'m experiencing technical issues. What should I do?',
          answer: 'If you\'re experiencing technical issues, first try clearing your browser cache and cookies, then restart your browser. If the problem persists, please contact our support team through the "Help" section with details about the issue and screenshots if possible.'
        }
      ]
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
          <p className="mt-4 text-xl text-gray-600">Find answers to common questions about using FutureLift</p>
        </div>

        {/* Search bar */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search for questions..."
            />
          </div>
        </div>

        {/* FAQs by category */}
        <div className="space-y-10">
          {faqCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {category.questions.map((item) => (
                  <div key={item.id} className="px-6 py-4">
                    <button
                      className="flex justify-between items-center w-full text-left"
                      onClick={() => toggleItem(item.id)}
                    >
                      <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                      <span className="ml-6 flex-shrink-0">
                        <i className={`fas ${openItems[item.id] ? 'fa-minus' : 'fa-plus'} text-primary-500`}></i>
                      </span>
                    </button>
                    {openItems[item.id] && (
                      <div className="mt-4 text-base text-gray-600">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Still have questions?</h2>
          <p className="mt-4 text-lg text-gray-600">
            If you couldn't find the answer to your question, feel free to contact our support team.
          </p>
          <div className="mt-6">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 