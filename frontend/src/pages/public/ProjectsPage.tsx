// frontend/src/pages/public/ProjectsPage.tsx
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { IProject, IHomepageContent } from '../../types';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa'; // Ensure needed FaIcons are imported
import Loader from '../../components/Loader';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [homepageContent, setHomepageContent] = useState<IHomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const projectsResponse = await api.get<IProject[]>('/projects');
        setProjects(projectsResponse.data);

        // Fetch homepage content to get resume URL
        const homepageResponse = await api.get<IHomepageContent>('/homepage-content');
        setHomepageContent(homepageResponse.data);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // Define project card background colors (consistent with HomePage)
  const projectCardBackgroundColors = ['bg-soft-blue', 'bg-soft-green'];

  // Function to get background color for project card based on index
  const getProjectCardMeta = (index: number) => {
    const colors = projectCardBackgroundColors;
    const color = colors[index % colors.length];
    return { color };
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center py-8 text-red-500 text-xl">{error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 text-text-dark">
      {/* Page Header - Background changed to gradient */}
      <section className="relative w-full text-center py-12 px-4 bg-gradient-to-br from-pastel-blue to-pastel-purple shadow-sm">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">My Projects</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Explore my portfolio of fullstack applications, web solutions, and software projects built with modern technologies.
        </p>
      </section>

      {/* REMOVED: Filter Buttons Section */}

      {/* Projects Grid */}
      <section className="w-full max-w-6xl my-8 px-4">
        {projects.length === 0 ? (
          <div className="text-center py-8 text-xl text-gray-600">No projects to display yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"> {/* Keeping multi-column grid as it suits the overall layout */}
            {projects.map((project, index) => {
              const { color } = getProjectCardMeta(index);
              return (
                <div
                  key={project._id}
                  className={`${color} rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl group`} /* Removed border */
                >
                  {/* Colored section of the card (consistent with homepage) */}
                  <div className={`${color} p-6 sm:p-8 rounded-t-lg relative`}>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-semibold text-gray-900">{project.name}</h4>
                      {/* External Link Icon in top right corner */}
                      {project.liveLink || project.repoLink ? (
                        <a
                          href={project.liveLink || project.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-900 transition-colors duration-300 ml-4 flex-shrink-0"
                          title="View Project"
                        >
                          <FaIcons.FaExternalLinkAlt size={16} />
                        </a>
                      ) : null}
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed">{project.description}</p>
                  </div>
                  {/* White section for technologies (consistent with homepage) */}
                  <div className="p-6 sm:p-8 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-white text-gray-900 text-sm px-3 py-1 rounded-full font-medium shadow-sm border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* REMOVED: Code and Live Demo buttons */}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Let's Collaborate Section (Updated Styling) */}
      <section className="w-full py-20 px-4 bg-gradient-to-br from-pastel-purple to-pastel-pink text-text-dark text-center"> {/* Background from screenshot */}
        <h3 className="text-4xl font-bold mb-4">Ready to Collaborate?</h3> {/* Heading from screenshot */}
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Let's work together to bring your ideas to life with clean, efficient, and scalable solutions. {/* Paragraph from screenshot */}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-gray-800 text-white py-3 px-8 rounded-lg text-md font-semibold hover:bg-gray-900 transition duration-300 transform hover:scale-105 shadow-md" /* Styled to match screenshot */
          >
            Get In Touch
          </Link>
          {homepageContent?.resumeUrl && (
            <a
              href={homepageContent.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white border border-gray-300 text-gray-800 py-3 px-8 rounded-lg text-md font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-md" /* Styled to match screenshot */
            >
              View Resume
            </a>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;