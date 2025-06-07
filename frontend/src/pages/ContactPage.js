import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  // EmailJS configuration
  const serviceId = 'FutureLift';
  const templateId = 'template_uvw2axh';
  const publicKey = 'CO41ki-YmxBxkn7B7';
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(publicKey);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    user_type: 'Job Seeker',
    message: ''
  });
  
  // Add validation state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Validation rules
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 3) {
          error = 'Name should be at least 3 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name should not contain special characters';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          error = 'Invalid email address';
        }
        break;
        
      case 'phone':
        if (value.trim() && !/^\d{10}$/.test(value)) {
          error = 'Phone must be exactly 10 digits';
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if ((value.trim().match(/[a-zA-Z]/g) || []).length < 2) {
          error = 'Message should contain at least 2 letters';
        }
        break;
        
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });
    
    // Validate field on change
    if (name !== 'user_type') {
      const error = validateField(name, newValue);
      setErrors({
        ...errors,
        [name]: error
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      if (key !== 'user_type') {
        const error = validateField(key, formData[key]);
        newErrors[key] = error;
        if (error) {
          valid = false;
        }
      }
    });
    
    // Phone is optional but validate format if provided
    if (formData.phone) {
      const phoneError = validateField('phone', formData.phone);
      newErrors.phone = phoneError;
      if (phoneError) {
        valid = false;
      }
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Prepare template parameters (these should match your EmailJS template variables)
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      user_type: formData.user_type,
      message: formData.message
    };
    
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setSubmitStatus({
          success: true,
          message: 'Your message has been sent successfully! We\'ll get back to you soon.'
        });
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          user_type: 'Job Seeker',
          message: ''
        });
        // Reset errors
        setErrors({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Failed to send email:', error.text);
        setSubmitStatus({
          success: false,
          message: 'Failed to send your message. Please try again later.'
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] py-6 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#5a89fc] rounded-full opacity-20 translate-x-1/3 -translate-y-1/3 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#ffa987] rounded-full opacity-20 -translate-x-1/2 translate-y-1/2 blur-3xl animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-[150px] h-[150px] bg-[#a6c1ff] rounded-full opacity-20 blur-2xl animate-pulse"></div>
      
      {/* Floating blobs */}
      <div className="absolute top-24 left-24 w-[50px] h-[50px] bg-[#ff8f76] rounded-full opacity-30"></div>
      <div className="absolute bottom-24 right-36 w-[80px] h-[80px] bg-[#afc2ff] rounded-full opacity-30"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Contact us heading section */}
        <div className="mb-5 text-center">
          <div className="w-16 h-1 bg-gray-300 mx-auto mb-2"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">Contact us</h1>
        </div>
        
        {/* Contact Information Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Address Box */}
          <div className="bg-white rounded-xl shadow-md p-4 transition-transform hover:scale-105 duration-300 flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <i className="fas fa-map-marker-alt text-xl text-gray-500"></i>
            </div>
            <div>
              <h3 className="text-gray-800 font-medium text-base">Address</h3>
              <p className="text-gray-600 text-sm">HIT COLLEGE,Haldia<br/>Pin 721657</p>
            </div>
          </div>

          {/* Phone Box */}
          <div className="bg-white rounded-xl shadow-md p-4 transition-transform hover:scale-105 duration-300 flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <i className="fas fa-phone-alt text-xl text-gray-500"></i>
            </div>
            <div>
              <h3 className="text-gray-800 font-medium text-base">Call us</h3>
              <p className="text-gray-600 text-sm">+91 8709908484</p>
            </div>
          </div>

          {/* Email Box */}
          <div className="bg-white rounded-xl shadow-md p-4 transition-transform hover:scale-105 duration-300 flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <i className="fas fa-envelope text-xl text-gray-500"></i>
            </div>
            <div>
              <h3 className="text-gray-800 font-medium text-base">Email us</h3>
              <p className="text-gray-600 text-sm">futurlifthit@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Main Contact Form Section */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl animate-fadeIn delay-200">
            <div className="p-5 md:p-7">
              <div className="text-center mb-5">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Get in touch with us</h2>
                <p className="text-gray-500 text-sm">We're here to assist you.</p>
              </div>

              {/* Status message after form submission */}
              {submitStatus && (
                <div className={`mb-5 p-3 rounded-lg ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {submitStatus.success ? (
                        <i className="fas fa-check-circle text-green-400 text-lg"></i>
                      ) : (
                        <i className="fas fa-exclamation-circle text-red-400 text-lg"></i>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-sm">{submitStatus.message}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name */}
                <div className="group">
                  <div className="relative flex items-center">
                    <div className="min-w-[30px] text-center text-amber-400">
                      <i className="far fa-user text-lg"></i>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className={`w-full p-2 border-b-2 ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-amber-500 outline-none transition-all duration-300 bg-transparent`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 ml-8">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="group">
                  <div className="relative flex items-center">
                    <div className="min-w-[30px] text-center text-amber-400">
                      <i className="far fa-envelope text-lg"></i>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className={`w-full p-2 border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-amber-500 outline-none transition-all duration-300 bg-transparent`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 ml-8">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="group">
                  <div className="relative flex items-center">
                    <div className="min-w-[30px] text-center text-amber-400">
                      <i className="far fa-address-book text-lg"></i>
                    </div>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className={`w-full p-2 border-b-2 ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-amber-500 outline-none transition-all duration-300 bg-transparent`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 ml-8">{errors.phone}</p>
                  )}
                </div>

                {/* Message */}
                <div className="group">
                  <div className="relative flex items-start">
                    <div className="min-w-[30px] text-center text-amber-400 pt-2">
                      <i className="far fa-comment-dots text-lg"></i>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="2"
                      placeholder="Message"
                      className={`w-full p-2 border-b-2 ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:border-amber-500 outline-none transition-all duration-300 bg-transparent`}
                    ></textarea>
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 ml-8">{errors.message}</p>
                  )}
                </div>

                <div className="mt-5 flex flex-col items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-1/3 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-5 py-2 rounded-full hover:from-amber-500 hover:to-amber-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center text-sm"
                  >
                    {isSubmitting && (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
                      </svg>
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  {/* Social Media Links - now inside the form */}
                  <div className="flex justify-center mt-4 space-x-3">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#f2f2f2] hover:bg-blue-100 flex items-center justify-center text-blue-600 transition-transform hover:scale-110">
                      <i className="fab fa-facebook-f text-sm"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#f2f2f2] hover:bg-blue-100 flex items-center justify-center text-blue-400 transition-transform hover:scale-110">
                      <i className="fab fa-twitter text-sm"></i>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#f2f2f2] hover:bg-blue-100 flex items-center justify-center text-blue-700 transition-transform hover:scale-110">
                      <i className="fab fa-linkedin-in text-sm"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#f2f2f2] hover:bg-pink-100 flex items-center justify-center text-pink-600 transition-transform hover:scale-110">
                      <i className="fab fa-instagram text-sm"></i>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;