// frontend/src/pages/admin/ManageHomepageContent.tsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { IHomepageContent, ISkill, IProject } from '../../types';
import { FaSave, FaSyncAlt } from 'react-icons/fa'; // Corrected import from 'react-icons/fa'

const ManageHomepageContent: React.FC = () => {
  const [content, setContent] = useState<IHomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [allSkills, setAllSkills] = useState<ISkill[]>([]);
  const [allProjects, setAllProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homepageResponse = await api.get<IHomepageContent>('/homepage-content');
        setContent(homepageResponse.data);

        const skillsResponse = await api.get<ISkill[]>('/skills');
        setAllSkills(skillsResponse.data);

        const projectsResponse = await api.get<IProject[]>('/projects');
        setAllProjects(projectsResponse.data);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent((prevContent) => ({
      ...prevContent!,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFeaturedSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => {
      // Find the full skill object based on its ID
      return allSkills.find(skill => skill._id === option.value);
    }).filter(Boolean) as ISkill[]; // Filter out undefined and assert type
    setContent((prevContent) => ({
      ...prevContent!,
      featuredSkillIds: selectedOptions,
    }));
  };

  const handleFeaturedProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => {
      // Find the full project object based on its ID
      return allProjects.find(project => project._id === option.value);
    }).filter(Boolean) as IProject[]; // Filter out undefined and assert type
    setContent((prevContent) => ({
      ...prevContent!,
      featuredProjectIds: selectedOptions,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setIsSaving(true);
    setSaveMessage(null);

    // Prepare data for submission (send only IDs for featured content)
    const dataToSend = {
      ...content,
      featuredSkillIds: content.featuredSkillIds.map(s => s._id),
      featuredProjectIds: content.featuredProjectIds.map(p => p._id),
    };

    try {
      await api.put('/admin/homepage-content', dataToSend);
      setSaveMessage('Homepage content updated successfully!');
    } catch (err: any) {
      console.error('Error saving homepage content:', err);
      setSaveMessage(`Failed to save: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(null), 3000); // Clear message after 3 seconds
    }
  };

  if (loading) return <div className="text-center text-xl py-4">Loading homepage content...</div>;
  if (error) return <div className="text-center text-red-500 text-xl py-4">{error}</div>;
  if (!content) return <div className="text-center text-xl py-4">No content found.</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-text-dark mb-6">Manage Homepage Content</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={content.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue bg-gray-50"
            required
          />
        </div>
        <div>
          <label htmlFor="headline" className="block text-gray-700 text-sm font-bold mb-2">Headline:</label>
          <input
            type="text"
            id="headline"
            name="headline"
            value={content.headline}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue bg-gray-50"
            required
          />
        </div>
        <div>
          <label htmlFor="aboutText" className="block text-gray-700 text-sm font-bold mb-2">About Me Text:</label>
          <textarea
            id="aboutText"
            name="aboutText"
            value={content.aboutText}
            onChange={handleChange}
            rows={5}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue resize-y bg-gray-50"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="profileImageUrl" className="block text-gray-700 text-sm font-bold mb-2">Profile Image URL:</label>
          <input
            type="text"
            id="profileImageUrl"
            name="profileImageUrl"
            value={content.profileImageUrl || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue bg-gray-50"
          />
          {content.profileImageUrl && (
            <img src={content.profileImageUrl} alt="Profile Preview" className="mt-2 w-24 h-24 object-cover rounded-full shadow" />
          )}
        </div>
        <div>
          <label htmlFor="resumeUrl" className="block text-gray-700 text-sm font-bold mb-2">Resume URL (PDF):</label>
          <input
            type="text"
            id="resumeUrl"
            name="resumeUrl"
            value={content.resumeUrl || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue bg-gray-50"
          />
        </div>

        {/* Featured Skills Selector */}
        <div>
          <label htmlFor="featuredSkills" className="block text-gray-700 text-sm font-bold mb-2">Featured Skills (Hold Ctrl/Cmd to select multiple):</label>
          <select
            id="featuredSkills"
            name="featuredSkillIds"
            multiple
            value={content.featuredSkillIds.map(s => s._id)}
            onChange={handleFeaturedSkillChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue h-48 bg-gray-50"
          >
            {allSkills.map(skill => (
              <option key={skill._id} value={skill._id}>
                {skill.name} ({skill.iconClass})
              </option>
            ))}
          </select>
        </div>

        {/* Featured Projects Selector */}
        <div>
          <label htmlFor="featuredProjects" className="block text-gray-700 text-sm font-bold mb-2">Featured Projects (Hold Ctrl/Cmd to select multiple):</label>
          <select
            id="featuredProjects"
            name="featuredProjectIds"
            multiple
            value={content.featuredProjectIds.map(p => p._id)}
            onChange={handleFeaturedProjectChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-light-blue h-48 bg-gray-50"
          >
            {allProjects.map(project => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={`bg-pastel-green text-text-dark py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-400 transition duration-300 transform hover:scale-105 shadow-md flex items-center justify-center ${
            isSaving ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <FaSyncAlt className="animate-spin mr-2" /> Saving...
            </>
          ) : (
            <>
              <FaSave className="mr-2" /> Save Homepage Content
            </>
          )}
        </button>
        {saveMessage && (
          <p className={`mt-2 text-center text-sm ${saveMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {saveMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default ManageHomepageContent;