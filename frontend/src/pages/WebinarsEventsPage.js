import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const WebinarsEventsPage = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const [playingVideo, setPlayingVideo] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [preferences, setPreferences] = useState({
    webinars: true,
    workshops: false,
    success_stories: false,
    motivation: false
  });
  
  // Get current date for filtering
  const currentDate = new Date();
  
  // Function to toggle video playback
  const toggleVideo = (eventId, youtubeId) => {
    if (playingVideo === eventId) {
      // If already playing this video, stop it
      setPlayingVideo(null);
    } else {
      // Start playing this video
      setPlayingVideo(eventId);
    }
  };

  // Function to handle subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    
    // Reset states
    setSubscribed(false);
    setAlreadySubscribed(false);
    
    // Send subscription data to backend API
    fetch('/api/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        skills: 'Webinar & Events Subscriber', // Provide a default value
        source: 'webinars',
        preferences: {
          jobAlerts: true,
          events: true,
          newsletters: preferences.webinars || preferences.workshops || preferences.success_stories || preferences.motivation
        }
      }),
    })
      .then(response => {
        console.log('Response status:', response.status);
        return response.json().then(data => {
          console.log('Response data:', data);
          if (!response.ok) {
            // Check if this is a duplicate email error
            if (data.message && data.message.toLowerCase().includes('already subscribed')) {
              setAlreadySubscribed(true);
              throw new Error('Already subscribed');
            }
            throw new Error(data.message || 'Failed to subscribe');
          }
          return data;
        });
      })
      .then(data => {
        console.log('Webinars subscription successful:', data);
        
        // Store email in localStorage for display
        localStorage.setItem('subscribedEmail', email);
        
        // Show success message
        setSubscribed(true);
        
        // Reset form but keep the success message visible
        setEmail('');
      })
      .catch(error => {
        console.error('Error during subscription:', error);
        
        // Don't show alert for already subscribed case
        if (!error.message.includes('Already subscribed')) {
          alert(error.message || 'Failed to subscribe. Please try again later.');
        }
      });
  };

  // Function to close modal and reset state
  const closeModal = () => {
    setShowSubscribeModal(false);
    setEmail('');
    setSubscribed(false);
    setAlreadySubscribed(false);
    setPreferences({
      webinars: true,
      workshops: false,
      success_stories: false,
      motivation: false
    });
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.checked
    });
  };
  
  // Function to handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Reset already subscribed state when user types
    if (alreadySubscribed) setAlreadySubscribed(false);
  };
  
  // Function to render YouTube thumbnail with play button
  const renderYouTubeThumbnail = (youtubeId, title, eventId) => {
    const isPlaying = playingVideo === eventId;
    
    return (
      <div className="relative w-full h-full">
        {isPlaying ? (
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          ></iframe>
        ) : (
          <>
            <img 
              src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`} 
              alt={title} 
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                // Fallback to medium quality thumbnail if HD is not available
                e.target.onerror = null;
                e.target.src = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
              }}
            />
            <div 
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity group-hover:bg-opacity-50 cursor-pointer"
              onClick={() => toggleVideo(eventId, youtubeId)}
            >
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  
  const allEvents = [
    {
      id: 1,
      title: 'Software Engineering Job Interview – Full Mock Interview',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 5),
      time: '3:00 PM - 4:30 PM IST',
      speaker: 'Rahul Sharma',
      speakerTitle: 'Senior Engineering Manager at Google',
      description: 'This comprehensive mock interview showcases the real dynamics of technical interviews at major tech firms, helping you prepare for challenging coding questions and system design problems.',
      type: 'webinar',
      registrationLink: '/register/event/1',
      image: '/images/events/tech-interview.jpg',
      youtubeId: '1qw5ITr3k9E'
    },
    {
      id: 2,
      title: 'LinkedIn Profile Optimization for Job Seekers in 2025',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 12),
      time: '5:00 PM - 6:30 PM IST',
      speaker: 'Priya Desai',
      speakerTitle: 'Career Coach & HR Consultant',
      description: 'Learn practical strategies to enhance your LinkedIn profile to attract recruiters, increase visibility, and stand out in the competitive job market with proven optimization techniques.',
      type: 'workshop',
      registrationLink: '/register/event/2',
      image: '/images/events/resume-workshop.jpg',
      youtubeId: 'EhqCZrnSLNc'
    },
    {
      id: 3,
      title: 'Complete Placement Preparation Masterclass',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 20),
      time: '2:00 PM - 5:00 PM IST',
      speaker: 'Vikram Mehta',
      speakerTitle: 'Placement Coordinator at IIT Delhi',
      description: 'Comprehensive guide covering essential topics for campus placements, including aptitude, coding, data structures, algorithms, and interview preparation techniques for students.',
      type: 'masterclass',
      registrationLink: '/register/event/3',
      image: '/images/events/campus-placement.jpg',
      youtubeId: '3BGAxC9uvUo'
    },
    {
      id: 4,
      title: 'Top Data Science & Coding Job Roles for Life Sciences',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 8),
      time: '6:00 PM - 7:30 PM IST',
      speaker: 'Dr. Ananya Roy',
      speakerTitle: 'Lead Data Scientist at Microsoft',
      description: 'Explore specialized career paths in data science for life sciences, including required skills, industry trends, and how to transition from traditional roles to data-focused positions.',
      type: 'webinar',
      registrationLink: '/register/event/4',
      image: '/images/events/data-science.jpg',
      youtubeId: 'Kh0KVaCVXY8'
    },
    {
      id: 5,
      title: 'Job Interview Simulation and Training - Mock Interview',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 15),
      time: '10:00 AM - 4:00 PM IST',
      speaker: 'Industry Professionals Panel',
      speakerTitle: 'From leading tech companies',
      description: 'Experience realistic mock interview sessions with immediate feedback and coaching on both technical skills and behavioral responses to help you excel in actual job interviews.',
      type: 'event',
      registrationLink: '/register/event/5',
      image: '/images/events/mock-interview.jpg',
      youtubeId: 'srw4r3htm4U'
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
      image: '/images/events/success-stories.jpg',
      youtubeId: 'wfNX1cHk-fE',
      youtubeTitle: 'Success Stories: Landing Your Dream Job',
      category: 'success'
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
      image: '/images/events/remote-work.jpg',
      youtubeId: '3b_WaZwn_DY',
      youtubeTitle: 'Remote Work Strategies for 2023',
      category: 'career'
    },
    {
      id: 8,
      title: 'Entrepreneurship vs Intrapreneurship: How to Choose Your Path',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 15),
      time: '5:00 PM - 6:30 PM IST',
      speaker: 'Neha Kapoor',
      speakerTitle: 'Startup Founder & Ex-McKinsey',
      description: 'Compare the different paths of entrepreneurship and intrapreneurship to find which career option best aligns with your skills, personality, and goals.',
      type: 'webinar',
      registrationLink: '/register/event/8',
      image: '/images/events/entrepreneurship.jpg',
      youtubeId: 'ja6zXnAcMAk',
      youtubeTitle: 'Entrepreneurship vs Intrapreneurship: How to Choose Your Path',
      category: 'career'
    },
    {
      id: 9,
      title: 'From Student to Engineer: Dyson\'s Unique Pathway',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 20),
      time: '2:00 PM - 3:30 PM IST',
      speaker: 'Dyson Engineering Team',
      speakerTitle: 'Dyson Degree Apprenticeship Programme',
      description: 'An inside look at Dyson\'s Degree Apprenticeship Programme, showcasing how students transition into professional engineers through hands-on experience and academic learning.',
      type: 'success-story',
      registrationLink: '/register/event/9',
      image: '/images/events/student-success.jpg',
      youtubeId: 'NhqXNOu7bac',
      youtubeTitle: 'From Student to Engineer: Dyson\'s Unique Pathway',
      category: 'success'
    },
    {
      id: 10,
      title: 'From Engineering Student to Design Engineer',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 25),
      time: '1:00 PM - 2:30 PM IST',
      speaker: 'FormaWin Team',
      speakerTitle: 'Design Engineering Professionals',
      description: 'A firsthand account of a student\'s journey from academia to becoming a successful design engineer, with insights into the transition and skills required.',
      type: 'success-story',
      registrationLink: '/register/event/10',
      image: '/images/events/design-engineer.jpg',
      youtubeId: 'nTGf_LRpWbg',
      youtubeTitle: 'From Engineering Student to Design Engineer',
      category: 'success'
    },
    {
      id: 11,
      title: 'Student Success Story – Venkatesh Kumar Raju',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 30),
      time: '4:00 PM - 5:00 PM IST',
      speaker: 'Venkatesh Kumar Raju',
      speakerTitle: 'Engineering Graduate',
      description: 'An inspiring story of an engineering graduate from Chennai who overcame challenges to achieve success in his career and personal growth.',
      type: 'success-story',
      registrationLink: '/register/event/11',
      image: '/images/events/student-success.jpg',
      youtubeId: '4xRoD9fYvRg',
      youtubeTitle: 'Student Success Story – Venkatesh Kumar Raju',
      category: 'success'
    },
    {
      id: 12,
      title: 'First-Generation Student Success Story – Robert Lamm',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 35),
      time: '3:00 PM - 4:00 PM IST',
      speaker: 'Robert Lamm',
      speakerTitle: 'Environmental Engineering Researcher',
      description: 'A legally blind student\'s inspiring journey into environmental engineering and research, showcasing perseverance and determination.',
      type: 'success-story',
      registrationLink: '/register/event/12',
      image: '/images/events/student-success.jpg',
      youtubeId: '1Go6sN9GFw4',
      youtubeTitle: 'First-Generation Student Success Story – Robert Lamm',
      category: 'success'
    },
    {
      id: 13,
      title: 'Student Success Stories: Allen Calderwood',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 40),
      time: '5:00 PM - 6:00 PM IST',
      speaker: 'Allen Calderwood',
      speakerTitle: 'Software Engineer at Google',
      description: 'A computer science and mathematics graduate shares his path to securing a job at Google and the strategies that helped him succeed.',
      type: 'success-story',
      registrationLink: '/register/event/13',
      image: '/images/events/student-success.jpg',
      youtubeId: 'hv8d0DwOP60',
      youtubeTitle: 'Student Success Stories: Allen Calderwood',
      category: 'success'
    },
    {
      id: 14,
      title: 'Engineering Student Motivation',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 45),
      time: '6:00 PM - 7:00 PM IST',
      speaker: 'Motivational Panel',
      speakerTitle: 'Engineering Professionals',
      description: 'A motivational video aimed at inspiring engineering students to persevere through challenges and maintain focus on their long-term goals.',
      type: 'motivation',
      registrationLink: '/register/event/14',
      image: '/images/events/motivation.jpg',
      youtubeId: 'wr3b59C8l7w',
      youtubeTitle: 'Engineering Student Motivation',
      category: 'motivation'
    },
    {
      id: 15,
      title: 'Watch This If You Need Engineering Motivation',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 50),
      time: '7:00 PM - 8:00 PM IST',
      speaker: 'Engineering Mentors',
      speakerTitle: 'Industry Professionals',
      description: 'A personal take on staying motivated during the engineering journey, with practical tips and inspirational stories to keep you going.',
      type: 'motivation',
      registrationLink: '/register/event/15',
      image: '/images/events/motivation.jpg',
      youtubeId: 'fRfSOLvd58o',
      youtubeTitle: 'Watch This If You Need Engineering Motivation',
      category: 'motivation'
    },
    {
      id: 16,
      title: 'Engineering STAY WITH IT (2024)',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 55),
      time: '5:30 PM - 6:30 PM IST',
      speaker: 'Engineering Mentors',
      speakerTitle: 'Industry Professionals',
      description: 'A poetic and powerful message encouraging students to persist in their engineering pursuits despite challenges and setbacks.',
      type: 'motivation',
      registrationLink: '/register/event/16',
      image: '/images/events/motivation.jpg',
      youtubeId: 'zDappKOl2fg',
      youtubeTitle: 'Engineering STAY WITH IT (2024)',
      category: 'motivation'
    },
    {
      id: 17,
      title: 'Finding Passion in Engineering for Career Success',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 60),
      time: '4:30 PM - 5:30 PM IST',
      speaker: 'Dr. Bellandra Foster',
      speakerTitle: 'Engineering Professor',
      description: 'Dr. Bellandra Foster discusses overcoming challenges and finding joy in engineering to build a fulfilling and successful career.',
      type: 'motivation',
      registrationLink: '/register/event/17',
      image: '/images/events/motivation.jpg',
      youtubeId: '_-jVXCOIqGo',
      youtubeTitle: 'Finding Passion in Engineering for Career Success',
      category: 'motivation'
    },
    {
      id: 18,
      title: 'Opportunities and My Career Success in Engineering',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 65),
      time: '3:30 PM - 4:30 PM IST',
      speaker: 'Industry Professionals',
      speakerTitle: 'Engineering Leaders',
      description: 'Insights into leveraging opportunities for a successful engineering career, with practical advice on networking and skill development.',
      type: 'motivation',
      registrationLink: '/register/event/18',
      image: '/images/events/motivation.jpg',
      youtubeId: 'piXQ7_2-S-Y',
      youtubeTitle: 'Opportunities and My Career Success in Engineering',
      category: 'motivation'
    }
  ];
  
  // Filter events based on active tab
  const filteredEvents = allEvents.filter(event => {
    if (activeTab === 'featured') {
      return event.date >= currentDate;
    } else if (activeTab === 'past') {
      return event.date < currentDate && (categoryFilter === 'all' || event.category === categoryFilter);
    }
    return true;
  });
  
  // Sort upcoming events by date (closest first)
  // Sort past events by date (most recent first)
  filteredEvents.sort((a, b) => {
    if (activeTab === 'featured') {
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
    panel: { label: 'Panel Discussion', color: 'pink' },
    'success-story': { label: 'Success Story', color: 'green' },
    motivation: { label: 'Motivation', color: 'yellow' }
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
                  onClick={() => setActiveTab('featured')}
                  className={`px-6 py-3 text-lg font-medium flex items-center ${
                    activeTab === 'featured'
                      ? 'border-b-2 border-primary-600 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  Featured Resources
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`px-6 py-3 text-lg font-medium flex items-center ${
                    activeTab === 'past'
                      ? 'border-b-2 border-primary-600 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Past Events
                </button>
              </div>
            </div>
            
            {activeTab === 'featured' && (
              <div className="bg-gradient-to-r from-indigo-100 to-blue-100 p-6 border-b">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                    <div className="bg-gradient-to-r from-primary-600 to-indigo-600 rounded-full p-3 shadow-lg">
                      <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Career-Boosting Video Resources</h3>
                    <p className="text-gray-700">
                      Access our expertly curated collection of career development workshops, mock interviews, and industry insights to enhance your job search journey. Register now for live Q&A sessions with the presenters!
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'past' && (
              <div className="border-b">
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <div className="bg-white rounded-full p-3 shadow-md">
                        <svg className="h-8 w-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {categoryFilter === 'success' ? '🎓 Student Success Stories & Career Journeys' : 
                         categoryFilter === 'motivation' ? '💡 Motivational & Career Advice' :
                         categoryFilter === 'career' ? '🌟 Career Development Resources' :
                         '📚 All Learning Resources'}
                      </h3>
                      <p className="text-gray-700">
                        {categoryFilter === 'success' ? 'Inspiring stories from students who successfully navigated their career paths and achieved their professional goals.' : 
                         categoryFilter === 'motivation' ? 'Motivational content to keep you inspired and focused on your engineering and career journey.' :
                         categoryFilter === 'career' ? 'Expert advice and insights to help you make informed career decisions and advance professionally.' :
                         'Browse our complete collection of educational videos, success stories, and career resources.'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3 mt-4 pb-4 px-6">
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      categoryFilter === 'all' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Videos
                  </button>
                  <button
                    onClick={() => setCategoryFilter('success')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      categoryFilter === 'success' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Success Stories
                    </span>
                  </button>
                  <button
                    onClick={() => setCategoryFilter('motivation')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      categoryFilter === 'motivation' 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      Motivational Videos
                    </span>
                  </button>
                  <button
                    onClick={() => setCategoryFilter('career')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      categoryFilter === 'career' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Career Advice
                    </span>
                  </button>
                </div>
              </div>
            )}
            
            <div className="p-8">
              {filteredEvents.length > 0 ? (
                <div className="space-y-8">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="flex flex-col md:flex-row bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <div className="md:w-1/3 lg:w-1/4">
                        {activeTab === 'past' && event.youtubeId ? (
                          <a 
                            href={`https://www.youtube.com/watch?v=${event.youtubeId}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="h-48 md:h-full w-full block"
                          >
                            {renderYouTubeThumbnail(event.youtubeId, event.youtubeTitle || event.title, event.id)}
                          </a>
                        ) : event.youtubeId ? (
                          <div className="h-48 md:h-full w-full relative">
                            {renderYouTubeThumbnail(event.youtubeId, event.title, event.id)}
                            <div className="absolute bottom-0 right-0 m-2">
                              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">Preview Available</span>
                            </div>
                          </div>
                        ) : (
                          <div className="h-48 md:h-full w-full overflow-hidden">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                          </div>
                        )}
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
                          
                          {activeTab === 'featured' ? (
                            event.youtubeId ? (
                              <button
                                onClick={() => toggleVideo(event.id, event.youtubeId)}
                                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                  playingVideo === event.id ? 'bg-red-600 hover:bg-red-700' : 'bg-primary-600 hover:bg-primary-700'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                              >
                                {playingVideo === event.id ? (
                                  <>
                                    Pause Video
                                    <svg className="ml-1 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                  </>
                                ) : (
                                  <>
                                    Play Video
                                    <svg className="ml-1 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                  </>
                                )}
                              </button>
                            ) : (
                              <Link
                                to={event.registrationLink}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                              >
                                Reserve Your Seat
                                <svg className="ml-1 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </Link>
                            )
                          ) : (
                            event.youtubeId ? (
                              <a
                                href={`https://www.youtube.com/watch?v=${event.youtubeId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                Watch on YouTube
                                <svg className="ml-1 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"></path>
                                </svg>
                              </a>
                            ) : (
                              <Link
                                to={`/resources/webinars-events/recordings/${event.id}`}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                              >
                                Watch Recording
                                <svg className="ml-1 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </Link>
                            )
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
                    {activeTab === 'featured' 
                      ? 'Check back soon for featured events!'
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
          
          {/* YouTube Channel Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="h-24 bg-gradient-to-r from-red-600 to-red-700 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ 
                backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
              }}></div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-6">
                <h2 className="text-2xl font-bold text-white">FutureLift YouTube Channel</h2>
                <div className="bg-white rounded-full p-2">
                  <svg className="w-6 h-6 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="p-8">
              <p className="text-gray-700 mb-6">
                Subscribe to our YouTube channel for career tips, interview preparation advice, and recordings of our past webinars and events.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <a 
                  href="https://www.youtube.com/watch?v=wfNX1cHk-fE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative">
                      {renderYouTubeThumbnail('wfNX1cHk-fE', 'Success Stories: Landing Your Dream Job', 6)}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <span className="text-white font-medium">Success Stories: Landing Your Dream Job</span>
                      </div>
                    </div>
                    <div className="p-3 bg-white">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        Hear from professionals who successfully landed their dream jobs and learn from their experiences.
                      </p>
                    </div>
                  </div>
                </a>

                <a 
                  href="https://www.youtube.com/watch?v=3b_WaZwn_DY" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative">
                      {renderYouTubeThumbnail('3b_WaZwn_DY', 'Remote Work Strategies for 2023', 7)}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <span className="text-white font-medium">Remote Work Strategies for 2023</span>
                      </div>
                    </div>
                    <div className="p-3 bg-white">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        Learn how to find, apply for, and excel in remote work opportunities in today's digital workplace.
                      </p>
                    </div>
                  </div>
                </a>

                <a 
                  href="https://www.youtube.com/watch?v=ja6zXnAcMAk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative">
                      {renderYouTubeThumbnail('ja6zXnAcMAk', 'Entrepreneurship vs Intrapreneurship: How to Choose Your Path', 8)}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <span className="text-white font-medium">Entrepreneurship vs Intrapreneurship</span>
                      </div>
                    </div>
                    <div className="p-3 bg-white">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        Discover the key differences between entrepreneurship and intrapreneurship and how to choose the path that's right for you.
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-6 text-center">
                <a 
                  href="https://www.youtube.com/@futurelift" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Visit Our YouTube Channel
                  <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Curated Playlists Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="h-24 bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ 
                backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
              }}></div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-6">
                <h2 className="text-2xl font-bold text-white">🌟 Playlists & Channels for Ongoing Inspiration</h2>
                <div className="bg-white rounded-full p-2">
                  <svg className="w-6 h-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 6h16v2H4zm2-4h12v2H6zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10H4v-8h16v8zm-10-7.27v6.53L16 16z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="p-8">
              <p className="text-gray-700 mb-6">
                Explore our curated playlists designed to provide continuous inspiration and learning opportunities for your engineering career journey.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg overflow-hidden border border-purple-100">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Motivational Videos to Ignite Your Engineering Career</h3>
                    <p className="text-gray-700 mb-4">
                      A curated playlist of short, action-oriented videos designed to provide tools and mindset for success in your engineering journey.
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <svg className="w-5 h-5 mr-2 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 6h16v2H4zm2-4h12v2H6zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10H4v-8h16v8zm-10-7.27v6.53L16 16z"/>
                      </svg>
                      10 videos • Updated monthly
                    </div>
                    <a 
                      href="https://www.youtube.com/playlist?list=PLR_jPfME-b_WhrolrM6JODWSXipNBz89L" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Watch Playlist
                      <svg className="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    <img src={`https://img.youtube.com/vi/wr3b59C8l7w/mqdefault.jpg`} alt="Thumbnail" className="w-full h-20 object-cover" />
                    <img src={`https://img.youtube.com/vi/fRfSOLvd58o/mqdefault.jpg`} alt="Thumbnail" className="w-full h-20 object-cover" />
                    <img src={`https://img.youtube.com/vi/zDappKOl2fg/mqdefault.jpg`} alt="Thumbnail" className="w-full h-20 object-cover" />
                    <img src={`https://img.youtube.com/vi/_-jVXCOIqGo/mqdefault.jpg`} alt="Thumbnail" className="w-full h-20 object-cover" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg overflow-hidden border border-green-100">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Student Success Stories – Mission College</h3>
                    <p className="text-gray-700 mb-4">
                      A series of videos highlighting diverse student success stories in engineering and other technical fields, providing inspiration and practical insights.
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <svg className="w-5 h-5 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 6h16v2H4zm2-4h12v2H6zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10H4v-8h16v8zm-10-7.27v6.53L16 16z"/>
                      </svg>
                      8 videos • Regularly updated
                    </div>
                    <a 
                      href="https://www.youtube.com/playlist?list=PLR_jPfME-b_WhrolrM6JODWSXipNBz89L" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Watch Playlist
                      <svg className="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    <img src={`https://img.youtube.com/vi/NhqXNOu7bac/mqdefault.jpg`} alt="Thumbnail" className="w-full h-20 object-cover" />
                    <img src={`https://img.youtube.com/vi/nTGf_LRpWbg/mqdefault.jpg`} alt="Thumbnail" className="w-full h-20 object-cover" />
                    <img src={`https://img.youtube.com/vi/4xRoD9fYvRg/mqdefault.jpg`} alt="Thumbnail" className="w-full h-20 object-cover" />
                    <img src={`https://img.youtube.com/vi/1Go6sN9GFw4/mqdefault.jpg`} alt="Thumbnail" className="w-full h-20 object-cover" />
                  </div>
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
                    <button
                      onClick={() => setShowSubscribeModal(true)}
                      className="inline-flex items-center justify-center px-6 py-3 border border-primary-300 rounded-md shadow-sm text-base font-medium text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Subscribe to Updates
                    </button>
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

      {/* Subscription Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {subscribed ? (
                <div className="px-4 py-5 sm:p-6 text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-3 text-lg leading-6 font-medium text-gray-900">
                    Thank You for Subscribing!
                  </h3>
                  <div className="mt-3 text-sm text-gray-500">
                    <p>You're now on our list! We'll keep you updated with the latest events and resources based on your preferences.</p>
                    <p className="mt-2">Check your inbox for a confirmation email at <span className="font-medium text-gray-700">{localStorage.getItem('subscribedEmail')}</span>.</p>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </div>
              ) : alreadySubscribed ? (
                <div className="px-4 py-5 sm:p-6 text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                    <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="mt-3 text-lg leading-6 font-medium text-gray-900">
                    Already Subscribed!
                  </h3>
                  <div className="mt-3 text-sm text-gray-500">
                    <p>This email is already in our subscription list. We'll continue to send you updates about events and resources.</p>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      onClick={() => setAlreadySubscribed(false)}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm"
                    >
                      Try Different Email
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="bg-primary-50 px-4 py-5 border-b border-gray-200 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Subscribe to Event Updates
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Stay informed about upcoming events that match your interests.
                    </p>
                  </div>
                  <form onSubmit={handleSubscribe} className="px-4 py-5 sm:p-6">
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    
                    <fieldset className="mb-4">
                      <legend className="text-sm font-medium text-gray-700">Event preferences</legend>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="webinars"
                              name="webinars"
                              type="checkbox"
                              checked={preferences.webinars}
                              onChange={handleCheckboxChange}
                              className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="webinars" className="font-medium text-gray-700">
                              Webinars
                            </label>
                            <p className="text-gray-500">Live online sessions with industry experts</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="workshops"
                              name="workshops"
                              type="checkbox"
                              checked={preferences.workshops}
                              onChange={handleCheckboxChange}
                              className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="workshops" className="font-medium text-gray-700">
                              Workshops
                            </label>
                            <p className="text-gray-500">Hands-on training sessions and masterclasses</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="success_stories"
                              name="success_stories"
                              type="checkbox"
                              checked={preferences.success_stories}
                              onChange={handleCheckboxChange}
                              className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="success_stories" className="font-medium text-gray-700">
                              Success Stories
                            </label>
                            <p className="text-gray-500">Inspiring career journeys and achievements</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="motivation"
                              name="motivation"
                              type="checkbox"
                              checked={preferences.motivation}
                              onChange={handleCheckboxChange}
                              className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="motivation" className="font-medium text-gray-700">
                              Motivational Content
                            </label>
                            <p className="text-gray-500">Career advice and motivational resources</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm"
                      >
                        Subscribe
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebinarsEventsPage; 