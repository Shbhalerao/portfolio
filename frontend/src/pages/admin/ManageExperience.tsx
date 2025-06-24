// frontend/src/pages/admin/ManageExperience.tsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { IExperience } from '../../types';
// Corrected import from 'react-icons/fa'
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaSyncAlt } from 'react-icons/fa'; 
import { format, parseISO } from 'date-fns';

const ManageExperience: React.FC = () => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<IExperience | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<IExperience[]>('/admin/experience'); // Use admin endpoint
      // Sort by startDate, most recent first for CRM display
      const sorted = response.data.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
      setExperiences(sorted);
    } catch (err: any) {
      console.error('Error fetching experiences:', err);
      setError(err.response?.data?.message || 'Failed to fetch experiences.');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setCurrentExperience({
      _id: '', // Temporary ID for new entries
      title: '',
      company: '',
      startDate: format(new Date(), 'yyyy-MM-dd'), // Default to today's date
      endDate: '', // Empty string for optional end date
      responsibilities: [''], // Start with one empty responsibility
      technologies: [''], // Start with one empty technology
    });
    setIsModalOpen(true);
    setSaveMessage(null);
  };

  const openEditModal = (experience: IExperience) => {
    // Format dates for input type="date"
    const formattedStartDate = experience.startDate ? format(parseISO(experience.startDate), 'yyyy-MM-dd') : '';
    const formattedEndDate = experience.endDate ? format(parseISO(experience.endDate), 'yyyy-MM-dd') : '';

    setCurrentExperience({
      ...experience,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
    setIsModalOpen(true);
    setSaveMessage(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentExperience(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentExperience((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleListChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: 'responsibilities' | 'technologies') => {
    // Split by newline, trim whitespace, and filter out empty strings
    const items = e.target.value.split('\n').map((item) => item.trim()).filter(item => item !== '');
    setCurrentExperience((prev) => ({
      ...prev!,
      [field]: items,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentExperience) return;

    setIsSaving(true);
    setSaveMessage(null);

    // Prepare data for submission: ensure responsibilities and technologies are arrays
    const experienceToSend = {
      ...currentExperience,
      responsibilities: Array.isArray(currentExperience.responsibilities) ? currentExperience.responsibilities : (currentExperience.responsibilities as string).split('\n').map(r => r.trim()).filter(Boolean),
      technologies: Array.isArray(currentExperience.technologies) ? currentExperience.technologies : (currentExperience.technologies as string).split('\n').map(t => t.trim()).filter(Boolean),
    };


    try {
      if (experienceToSend._id) {
        // Update existing
        await api.put(`/admin/experience/${experienceToSend._id}`, experienceToSend);
        setSaveMessage('Experience updated successfully!');
      } else {
        // Add new
        await api.post('/admin/experience', experienceToSend);
        setSaveMessage('Experience added successfully!');
      }
      fetchExperiences(); // Refresh list
      closeModal();
    } catch (err: any) {
      console.error('Error saving experience:', err);
      setSaveMessage(`Failed to save experience: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience entry?')) {
      try {
        await api.delete(`/admin/experience/${id}`);
        setSaveMessage('Experience entry deleted successfully!');
        fetchExperiences();
      } catch (err: any) {
        console.error('Error deleting experience:', err);
        setSaveMessage(`Failed to delete experience: ${err.response?.data?.message || err.message}`);
      } finally {
        setTimeout(() => setSaveMessage(null), 3000);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-text-dark text-center sm:text-left">Manage Professional Experience</h2>
        <button
          onClick={openAddModal}
          className="bg-pastel-green text-text-dark py-2 px-4 rounded-lg flex items-center shadow-md hover:bg-green-400 transition duration-300"
        >
          <FaPlus className="mr-2" /> Add Experience
        </button>
      </div>

      {saveMessage && (
        <p className={`mb-4 text-center ${saveMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {saveMessage}
        </p>
      )}

      {loading ? (
        <div className="text-center py-4">Loading experiences...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : experiences.length === 0 ? (
        <div className="text-center py-4 text-gray-600">No experience entries added yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100">
          <table className="min-w-full bg-white">
            <thead className="bg-pastel-light-blue text-text-dark">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-lg">Title</th>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Company</th>
                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Duration</th>
                <th className="py-3 px-6 text-center text-sm font-semibold uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {experiences.map((exp) => (
                <tr key={exp._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="py-4 px-6 text-gray-800">{exp.title}</td>
                  <td className="py-4 px-6 text-gray-800">{exp.company}</td>
                  <td className="py-4 px-6 text-gray-800">
                    {format(parseISO(exp.startDate), 'MMM yyyy')} -{' '}
                    {exp.endDate ? format(parseISO(exp.endDate), 'MMM yyyy') : 'Present'}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => openEditModal(exp)}
                        className="text-pastel-purple hover:text-purple-700 transition duration-150 p-2 rounded-full hover:bg-gray-100"
                        title="Edit"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(exp._id)}
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

      {/* Experience Add/Edit Modal */}
      {isModalOpen && currentExperience && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative my-8">
            <h3 className="text-2xl font-bold text-text-dark mb-6">
              {currentExperience._id ? 'Edit Experience' : 'Add New Experience'}
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
                  value={currentExperience.title}
                  onChange={handleInputChange}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue"
                  required
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">Company:</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={currentExperience.company}
                  onChange={handleInputChange}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue"
                  required
                />
              </div>
              <div>
                <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={currentExperience.startDate}
                  onChange={handleInputChange}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue"
                  required
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">End Date (Optional):</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={currentExperience.endDate || ''}
                  onChange={handleInputChange}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue"
                />
              </div>
              <div>
                <label htmlFor="responsibilities" className="block text-gray-700 text-sm font-bold mb-2">Responsibilities (one per line):</label>
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  value={currentExperience.responsibilities.join('\n')}
                  onChange={(e) => handleListChange(e, 'responsibilities')}
                  rows={5}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue resize-y"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="technologies" className="block text-gray-700 text-sm font-bold mb-2">Technologies (one per line):</label>
                <textarea
                  id="technologies"
                  name="technologies"
                  value={currentExperience.technologies.join('\n')}
                  onChange={(e) => handleListChange(e, 'technologies')}
                  rows={3}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue resize-y"
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
                      <FaSave className="mr-2" /> Save Experience
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

export default ManageExperience;