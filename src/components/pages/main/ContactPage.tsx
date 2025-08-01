
import React, { useState } from 'react';
import { MailIcon, BriefcaseIcon } from '../../Icons';

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
      ? 'partnerships@aichentu.org' 
      : 'contact@aichentu.org';

    const subject = `Website Inquiry - ${inquiryType === 'partnership' ? 'Partnership' : 'General'}: from ${name}`;
    
    const body = `Hi AIChE NTU Team,\n\n${message}\n\n---\nSent from the website contact form.\nName: ${name}\nEmail: ${email}`;

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">Get In Touch</h1>
        <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
          Have a question, suggestion, or want to collaborate? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-surface p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">Full Name</label>
              <input type="text" name="name" id="name" required value={formState.name} onChange={handleInputChange} className="w-full bg-surface-alt border border-slate-300 dark:border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">Email Address</label>
              <input type="email" name="email" id="email" required value={formState.email} onChange={handleInputChange} className="w-full bg-surface-alt border border-slate-300 dark:border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
            <div>
              <label htmlFor="inquiryType" className="block text-sm font-medium text-text-muted mb-2">Inquiry Type</label>
              <select
                name="inquiryType"
                id="inquiryType"
                required
                value={formState.inquiryType}
                onChange={handleInputChange}
                className="w-full bg-surface-alt border border-slate-300 dark:border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="general">General Inquiry</option>
                <option value="partnership">Partnership &amp; Sponsorship</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">Message</label>
              <textarea name="message" id="message" rows={5} required value={formState.message} onChange={handleInputChange} className="w-full bg-surface-alt border border-slate-300 dark:border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none"></textarea>
            </div>
            <button 
                type="submit" 
                className="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-focus transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8 my-auto">
            <h2 className="text-3xl font-bold">Contact Information</h2>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <MailIcon className="w-8 h-8 text-primary mt-1"/>
                    <div>
                        <h3 className="text-xl font-semibold">General Inquiries</h3>
                        <p className="text-text-muted">For any general questions</p>
                        <a href="mailto:contact@aichentu.org" className="text-primary hover:underline">contact@aichentu.org</a>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <BriefcaseIcon className="w-8 h-8 text-primary mt-1"/>
                    <div>
                        <h3 className="text-xl font-semibold">Collaboration &amp; Brand Cooperation</h3>
                        <p className="text-text-muted">For partnerships and sponsorships</p>
                        <a href="mailto:partnerships@aichentu.org" className="text-primary hover:underline">partnerships@aichentu.org</a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

