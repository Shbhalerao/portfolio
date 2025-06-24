// frontend/src/pages/public/ContactPage.tsx
import React, { useState, FormEvent, useEffect } from 'react';
import api from '../../services/api';
import { IHomepageContent, ISocialLink } from '../../types';
import { IconContext } from 'react-icons';
import { FaEnvelope, FaShareAlt, FaRegClock, FaPaperPlane, FaLink } from 'react-icons/fa';
// Specific social media icons for brand colors
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaMediumM } from 'react-icons/fa';
import Loader from '../../components/Loader';


const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('shubham.bhalerao@outlook.com'); // Placeholder email matching screenshot
  const [socialLinks, setSocialLinks] = useState<ISocialLink[]>([]);
  const [loadingInitialData, setLoadingInitialData] = useState(true);

  useEffect(() => {
    const fetchContactDetailsAndSocialLinks = async () => {
      try {
        // In a real application, you might fetch contact email from an API.
        // For now, it's a hardcoded placeholder matching screenshot.
        // const homepageContentResponse = await api.get<IHomepageContent>('/homepage-content');
        // if (homepageContentResponse.data.contactEmail) {
        //     setContactEmail(homepageContentResponse.data.contactEmail);
        // }
        
        const socialLinksResponse = await api.get<ISocialLink[]>('/social-links');
        setSocialLinks(socialLinksResponse.data);
      } catch (err) {
        console.error('Error fetching initial data for contact page:', err);
        // Do not set global error, allow form to display
      } finally {
        setLoadingInitialData(false);
      }
    };
    fetchContactDetailsAndSocialLinks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setResponseMessage('');

    try {
      const response = await api.post('/contact', formData);
      setSubmitStatus('success');
      setResponseMessage(response.data.message || 'Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } catch (err: any) {
      setSubmitStatus('error');
      setResponseMessage(err.response?.data?.message || 'Failed to send message. Please try again.');
    }
  };

  // Helper to get specific brand icons and their colors
  const getSocialBrandIconComponent = (platform: string) => {
      switch (platform.toLowerCase()) {
          case 'linkedin': return { icon: <FaLinkedinIn />, color: 'text-blue-700' };
          case 'github': return { icon: <FaGithub />, color: 'text-gray-900' };
          case 'twitter': return { icon: <FaTwitter />, color: 'text-blue-400' };
          case 'instagram': return { icon: <FaInstagram />, color: 'text-pink-600' };
          case 'medium': return { icon: <FaMediumM />, color: 'text-gray-800' };
          default: return { icon: <FaLink />, color: 'text-gray-600' }; // Generic fallback
      }
  };

  if (loadingInitialData) return <Loader />;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 text-text-dark">
      {/* Page Header - Background adjusted */}
      <section className="relative w-full text-center py-12 px-4"> {/* Removed bg-white shadow-sm */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Let's discuss your next project or simply connect. I'm always open to new opportunities and interesting conversations.
        </p>
      </section>

      <div className="w-full max-w-6xl my-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Send a Message Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100"> {/* Changed background to bg-white */}
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-300 bg-gray-50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-300 bg-gray-50"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Subject (Optional):</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-300 bg-gray-50"
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="shadow-sm appearance-none border border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-300 resize-y bg-gray-50"
                placeholder="Tell me about your project or idea..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={submitStatus === 'loading'}
              className={`w-full bg-gray-800 text-white py-3 px-8 rounded-lg text-xl font-semibold hover:bg-gray-900 transition duration-300 transform hover:scale-105 shadow-md flex items-center justify-center
                ${submitStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {submitStatus === 'loading' ? (
                <>
                  <FaPaperPlane className="mr-3 animate-pulse" /> Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
            {submitStatus !== 'idle' && responseMessage && (
              <p
                className={`mt-4 text-center ${
                  submitStatus === 'success' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {responseMessage}
              </p>
            )}
          </form>
        </div>

        {/* Direct Contact Info & Social Media Cards */}
        <div className="space-y-8">
          {/* Email Card */}
          <div className="bg-pastel-blue p-6 rounded-lg shadow-lg border border-gray-100"> {/* Re-applied gradient background from screenshot */}
            <h3 className="text-2xl font-semibold text-gray-900 flex items-center mb-3">
              <FaEnvelope className="mr-3 text-blue-600" /> Email {/* Icon color to blue-600 */}
            </h3>
            <p className="text-gray-700 text-lg mb-2">Prefer email? Drop me a line directly.</p>
            <a href={`mailto:${contactEmail}`} className="text-blue-600 text-lg font-semibold hover:underline flex items-center"> {/* Link color to blue-600 */}
              {contactEmail}
            </a>
          </div>

          {/* Connect/Social Media Card */}
          <div className="bg-pastel-purple p-6 rounded-lg shadow-lg border border-gray-100"> {/* Re-applied gradient background from screenshot */}
            <h3 className="text-2xl font-semibold text-gray-900 flex items-center mb-3">
              <FaShareAlt className="mr-3 text-purple-600" /> Connect {/* Icon color to purple-600 */}
            </h3>
            <p className="text-gray-700 text-lg mb-4">Follow my work and connect on social platforms.</p>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((link) => {
                const { icon, color } = getSocialBrandIconComponent(link.platform); // Get specific icon and color
                return (
                  <a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-3 bg-white text-gray-800 py-3 px-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-sm border border-gray-200"
                    title={link.platform}
                  >
                    <IconContext.Provider value={{ className: `text-xl ${color}` }}> {/* Apply specific brand color to icon */}
                      {icon}
                    </IconContext.Provider>
                    <span>{link.platform}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Response Time Card */}
          <div className="bg-pastel-green p-6 rounded-lg shadow-lg border border-gray-100"> {/* Re-applied gradient background from screenshot */}
            <h3 className="text-2xl font-semibold text-gray-900 flex items-center mb-3">
              <FaRegClock className="mr-3 text-green-600" /> Response Time {/* Icon color to green-600 */}
            </h3>
            <p className="text-gray-700 text-lg">
              I typically respond within <span className="font-bold">24-48 hours</span> during business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;