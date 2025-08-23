
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, BriefcaseIcon, LocationMarkerIcon } from '../../ui/Icons';

const generalemail = 'aiche.ntu23@gmail.com';
const partnershipemail = 'aiche.ntu23@gmail.com';
const schoolAddressLines = [
  'Nanyang Technological University',
  'School of Chemistry, Chemical Engineering and Biotechnology (CCEB)',
  '50 Nanyang Avenue, Singapore 639798'
];
const schoolmapUrl = `https://maps.google.com/?q=${encodeURIComponent(schoolAddressLines.join(','))}`;

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '', inquiryType: 'general' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message, inquiryType } = formState;

    const recipient = inquiryType === 'partnership' 
      ? partnershipemail 
      : generalemail;

    const subject = `Website Inquiry - ${inquiryType === 'partnership' ? 'Partnership' : 'General'}: from ${name}`;
    
    const body = `Hi AIChE NTU Team,\n\n${message}\n\n---\nSent from the website contact form.\nName: ${name}\nEmail: ${email}`;

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Medium size */}
      <section className="py-12">
        <div className="max-w-full mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-text-main mb-4">Get In Touch</h1>
          <p className="text-xl text-text-muted max-w-4xl mx-auto leading-relaxed">
            Connect with the AIChE NTU Student Chapter. We're here to collaborate and innovate.
          </p>
        </div>
      </section>

      {/* Contact Content - Full Width Layout */}
      <section className="px-8 pb-12">
        <div className="max-w-full mx-auto h-full">
          <div className="grid lg:grid-cols-4 gap-10 h-full">
            {/* Contact Form - Takes more space */}
            <div className="lg:col-span-3 bg-surface rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-text-main mb-3">Send us a Message</h2>
                <p className="text-lg text-text-muted">Fill out the form below and we'll get back to you.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-base font-semibold text-text-main mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      required 
                      value={formState.name} 
                      onChange={handleInputChange} 
                      className="w-full bg-surface-alt border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-base focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all duration-300 text-text-main" 
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-base font-semibold text-text-main mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      required 
                      value={formState.email} 
                      onChange={handleInputChange} 
                      className="w-full bg-surface-alt border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-base focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all duration-300 text-text-main" 
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="inquiryType" className="block text-base font-semibold text-text-main mb-2">Inquiry Type *</label>
                    <select
                      name="inquiryType"
                      id="inquiryType"
                      required
                      value={formState.inquiryType}
                      onChange={handleInputChange}
                      className="w-full bg-surface-alt border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-base focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all duration-300 text-text-main"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="partnership">Partnership & Sponsorship</option>
                      <option value="membership">Membership Information</option>
                      <option value="events">Events & Workshops</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-base font-semibold text-text-main mb-2">Message *</label>
                  <textarea 
                    name="message" 
                    id="message" 
                    rows={6} 
                    required 
                    value={formState.message} 
                    onChange={handleInputChange} 
                    className="w-full bg-surface-alt border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-base focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all duration-300 text-text-main resize-none" 
                    placeholder="Tell us about your inquiry..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-primary text-white font-bold py-4 px-8 rounded-lg hover:bg-primary-focus transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information - Medium Sidebar */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-text-main mb-4">Contact Information</h2>
                <p className="text-base text-text-muted leading-relaxed">
                  Reach out to us through any of the channels below.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-surface rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                    <MailIcon className="w-5 h-5 text-primary"/>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-text-main mb-1">General Inquiries</h3>
                    <p className="text-sm text-text-muted mb-2">For any general questions</p>
                    <a href={`mailto:${generalemail}`} className="text-primary hover:text-primary-focus font-semibold transition-colors text-sm break-all">
                      {generalemail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-surface rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                    <BriefcaseIcon className="w-5 h-5 text-primary"/>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-text-main mb-1">Partnerships</h3>
                    <p className="text-sm text-text-muted mb-2">For collaboration opportunities</p>
                    <a href={`mailto:${partnershipemail}`} className="text-primary hover:text-primary-focus font-semibold transition-colors text-sm break-all">
                      {partnershipemail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-surface rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                    <LocationMarkerIcon className="w-5 h-5 text-primary"/>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-text-main mb-1">Location</h3>
                    <p className="text-sm text-text-muted mb-2">Find us on campus</p>
                    <a
                      href={schoolmapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-main font-medium hover:text-primary transition-colors underline break-words"
                    >
                      {schoolAddressLines.map((line, idx) => (
                        <React.Fragment key={idx}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links - Medium */}
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <h3 className="text-base font-bold text-text-main mb-3">Quick Links</h3>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <Link to ="/join" className="text-primary hover:text-primary-focus font-medium transition-colors">Join Our Chapter</Link>
                  <Link to ="/activities" className="text-primary hover:text-primary-focus font-medium transition-colors">View Activities</Link>
                  <Link to ="/workshops" className="text-primary hover:text-primary-focus font-medium transition-colors">Workshops</Link>
                  <Link to ="/about" className="text-primary hover:text-primary-focus font-medium transition-colors">About Us</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

