import React from 'react';
import { Link } from 'react-router-dom';

const HelpSupportPage = () => {
  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button in the top right corner of the navigation bar. Fill in your details in the registration form and submit it to create your account.'
    },
    {
      question: 'How do I search for jobs?',
      answer: 'You can search for jobs using the search bar on the homepage or by browsing job categories. Use filters to narrow down results based on location, job type, salary range, and more.'
    },
    {
      question: 'How do I apply for a job?',
      answer: 'Once you find a job you\'re interested in, click on it to view the details. Then click the "Apply Now" button. You\'ll need to have your profile completed with your resume and required information before applying.'
    },
    {
      question: 'How do I reset my password?',
      answer: 'If you forgot your password, click on the "Login" button, then select "Forgot Password". Enter your email address and follow the instructions sent to your email to reset your password.'
    },
    {
      question: 'How do I post a job as an employer?',
      answer: 'Employers need to create an employer account. Once registered and logged in, go to your dashboard and click on "Post a New Job". Fill in the job details form and submit it to publish your job listing.'
    },
    {
      question: 'How can I update my profile?',
      answer: 'Log in to your account and go to your dashboard. Click on "Profile" in the left sidebar menu. Here you can update your personal information, upload a new resume, add skills, and more.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">Help & Support</h1>
            <p className="mt-1 text-sm text-gray-600">
              Find answers to common questions or contact our support team.
            </p>
          </div>
          
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Contact Support</h2>
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-indigo-50 p-4 rounded-md flex-1">
                <h3 className="text-lg font-medium text-indigo-800 mb-2">Email Support</h3>
                <p className="text-gray-700 mb-3">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
                <a 
                  href="mailto:support@futurelift.com" 
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  futurelifthit@gmail.com
                </a>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md flex-1">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Contact Us</h3>
                <p className="text-gray-700 mb-3">
                  Have a specific question or need detailed support? Contact us directly.
                </p>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  Go to Contact Page
                </Link>
              </div>
            </div>
            
            <div className="mt-6 bg-yellow-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-yellow-800 mb-2">Phone Support</h3>
              <p className="text-gray-700 mb-2">
                Call us Monday to Friday, 9am to 5pm IST.
              </p>
              <p className="text-lg font-medium">+91 8709908484</p>
            </div>
          </div>
          
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <p className="text-center text-gray-600">
              For more detailed guides and information, check our{' '}
              <Link to="/faq" className="text-indigo-600 hover:text-indigo-800">
                complete FAQ page
              </Link>
              
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage; 