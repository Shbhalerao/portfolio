// frontend/src/pages/admin/ManageSocialLinks.tsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { ISocialLink } from '../../types';
// Corrected import from 'react-icons/fa'
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaSyncAlt } from 'react-icons/fa'; 

const ManageSocialLinks: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<ISocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<ISocialLink | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<ISocialLink[]>('/admin/social-links'); // Use admin endpoint
      setSocialLinks(response.data);
    } catch (err: any) {
      console.error('Error fetching social links:', err);
      setError(err.response?.data?.message || 'Failed to fetch social links.');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setCurrentLink({
      _id: '', // Temporary ID for new entries
      platform: '',
      url: '',
      iconClass: '',
    });
    setIsModalOpen(true);
    setSaveMessage(null);
  };

  const openEditModal = (link: ISocialLink) => {
    setCurrentLink({ ...link }); // Create a copy to edit
    setIsModalOpen(true);
    setSaveMessage(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentLink(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentLink((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentLink) return;

    setIsSaving(true);
    setSaveMessage(null);

    try {
      if (currentLink._id) {
        // Update existing link
        await api.put(`/admin/social-links/${currentLink._id}`, currentLink);
        setSaveMessage('Social link updated successfully!');
      } else {
        // Add new link
        await api.post('/admin/social-links', currentLink);
        setSaveMessage('Social link added successfully!');
      }
      fetchSocialLinks(); // Refresh list
      closeModal();
    } catch (err: any) {
      console.error('Error saving social link:', err);
      setSaveMessage(`Failed to save social link: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this social link?')) {
      try {
        await api.delete(`/admin/social-links/${id}`);
        setSaveMessage('Social link deleted successfully!');
        fetchSocialLinks();
      } catch (err: any) {
        console.error('Error deleting social link:', err);
        setSaveMessage(`Failed to delete social link: ${err.response?.data?.message || err.message}`);
      } finally {
        setTimeout(() => setSaveMessage(null), 3000);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-text-dark text-center sm:text-left">Manage Social Links</h2>
        <button
          onClick={openAddModal}
          className="bg-pastel-green text-text-dark py-2 px-4 rounded-lg flex items-center shadow-md hover:bg-green-400 transition duration-300"
        >
          <FaPlus className="mr-2" /> Add Social Link
        </button>
      </div>

      {saveMessage && (
        <p className={`mb-4 text-center ${saveMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {saveMessage}
        </p>
      )}

      {loading ? (
        <div className="text-center py-4">Loading social links...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : socialLinks.length === 0 ? (
        <div className="text-center py-4 text-gray-600">No social links added yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100">
          <table className="min-w-full bg-white">
            <thead className="bg-pastel-light-blue text-text-dark">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-lg">Platform</th>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">URL</th>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Icon Class</th>
                <th className="py-3 px-6 text-center text-sm font-semibold uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {socialLinks.map((link) => (
                <tr key={link._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="py-4 px-6 text-gray-800">{link.platform}</td>
                  <td className="py-4 px-6 text-gray-800">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-pastel-purple hover:underline">
                      {link.url}
                    </a>
                  </td>
                  <td className="py-4 px-6 text-gray-800">{link.iconClass}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => openEditModal(link)}
                        className="text-pastel-purple hover:text-purple-700 transition duration-150 p-2 rounded-full hover:bg-gray-100"
                        title="Edit"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(link._id)}
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

      {/* Social Link Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl p-6 relative my-8">
            <h3 className="text-2xl font-bold text-text-dark mb-6">
              {currentLink?._id ? 'Edit Social Link' : 'Add New Social Link'}
            </h3>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300 p-2 rounded-full hover:bg-gray-100"
            >
              <FaTimes size={24} />
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="platform" className="block text-gray-700 text-sm font-bold mb-2">Platform Name (e.g., LinkedIn, GitHub):</label>
                <input
                  type="text"
                  id="platform"
                  name="platform"
                  value={currentLink?.platform || ''}
                  onChange={handleInputChange}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue"
                  required
                />
              </div>
              <div>
                <label htmlFor="url" className="block text-gray-700 text-sm font-bold mb-2">URL:</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={currentLink?.url || ''}
                  onChange={handleInputChange}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue"
                  required
                />
              </div>
              <div>
                <label htmlFor="iconClass" className="block text-gray-700 text-sm font-bold mb-2">Icon Class (e.g., 'fab fa-linkedin', 'fab fa-github' from Font Awesome):</label>
                <input
                  type="text"
                  id="iconClass"
                  name="iconClass"
                  value={currentLink?.iconClass || ''}
                  onChange={handleInputChange}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue"
                  required
                />
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
                      <FaSave className="mr-2" /> Save Link
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

export default ManageSocialLinks;