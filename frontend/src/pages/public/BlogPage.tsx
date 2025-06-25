// frontend/src/pages/public/BlogPage.tsx
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { IArticle } from '../../types';
import { FaPlus, FaMedium, FaRegClock, FaPaperPlane, FaExternalLinkAlt } from 'react-icons/fa'; // Corrected import from 'react-icons/fa'
import { IconContext } from 'react-icons'; // Import IconContext for custom icon styling
import Loader from '../../components/Loader';
// Import new icons for floating objects
import { FaPencilAlt, FaBookOpen, FaNewspaper, FaFeatherAlt } from 'react-icons/fa';

const BlogPage: React.FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscribeEmail, setSubscribeEmail] = useState<string>('');
  const [subscribeMessage, setSubscribeMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get<IArticle[]>('/articles');
        setArticles(response.data);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeMessage('Subscribing...');
    // In a real application, you would send this email to your backend.
    // For now, it's a simple placeholder.
    setTimeout(() => {
      if (subscribeEmail && subscribeEmail.includes('@')) {
        setSubscribeMessage('Thanks for subscribing! Check your email!');
        setSubscribeEmail('');
      } else {
        setSubscribeMessage('Please enter a valid email address.');
      }
      setTimeout(() => setSubscribeMessage(null), 3000); // Clear message
    }, 1500);
  };

  // Function to estimate reading time (simple words per minute approach)
  const estimateReadingTime = (text: string): string => {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) return <Loader />;;
  if (error) return <div className="text-center py-8 text-red-500 text-xl">{error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-text-dark">
      {/* Page Header - Background changed to vibrant pulsating gradient */}
      <section className="relative w-full text-center py-12 px-4 
        bg-gradient-to-br from-pastel-light-blue 
        via-pastel-yellow to-vibrant-purple shadow-sm hero-gradient-pulsate">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 z-10 relative">Blog</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto z-10 relative">
          Thoughts on software engineering, technology trends, and lessons learned from building scalable applications.
        </p>

        {/* Floating Objects - Writing/Blogging Icons (4 icons) */}
        <IconContext.Provider value={{ className: 'pointer-events-none' }}>
          {/* Object 1 (Pencil) */}
          <div className="absolute top-[15%] left-[10%] text-purple-300 text-4xl opacity-60 animate-float-1" style={{animationDelay: '0s'}}>
            <FaPencilAlt />
          </div>
          {/* Object 2 (Open Book) */}
          <div className="absolute bottom-[20%] right-[15%] text-green-300 text-5xl opacity-70 animate-float-2" style={{animationDelay: '1s'}}>
            <FaBookOpen />
          </div>
          {/* Object 3 (Newspaper) */}
          <div className="absolute top-[5%] right-[5%] text-blue-300 text-3xl opacity-50 animate-float-3" style={{animationDelay: '2s'}}>
            <FaNewspaper />
          </div>
          {/* Object 4 (Feather Pen) */}
          <div className="absolute bottom-[12%] left-[28%] text-sunshine-yellow text-4xl opacity-75 animate-float-4" style={{animationDelay: '3s'}}>
            <FaFeatherAlt />
          </div>
        </IconContext.Provider>

      </section>

      {/* Blog Post Grid */}
      {articles.length === 0 ? (
        <div className="text-center py-8 text-xl text-gray-600">No articles to display yet.</div>
      ) : (
        <section className="w-full max-w-6xl my-16 px-4">
          <div className="grid grid-cols-1 gap-8"> {/* Ensures one article per row on all screen sizes */}
            {articles.map((article) => (
              <a
                key={article._id}
                href={article.mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl group relative h-52" // Fixed height for the entire card
              >
                {/* External Link Icon in top right corner */}
                <IconContext.Provider value={{ className: 'text-gray-500 group-hover:text-gray-900 transition-colors duration-300' }}>
                  <FaExternalLinkAlt className="absolute top-3 right-3 z-10" size={14} />
                </IconContext.Provider>


                <div className="flex flex-col md:flex-row h-full"> {/* Inner flex container fills the fixed height */}
                  {/* Image Section */}
                  <div className="w-full h-32 md:w-1/3 md:h-full flex-shrink-0"> {/* Image height fixed for small screens, fills parent height on md+ */}
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover object-center" // Image fills its container
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/600x300/F2D1E8/333333?text=Article+Image`;
                        e.currentTarget.alt = "Placeholder image";
                      }}
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div className="flex-grow"> {/* This div grows to take available vertical space */}
                      <h3 className="text-lg font-bold text-gray-700 mb-1 group-hover:text-black transition duration-300 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center text-xs text-gray-600 space-x-3 mt-auto">
                      <span className="inline-flex items-center">
                        <FaMedium className="mr-1 text-xs" /> Medium
                      </span>
                      <span className="inline-flex items-center">
                        <FaRegClock className="mr-1 text-xs" /> {estimateReadingTime(article.excerpt)}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Stay Updated Section */}
      <section className="w-full py-16 px-4 bg-soft-gray text-text-dark text-center rounded-lg shadow-inner">
        <h3 className="text-4xl font-bold mb-4">Stay Updated</h3>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Get notified when I publish new articles about software engineering and technology.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={subscribeEmail}
            onChange={(e) => setSubscribeEmail(e.target.value)}
            className="w-full sm:flex-1 py-3 px-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-soft-gray text-md bg-white"
            required
          />
          <button
            type="submit"
            disabled={subscribeMessage === 'Subscribing...'}
            className={`bg-gray-800 text-white py-3 px-8 rounded-lg text-md font-semibold hover:bg-black transition duration-300 transform hover:scale-105 shadow-md flex items-center justify-center
              ${subscribeMessage && subscribeMessage.includes('Subscribing') ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {subscribeMessage && subscribeMessage.includes('Subscribing') ? (
              <>
                <FaPaperPlane className="mr-2 animate-pulse" /> Subscribing...
              </>
            ) : (
              <>
                <FaPaperPlane className="mr-2" /> Subscribe
              </>
            )}
          </button>
        </form>
        {subscribeMessage && (
          <p className={`mt-4 text-sm ${subscribeMessage.includes('successfully') ? 'text-green-600' : subscribeMessage.includes('valid') ? 'text-orange-600' : 'text-red-600'}`}>
            {subscribeMessage}
          </p>
        )}
      </section>
    </div>
  );
};

export default BlogPage;