// frontend/src/pages/admin/ManageArticles.tsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { IArticle } from '../../types';
// Corrected import from 'react-icons/fa'
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaSyncAlt } from 'react-icons/fa'; 

const ManageArticles: React.FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<IArticle | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<IArticle[]>('/admin/articles'); // Use admin endpoint
      // Sort by creation date, most recent first
      const sorted = response.data.sort((a, b) => new Date().getTime() - new Date().getTime());
      setArticles(sorted);
    } catch (err: any) {
      console.error('Error fetching articles:', err);
      setError(err.response?.data?.message || 'Failed to fetch articles.');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setCurrentArticle({
      _id: '', // Temporary ID for new entries
      title: '',
      mediumUrl: '',
      imageUrl: '',
      excerpt: '',
    });
    setIsModalOpen(true);
    setSaveMessage(null);
  };

  const openEditModal = (article: IArticle) => {
    setCurrentArticle({ ...article }); // Create a copy to edit
    setIsModalOpen(true);
    setSaveMessage(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentArticle(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentArticle((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentArticle) return;

    setIsSaving(true);
    setSaveMessage(null);

    try {
      if (currentArticle._id) {
        // Update existing article
        await api.put(`/admin/articles/${currentArticle._id}`, currentArticle);
        setSaveMessage('Article updated successfully!');
      } else {
        // Add new article
        await api.post('/admin/articles', currentArticle);
        setSaveMessage('Article added successfully!');
      }
      fetchArticles(); // Refresh list
      closeModal();
    } catch (err: any) {
      console.error('Error saving article:', err);
      setSaveMessage(`Failed to save article: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await api.delete(`/admin/articles/${id}`);
        setSaveMessage('Article deleted successfully!');
        fetchArticles();
      } catch (err: any) {
        console.error('Error deleting article:', err);
        setSaveMessage(`Failed to delete article: ${err.response?.data?.message || err.message}`);
      } finally {
        setTimeout(() => setSaveMessage(null), 3000);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-text-dark text-center sm:text-left">Manage Articles</h2>
        <button
          onClick={openAddModal}
          className="bg-pastel-green text-text-dark py-2 px-4 rounded-lg flex items-center shadow-md hover:bg-green-400 transition duration-300"
        >
          <FaPlus className="mr-2" /> Add Article
        </button>
      </div>

      {saveMessage && (
        <p className={`mb-4 text-center ${saveMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {saveMessage}
        </p>
      )}

      {loading ? (
        <div className="text-center py-4">Loading articles...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-4 text-gray-600">No articles added yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100">
          <table className="min-w-full bg-white">
            <thead className="bg-pastel-light-blue text-text-dark">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-lg">Title</th>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Medium URL</th>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Image</th>
                <th className="py-3 px-6 text-center text-sm font-semibold uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.map((article) => (
                <tr key={article._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="py-4 px-6 text-gray-800">{article.title}</td>
                  <td className="py-4 px-6 text-gray-800">
                    <a href={article.mediumUrl} target="_blank" rel="noopener noreferrer" className="text-pastel-purple hover:underline">
                      Link
                    </a>
                  </td>
                  <td className="py-4 px-6">
                    <img src={article.imageUrl} alt={article.title} className="w-16 h-16 object-cover rounded shadow" onError={(e) => { e.currentTarget.src = 'https://placehold.co/60x60?text=No+Img'; }} />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => openEditModal(article)}
                        className="text-pastel-purple hover:text-purple-700 transition duration-150 p-2 rounded-full hover:bg-gray-100"
                        title="Edit"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="text-red-500 hover:text-red-700 transition duration-150 p-2 rounded-full hover:bg-gray-100"
                        title="Delete"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Article Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative my-8">
            <h3 className="text-2xl font-bold text-text-dark mb-6">
              {currentArticle?._id ? 'Edit Article' : 'Add New Article'}
            </h3>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300 p-2 rounded-full hover:bg-gray-100"
            >
              <FaTimes size={24} />
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={currentArticle?.title || ''}
                  onChange={handleInputChange}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue"
                  required
                />
              </div>
              <div>
                <label htmlFor="mediumUrl" className="block text-gray-700 text-sm font-bold mb-2">Medium URL:</label>
                <input
                  type="url"
                  id="mediumUrl"
                  name="mediumUrl"
                  value={currentArticle?.mediumUrl || ''}
                  onChange={handleInputChange}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue"
                  required
                />
              </div>
              <div>
                <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={currentArticle?.imageUrl || ''}
                  onChange={handleInputChange}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue"
                  required
                />
                {currentArticle?.imageUrl && (
                  <img src={currentArticle.imageUrl} alt="Article Preview" className="mt-2 w-24 h-24 object-cover rounded shadow" />
                )}
              </div>
              <div>
                <label htmlFor="excerpt" className="block text-gray-700 text-sm font-bold mb-2">Excerpt:</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={currentArticle?.excerpt || ''}
                  onChange={handleInputChange}
                  rows={4}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue resize-y"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`bg-pastel-purple text-text-light py-2 px-4 rounded-lg shadow-md hover:bg-purple-600 transition duration-300 flex items-center justify-center ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <FaSyncAlt className="animate-spin mr-2" /> Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Save Article
                    </>
                  )}
                </button>
              </div>
              {saveMessage && (
                <p className={`mt-2 text-center text-sm ${saveMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                  {saveMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageArticles;