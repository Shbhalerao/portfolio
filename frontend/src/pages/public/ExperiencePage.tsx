// frontend/src/pages/public/ExperiencePage.tsx
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { IExperience, IHomepageContent } from '../../types';
import { format, parseISO, intervalToDuration } from 'date-fns';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa'; // Ensure FaBuilding is imported if used this way

const ExperiencePage: React.FC = () => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [homepageContent, setHomepageContent] = useState<IHomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const experiencesResponse = await api.get<IExperience[]>('/experience');
        // Sort by startDate, most recent first
        const sortedExperiences = experiencesResponse.data.sort((a, b) => {
          const dateA = new Date(a.startDate).getTime();
          const dateB = new Date(b.startDate).getTime();
          return dateB - dateA;
        });
        setExperiences(sortedExperiences);

        const homepageResponse = await api.get<IHomepageContent>('/homepage-content');
        setHomepageContent(homepageResponse.data);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load professional experience. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // Function to calculate duration in years and months
  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = parseISO(startDate);
    const end = endDate ? parseISO(endDate) : new Date();

    const duration = intervalToDuration({ start, end });

    let durationString = '';
    if (duration.years && duration.years > 0) {
      durationString += `${duration.years} year${duration.years > 1 ? 's' : ''}`;
    }
    if (duration.months && duration.months > 0) {
      if (durationString) durationString += ' ';
      durationString += `${duration.months} month${duration.months > 1 ? 's' : ''}`;
    }

    return durationString || 'Less than a month';
  };

  // Define colors for date/duration blocks in cards (from screenshot)
  const dateBlockColors = ['bg-soft-blue', 'bg-pastel-purple', 'bg-soft-green'];

  // Define icons and names for Technical Expertise section (hardcoded as per image design)
  // Updated with explicit colorClass for brand colors as per homepage_skills.png and tailwind.config.js
  const technicalSkills = [
    { name: 'Java', icon: <FaIcons.FaJava />, colorClass: 'text-skill-java' },
    { name: 'React.js', icon: <FaIcons.FaReact />, colorClass: 'text-skill-react' },
    { name: 'Spring Boot', icon: <FaIcons.FaLeaf />, colorClass: 'text-skill-spring-boot' }, // Using FaLeaf for Spring
    { name: 'Databases', icon: <FaIcons.FaDatabase />, colorClass: 'text-skill-postgresql' }, // Using postgresql color for generic db
    { name: 'AWS', icon: <FaIcons.FaAws />, colorClass: 'text-skill-aws' },
  ];

  const getIconComponent = (iconClass: string) => {
    // This function is still used for generic icons not in technicalSkills array if needed
    const cleanIconName = iconClass
      .replace(/^(fa[brs]|fab|fas)\s*(fa-)?/, '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

    const IconComponent = (FaIcons as any)[`Fa${cleanIconName}`];
    return IconComponent ? <IconComponent /> : null;
  };

  if (loading) return <div className="text-center py-8 text-xl">Loading professional experience...</div>;
  if (error) return <div className="text-center py-8 text-red-500 text-xl">{error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-text-dark">
      {/* Page Header - Background changed to gradient */}
      <section className="relative w-full text-center py-12 px-4 bg-gradient-to-br from-pastel-blue to-pastel-purple shadow-sm">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Professional Experience</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          A journey of innovation, significant growth, challenges, and technical expertise across various roles and technologies.
        </p>
      </section>

      {/* Experience Section - Now with separate cards per entry */}
      {experiences.length === 0 ? (
        <div className="text-center py-8 text-xl text-gray-600">No professional experience to display yet.</div>
      ) : (
        <section className="w-full max-w-4xl my-16 px-4">
          <div className="space-y-8"> {/* Stack individual experience entries */}
            {experiences.map((exp, index) => {
              const startDate = parseISO(exp.startDate);
              const endDate = exp.endDate ? parseISO(exp.endDate) : null;
              const isCurrent = !exp.endDate;
              const periodText = isCurrent
                ? `${format(startDate, 'yyyy')} - Present`
                : `${format(startDate, 'yyyy')} - ${format(endDate!, 'yyyy')}`;
              const duration = calculateDuration(exp.startDate, exp.endDate);
              const dateBlockColor = dateBlockColors[index % dateBlockColors.length];

              return (
                <div
                  key={exp._id}
                  className="flex flex-col md:flex-row items-start gap-6" // Outer flex container for the two cards
                >
                  {/* Left Card: Time Frame */}
                  <div className={`flex-shrink-0 w-full md:w-40 p-4 rounded-lg shadow-md text-center ${dateBlockColor}`}>
                    {isCurrent && <p className="text-gray-900 text-sm font-semibold mb-1">Current</p>}
                    <p className="text-gray-900 font-bold text-lg">{periodText}</p>
                    {duration && <p className="text-gray-700 text-sm">{duration}</p>}
                  </div>

                  {/* Right Card: Description */}
                  <div className="flex-grow bg-gray-100 p-6 rounded-lg shadow-md border border-gray-100"> {/* Light grey background */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{exp.title}</h2>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <FaIcons.FaBuilding className="mr-2 text-gray-600" /> {/* Company icon */}
                      {exp.company}
                    </h3>
                    {exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                          {exp.responsibilities.map((res, i) => (
                              <li key={i}>{res}</li>
                          ))}
                      </ul>
                    )}
                    <div className="flex flex-wrap gap-2 mt-4">
                      <p className="text-gray-800 font-semibold mr-2">Key Technologies:</p>
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-white text-gray-900 text-xs px-3 py-1 rounded-full font-medium shadow-sm border border-gray-200" // White pills with black text
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Technical Expertise Section (Updated Styling) */}
      <section className="w-full px-4 bg-gradient-to-br from-pastel-blue to-soft-green py-16 rounded-lg shadow-inner"> {/* New gradient background */}
        <h3 className="text-4xl font-bold text-center text-text-dark mb-4">Technical Expertise</h3>
        <p className="text-lg text-center text-gray-700 mb-10">
          Technologies and skills acquired throughout my journey {/* Updated subheading text */}
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {technicalSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 group min-w-[120px]" // Removed border
            >
              <IconContext.Provider value={{ className: `text-5xl ${skill.colorClass}` }}> {/* Apply brand color and correct size */}
                {skill.icon}
              </IconContext.Provider>
              <p className="mt-3 text-xl font-medium text-text-dark">{skill.name}</p> {/* Removed hover color */}
            </div>
          ))}
        </div>
      </section>

      {/* Let's Work Together Section (Updated Styling) */}
      <section className="w-full py-20 px-4 bg-gray-50 text-text-dark text-center"> {/* Removed background, rounded, shadow */}
        <h3 className="text-4xl font-bold mb-4">Let's Work Together</h3> {/* Updated heading text */}
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Interested in collaborating or learning more about my experience? I'd love to hear from you. {/* Updated paragraph text */}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-md" // Styled to match screenshot
          >
            {/* Removed icon */}
            View Projects
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-white text-blue-600 border border-blue-600 py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-50 transition duration-300 transform hover:scale-105 shadow-md" // Styled to match screenshot
          >
            {/* Removed icon */}
            Contact Me
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ExperiencePage;