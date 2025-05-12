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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-96 -right-24 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Contact us
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Our team typically responds within 24 hours.
          </p>
          
          <div className="max-w-3xl mx-auto mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            {/* Address */}
            <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4 text-white">
                <i className="fas fa-map-marker-alt text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-600 text-center">
                HIT COLLEGE,Haldia<br />
                Pin 721657
              </p>
            </div>

            {/* Call us */}
            <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4 text-white">
                <i className="fas fa-phone text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Call us</h3>
              <p className="text-gray-600">+91 87099 08484</p>
            </div>

            {/* Email us */}
            <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-4 text-white">
                <i className="fas fa-envelope text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Email us</h3>
              <p className="text-gray-600">futurelifthit@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in touch with us.</h2>
              <p className="text-gray-600">We're here to assist you.</p>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Status message after form submission */}
            {submitStatus && (
              <div className={`mb-8 p-4 rounded-lg ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {submitStatus.success ? (
                      <i className="fas fa-check-circle text-green-400 text-xl"></i>
                    ) : (
                      <i className="fas fa-exclamation-circle text-red-400 text-xl"></i>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{submitStatus.message}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full name */}
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-user text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 p-4 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 ${errors.name ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500'} transition-all`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-envelope text-gray-400"></i>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 p-4 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 ${errors.email ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500'} transition-all`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="group">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-phone text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 p-4 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 ${errors.phone ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500'} transition-all`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                  )}
                </div>

                {/* User type */}
                <div className="group">
                  <label htmlFor="user_type" className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
                  <select
                    id="user_type"
                    name="user_type"
                    value={formData.user_type}
                    onChange={handleChange}
                    className={`w-full p-4 border ${errors.user_type ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 ${errors.user_type ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500'} transition-all`}
                  >
                    <option value="Job Seeker">Job Seeker</option>
                    <option value="Employer">Employer</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.user_type && (
                    <p className="text-red-500 text-sm mt-2">{errors.user_type}</p>
                  )}
                </div>

                {/* Message - moved next to user type */}
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-4 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 ${errors.message ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500'} transition-all`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-2">{errors.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;