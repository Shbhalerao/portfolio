// frontend/src/components/Footer.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { ISocialLink, IArticle } from '../types'; // Import IArticle type
import { IconContext } from 'react-icons';
import { FaLinkedinIn, FaGithub, FaTwitter, FaMediumM } from 'react-icons/fa';

const Footer: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<ISocialLink[]>([]);
  const [articles, setArticles] = useState<IArticle[]>([]); // New state for articles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const socialLinksResponse = await api.get<ISocialLink[]>('/social-links');
        setSocialLinks(socialLinksResponse.data);

        // Fetch articles
        const articlesResponse = await api.get<IArticle[]>('/articles');
        // Sort articles by ID (assuming newer IDs might indicate more recent entries, or add a createdAt field if available)
        // For a more robust sort, a 'createdAt' field would be ideal.
        const sortedArticles = articlesResponse.data.sort((a, b) => b._id.localeCompare(a._id));
        setArticles(sortedArticles.slice(0, 3)); // Get the latest 3 articles

      } catch (err) {
        console.error('Error fetching data for footer:', err);
        setError('Failed to load some footer content.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getIconComponent = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <FaLinkedinIn />;
      case 'github':
        return <FaGithub />;
      case 'twitter':
        return <FaTwitter />;
      case 'medium':
        return <FaMediumM />;
      default:
        return null;
    }
  };

  if (loading) return <div className="text-center py-4"></div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <footer className="bg-white shadow-md p-8 rounded-t-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-8 pb-8 border-b border-gray-200">
          {/* Column 1: Shubham Bhalerao Info */}
          <div className="w-full md:w-2/5 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Shubham Bhalerao</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Fullstack Software Engineer passionate about building scalable applications and sharing knowledge through writing.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <IconContext.Provider value={{ className: 'text-2xl text-gray-600 hover:text-black transition duration-300 transform hover:scale-110' }}>
                {socialLinks.map((link) => (
                  <a key={link._id} href={link.url} target="_blank" rel="noopener noreferrer" title={link.platform}>
                    {getIconComponent(link.platform)}
                  </a>
                ))}
              </IconContext.Provider>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="w-full md:w-1/5 text-center md:text-left">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-700">
              <li><Link to="/" className="hover:text-pastel-light-blue transition duration-200">Home</Link></li>
              <li><Link to="/projects" className="hover:text-pastel-light-blue transition duration-200">Projects</Link></li>
              <li><Link to="/blog" className="hover:text-pastel-light-blue transition duration-200">Blog</Link></li>
              <li><Link to="/experience" className="hover:text-pastel-light-blue transition duration-200">Experience</Link></li>
            </ul>
          </div>

          {/* Column 3: Articles/Blogs */}
          <div className="w-full md:w-2/5 text-center md:text-left">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Articles</h4>
            <ul className="space-y-2 text-gray-700">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <li key={article._id}>
                    <a href={article.mediumUrl} target="_blank" rel="noopener noreferrer" className="hover:text-pastel-light-blue transition duration-200 line-clamp-1" title={article.title}>
                      {article.title}
                    </a>
                  </li>
                ))
              ) : (
                <li>No articles available.</li>
              )}
              {articles.length > 0 && (
                  <li>
                      <Link to="/blog" className="text-blue-600 hover:underline transition duration-200">View All Articles</Link>
                  </li>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Shubham Bhalerao. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;