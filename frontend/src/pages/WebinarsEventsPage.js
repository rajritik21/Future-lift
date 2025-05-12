import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const WebinarsEventsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Get current date for filtering
  const currentDate = new Date();
  
  const allEvents = [
    {
      id: 1,
      title: 'How to Crack Technical Interviews at Top Tech Companies',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 5),
      time: '3:00 PM - 4:30 PM IST',
      speaker: 'Rahul Sharma',
      speakerTitle: 'Senior Engineering Manager at Google',
      description: 'Learn strategies, common patterns, and preparation tips to excel in technical interviews at FAANG and other tech giants.',
      type: 'webinar',
      registrationLink: '/register/event/1',
      image: '/images/events/tech-interview.jpg'
    },
    {
      id: 2,
      title: 'Resume & LinkedIn Profile Optimization Workshop',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 12),
      time: '5:00 PM - 6:30 PM IST',
      speaker: 'Priya Desai',
      speakerTitle: 'Career Coach & HR Consultant',
      description: 'Practical workshop to transform your resume and LinkedIn profile to attract recruiters and get more interview calls.',
      type: 'workshop',
      registrationLink: '/register/event/2',
      image: '/images/events/resume-workshop.jpg'
    },
    {
      id: 3,
      title: 'Campus Placement Preparation Masterclass',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 20),
      time: '2:00 PM - 5:00 PM IST',
      speaker: 'Vikram Mehta',
      speakerTitle: 'Placement Coordinator at IIT Delhi',
      description: 'Comprehensive guide for final year students on how to prepare and succeed in campus placement processes.',
      type: 'masterclass',
      registrationLink: '/register/event/3',
      image: '/images/events/campus-placement.jpg'
    },
    {
      id: 4,
      title: 'Data Science Career Paths & Industry Trends 2023',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 8),
      time: '6:00 PM - 7:30 PM IST',
      speaker: 'Dr. Ananya Roy',
      speakerTitle: 'Lead Data Scientist at Microsoft',
      description: 'Explore various career paths in data science, machine learning, and AI, along with the latest industry trends and skill requirements.',
      type: 'webinar',
      registrationLink: '/register/event/4',
      image: '/images/events/data-science.jpg'
    },
    {
      id: 5,
      title: 'Mock Interview Sessions for IT Professionals',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 15),
      time: '10:00 AM - 4:00 PM IST',
      speaker: 'Industry Professionals Panel',
      speakerTitle: 'From leading tech companies',
      description: 'Get real interview experience with industry professionals who will provide immediate feedback and improvement suggestions.',
      type: 'event',
      registrationLink: '/register/event/5',
      image: '/images/events/mock-interview.jpg'
    },
    {
      id: 6,
      title: 'How I Landed My Dream Job - Success Stories',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 5),
      time: '4:00 PM - 5:30 PM IST',
      speaker: 'Various Alumni',
      speakerTitle: 'From leading companies and startups',
      description: 'Hear success stories from professionals who landed their dream jobs, with practical tips and insights from their journey.',
      type: 'panel',
      registrationLink: '/register/event/6',
      image: '/images/events/success-stories.jpg'
    },
    {
      id: 7,
      title: 'Future of Work: Remote Jobs and Digital Nomad Careers',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 10),
      time: '3:00 PM - 4:00 PM IST',
      speaker: 'Sameer Joshi',
      speakerTitle: 'Remote Work Consultant',
      description: 'Explore opportunities in remote work, strategies to land international remote jobs, and how to thrive as a digital nomad.',
      type: 'webinar',
      registrationLink: '/register/event/7',
      image: '/images/events/remote-work.jpg'
    },
    {
      id: 8,
      title: 'Entrepreneurship vs Corporate: Choosing Your Path',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 15),
      time: '5:00 PM - 6:30 PM IST',
      speaker: 'Neha Kapoor',
      speakerTitle: 'Startup Founder & Ex-McKinsey',
      description: 'Weighing the pros and cons of entrepreneurship versus corporate careers, with guidance on making the right choice for your personality and goals.',
      type: 'webinar',
      registrationLink: '/register/event/8',
      image: '/images/events/entrepreneurship.jpg'
    }
  ];
  
  // Filter events based on active tab
  const filteredEvents = allEvents.filter(event => {
    if (activeTab === 'upcoming') {
      return event.date >= currentDate;
    } else if (activeTab === 'past') {
      return event.date < currentDate;
    }
    return true;
  });
  
  // Sort upcoming events by date (closest first)
  // Sort past events by date (most recent first)
  filteredEvents.sort((a, b) => {
    if (activeTab === 'upcoming') {
      return a.date - b.date;
    } else {
      return b.date - a.date;
    }
  });
  
  // Format date as "Mon, DD MMM YYYY"
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  const eventTypes = {
    webinar: { label: 'Webinar', color: 'blue' },
    workshop: { label: 'Workshop', color: 'green' },
    masterclass: { label: 'Masterclass', color: 'purple' },
    event: { label: 'Event', color: 'orange' },
    panel: { label: 'Panel Discussion', color: 'pink' }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <Helmet>
        <title>Webinars & Events | FutureLift Job Portal</title>
        <meta name="description" content="Stay ahead with our free webinars and career events. Connect with industry professionals and learn job hunt strategies." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            📢 Webinars & Events
          </h1>
          <p className="text-xl text-primary-600 font-semibold">
            Stay Ahead with Our Free Webinars & Career Events
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="border-b">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-6 py-3 text-lg font-medium ${
                    activeTab === 'upcoming'
                      ? 'border-b-2 border-primary-600 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Upcoming Events
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`px-6 py-3 text-lg font-medium ${
                    activeTab === 'past'
                      ? 'border-b-2 border-primary-600 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Past Events
                </button>
              </div>
            </div>
            
            <div className="p-8">
              {filteredEvents.length > 0 ? (
                <div className="space-y-8">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="flex flex-col md:flex-row bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <div className="md:w-1/3 lg:w-1/4">
                        <div className="h-48 md:h-full w-full overflow-hidden">
                          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 md:mb-0">{event.title}</h3>
                          <span className={`bg-${eventTypes[event.type].color}-100 text-${eventTypes[event.type].color}-800 text-xs px-2 py-1 rounded-full font-medium`}>
                            {eventTypes[event.type].label}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span>{event.speaker}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-6">{event.description}</p>
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-auto">
                          <div className="text-sm text-gray-500 italic mb-2 sm:mb-0">{event.speakerTitle}</div>
                          
                          {activeTab === 'upcoming' ? (
                            <Link
                              to={event.registrationLink}
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              Reserve Your Seat
                              <svg className="ml-1 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </Link>
                          ) : (
                            <Link
                              to={`/resources/webinars-events/recordings/${event.id}`}
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              Watch Recording
                              <svg className="ml-1 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No events found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {activeTab === 'upcoming' 
                      ? 'Check back soon for upcoming events!'
                      : 'Past events will be listed here.'}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-100">
              <div className="flex items-start">
                <div className="bg-yellow-100 rounded-full p-3 mr-4">
                  <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Q&A sessions on job hunt strategies</h3>
                  <p className="text-gray-700">
                    Get answers to your most pressing questions about job hunting, interviews, and career advancement from industry experts.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Resume reviews & interview simulations</h3>
                  <p className="text-gray-700">
                    Participate in live resume review sessions and mock interviews with feedback from hiring managers and recruiters.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 border border-green-100">
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Live sessions with industry professionals</h3>
                  <p className="text-gray-700">
                    Connect with professionals from top companies who share insights into their industries and answer your questions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Upcoming campus placement guidance events</h3>
                  <p className="text-gray-700">
                    Special sessions for students and recent graduates on navigating campus placement processes successfully.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 bg-primary-50">
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
                  <div className="bg-white rounded-full p-4 shadow-md">
                    <svg className="h-16 w-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">🗓️ Check our calendar and reserve your seat today!</h3>
                  <p className="text-gray-700 mb-6">
                    Don't miss out on our valuable events! Subscribe to our calendar to stay updated on upcoming webinars, workshops, and career events.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                    <a
                      href="/resources/webinars-events/calendar"
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      View Full Calendar
                    </a>
                    <a
                      href="/resources/webinars-events/subscribe"
                      className="inline-flex items-center justify-center px-6 py-3 border border-primary-300 rounded-md shadow-sm text-base font-medium text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Subscribe to Updates
                    </a>
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
                    <Link to="/resources/free-courses" className="text-primary-600 hover:text-primary-800 font-medium">Free Courses</Link>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Link 
                    to="/contact" 
                    className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
                  >
                    Suggest an event topic
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

export default WebinarsEventsPage; 