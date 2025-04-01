import React from 'react';

const TeamPage = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Ritik Ranjan',
      image: '/team/ritik-ranjan.jpg', // Placeholder path, replace with actual image path
      position: 'Founder & Full Stack Developer',
      address: 'Sarvoday Nagar, Biharsharif, Nalanda, Bihar, 803101',
      phone: '8709908484',
      email: 'rajritik21av@gmail.com',
      linkedin: 'https://www.linkedin.com/in/ritik-ranjan'
    },
    
    {
      id: 2,
      name: 'Md Aayan Haque',
      image: '/team/md-aayan-haque.jpg', // Placeholder path, replace with actual image path
      position: 'Co-Founder & Developer',
      address: 'Navadih, Lakhisarai, Bihar, 811311',
      phone: '8114509412',
      email: 'mdaayanhaaque8114@gmail.com',
      linkedin: 'https://www.linkedin.com/in/md-aayan-haque'
    },
    
    {
      id: 3,
      name: 'Sanjana Kumari',
      image: '/team/sanjana-kumari.jpg', // Placeholder path, replace with actual image path
      position: 'Co-Founder & UX/UI Designer',
      address: 'Mohaddi Nagar, Amber, Biharsharif, Nalanda, Bihar, 803101',
      phone: '9142145703',
      email: 'ssk339404@gmail.com',
      linkedin: 'https://www.linkedin.com/in/sanjana-kumari'
    },{
      id: 4  ,
      name: 'Gulshan Kumar',
      image: '/team/gulshan-kumar.jpg', // Placeholder path, replace with actual image path
      position: 'Co-Founder & Designer',
      address: 'Anand Nagar, Biharsharif, Nalanda, Bihar, 803101',
      phone: '7319760037',
      email: 'gulshan7319760037@gmail.com',
      linkedin: 'https://www.linkedin.com/in/gulshan-kumar'
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Meet Our Team</h1>
          <p className="mt-4 text-xl text-gray-500">
            Get to know the amazing people behind FutureLift.
          </p>
        </div>

        {/* Team members grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="h-64 overflow-hidden bg-blue-100">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
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
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-1">{member.position}</p>
                
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex">
                    <i className="fas fa-map-marker-alt w-5 text-gray-500"></i>
                    <p className="ml-2">{member.address}</p>
                  </div>
                  <div className="flex">
                    <i className="fas fa-phone w-5 text-gray-500"></i>
                    <p className="ml-2">{member.phone}</p>
                  </div>
                  <div className="flex">
                    <i className="fas fa-envelope w-5 text-gray-500"></i>
                    <p className="ml-2 break-all">{member.email}</p>
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