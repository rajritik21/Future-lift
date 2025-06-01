import React from 'react';
import RitikImage from '../assets/team_members/Ritik.jpg';
import AayanImage from '../assets/team_members/Aayan.jpg';
import SanjanaImage from '../assets/team_members/Sanjana.jpg';
import GulshanImage from '../assets/team_members/Gulshan.jpg';

const TeamPage = () => {
  // Team members data
  const teamMembers = [
    {
      id: 2,
      name: 'Md Aayan Haque',
      image: AayanImage,
      position: 'Co-Founder & Frontend Developer',
      address: 'Nawadih, Lakhisarai, Bihar, 811311',
      phone: '+91 8114509412',
      email: 'mdaayanhaque8114@gmail.com',
      website: 'https://aayanhaque.github.io/Portfolio/',
      linkedin: 'https://www.linkedin.com/in/md-aayan-haque8114/'
    },
    {
      id: 4,
      name: 'Gulshan Kumar',
      image: GulshanImage,
      position: 'Co-Founder & Database Specialist',
      address: 'Anand Nagar, Biharsharif, Nalanda, Bihar, 803101',
      phone: '+91 7519760037',
      email: 'gulshan7519760037@gmail.com',
      linkedin: 'https://www.linkedin.com/in/gulshankrhit/'
    },
    {
      id: 1,
      name: 'Ritik Ranjan',
      image: RitikImage,
      position: 'Founder & Full Stack Developer',
      address: 'Sarvoday Nagar, Biharsharif, Nalanda, Bihar, 803101',
      phone: '+91 8709908484',
      email: 'rajritik21av@gmail.com',
      website: 'https://rajritik21.github.io/Ritik_Portfolio/',
      linkedin: 'https://www.linkedin.com/in/ritik-ranjan-15913522a/'
    },
    {
      id: 3,
      name: 'Sanjana Kumari',
      image: SanjanaImage,
      position: 'Co-Founder & UI/UX Designer',
      address: 'Mohaddi Nagar, Amber, Biharsharif, Nalanda, Bihar, 803101',
      phone: '+91 9142145703',
      email: 'ssk559404@gmail.com',
      linkedin: 'https://www.linkedin.com/in/sanjana-kumari-306082231/'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 relative overflow-hidden">
       {/* Animated background elements */}
       <style>
        {`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }

          .animate-blob {
            animation: blob 7s infinite;
          }

          .animation-delay-2000 {
            animation-delay: 2s;
          }

          .animation-delay-4000 {
            animation-delay: 4s;
          }

          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .fade-in-up {
            animation: fade-in-up 0.6s ease-out forwards;
          }

          .animation-delay-100 { animation-delay: 0.1s; }
          .animation-delay-200 { animation-delay: 0.2s; }
          .animation-delay-300 { animation-delay: 0.3s; }
          .animation-delay-400 { animation-delay: 0.4s; }
        `}
      </style>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-24 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 fade-in-up">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Meet Our Team</h1>
          <p className="mt-4 text-xl text-gray-500">
            Get to know the amazing people behind FutureLift.
          </p>
        </div>

        {/* Team members grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {teamMembers.map((member, index) => (
            <div key={member.id} className={`bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-110 hover:bg-blue-100 opacity-0 fade-in-up animation-delay-${(index + 1) * 100}`}>
              <div className="h-80 overflow-hidden bg-blue-100">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x400?text=Team+Member';
                  }}
                />
              </div>
             
              <div className="p-6">
                <div className="flex items-center">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <a 
                    href={member.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    <i className="fas fa-globe"></i>
                  </a>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-1 font-medium">{member.position}</p>
                
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-start">
                    <i className="fas fa-map-marker-alt w-4 text-gray-500 mr-2 mt-1"></i>
                    <p className="hover:text-blue-600 transition-colors duration-200">{member.address}</p>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-phone w-4 text-gray-500 mr-2"></i>
                    <p className="hover:text-blue-600 transition-colors duration-200">{member.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-envelope w-4 text-gray-500 mr-2"></i>
                    <p className="break-all hover:text-blue-600 transition-colors duration-200">{member.email}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team values section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              At FutureLift, we're guided by a set of core values that define how we work together and serve our users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <i className="fas fa-handshake text-blue-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Integrity</h3>
              <p className="text-gray-600">
                We believe in transparency, honesty, and doing what's right for our users and partners.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <i className="fas fa-lightbulb text-green-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We constantly seek new ways to improve our platform and provide better career opportunities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <i className="fas fa-users text-yellow-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Collaboration</h3>
              <p className="text-gray-600">
                We work together as a team and with our partners to create the best job portal experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage; 