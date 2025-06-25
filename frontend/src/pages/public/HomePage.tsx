// frontend/src/pages/public/HomePage.tsx
import React, { JSX, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import api from '../../services/api';
import { IHomepageContent, ISkill, IProject } from '../../types';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa'; // Using Font Awesome 5 for consistency
import {
  FaJava, FaLeaf, FaReact, FaJsSquare, FaDatabase, FaAws
} from 'react-icons/fa'; // Import specific icons
import Loader from '../../components/Loader';

const HomePage: React.FC = () => {
  const [homepageContent, setHomepageContent] = useState<IHomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: skillsRef, inView: skillsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: projectsRef, inView: projectsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: collaborateRef, inView: collaborateInView } = useInView({ triggerOnce: true, threshold: 0.1 });


  useEffect(() => {
    const fetchHomepageContent = async () => {
      try {
        const response = await api.get<IHomepageContent>('/homepage-content');
        setHomepageContent(response.data);
      } catch (err) {
        console.error('Error fetching homepage content:', err);
        setError('Failed to load homepage content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchHomepageContent();
  }, []);

  // Modified getIconComponent to also return color class for skills
  const getSkillIconAndColor = (skillName: string) => {
    let iconComponent: JSX.Element | null = null;
    let colorClass: string = 'text-gray-700'; // Default color

    switch (skillName.toLowerCase()) {
      case 'java':
        iconComponent = <FaJava />;
        colorClass = 'text-skill-java';
        break;
      case 'spring boot': // Assuming you use a generic leaf for Spring Boot
        iconComponent = <FaLeaf />;
        colorClass = 'text-skill-spring-boot';
        break;
      case 'react.js':
        iconComponent = <FaReact />;
        colorClass = 'text-skill-react';
        break;
      case 'javascript':
        iconComponent = <FaJsSquare />; // Font Awesome for JS Square
        colorClass = 'text-skill-javascript';
        break;
      case 'postgresql': // Assuming a database icon for PostgreSQL
        iconComponent = <FaDatabase />;
        colorClass = 'text-skill-postgresql';
        break;
      case 'aws':
        iconComponent = <FaAws />;
        colorClass = 'text-skill-aws';
        break;
      case 'docker':
        iconComponent = <FaIcons.FaDocker />;
        colorClass = 'text-skill-docker';
        break;
      default:
        // Fallback if no specific icon or color is mapped
        iconComponent = <FaIcons.FaCode />;
        colorClass = 'text-gray-700';
    }
    return { iconComponent, colorClass };
  };

  // Original getIconComponent for other uses (e.g. social links in footer)
  const getIconComponentGeneral = (iconClass: string) => {
    const cleanIconName = iconClass
      .replace(/^(fa[brs]|fab|fas)\s*(fa-)?/, '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    const IconComponent = (FaIcons as any)[`Fa${cleanIconName}`];
    return IconComponent ? <IconComponent /> : null;
  };


  if (loading) return <Loader />;
  if (error) return <div className="text-center py-8 text-red-500 text-xl">{error}</div>;
  if (!homepageContent) return <div className="text-center py-8 text-xl">No homepage content available.</div>;

  // Modified achievementCards array for new styling
  const achievementCards = [
    { icon: <FaIcons.FaBriefcase />, text: '5+ Years', subText: 'Professional Experience', circleBg: 'bg-soft-blue', iconColor: 'text-blue-600' },
    { icon: <FaIcons.FaCheckCircle />, text: '20+ Projects', subText: 'Successfully Delivered', circleBg: 'bg-soft-green', iconColor: 'text-green-600' },
    { icon: <FaIcons.FaUsers />, text: 'Collaborative', subText: 'Team Player', circleBg: 'bg-pastel-purple', iconColor: 'text-purple-600' },
  ];

  // Colors array for project cards based on screenshot and user's "soft" colors
  const projectCardBackgroundColors = ['bg-soft-blue', 'bg-soft-green'];

  // Function to get background color for project card based on index
  const getProjectCardMeta = (index: number) => {
    const colors = projectCardBackgroundColors;
    const color = colors[index % colors.length];
    return { color };
  };

  

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 text-text-dark">
      {/* Hero Section */}
      <section
      ref={heroRef}
       className={`relative w-full py-16 md:py-24 px-4 
        bg-gradient-to-br from-pastel-light-blue 
        via-pastel-yellow to-vibrant-purple overflow-hidden shadow-sm
        ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}
        hero-gradient-pulsate`}>
        <div className="container mx-auto flex flex-col items-center justify-center gap-12 max-w-6xl">
          {/* Text Content */}
          <div className="flex-1 text-center z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-3 animate-fade-in-down">
              Hi, I'm <span className="text-blue-600">{homepageContent.name}</span>
            </h1>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-700 mb-6 animate-fade-in-up delay-100">
              {homepageContent.headline}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center bg-black text-text-light py-3 px-8 rounded-lg text-lg font-semibold hover:bg-gray-800 transition duration-300 transform hover:scale-105 shadow-md"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-transparent border-2 border-gray-700 text-gray-700 py-3 px-8 rounded-lg text-lg font-semibold hover:bg-transparent hover:text-gray-900 hover:border-gray-900 transition duration-300 transform hover:scale-105 shadow-md"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Floating Objects - Tech Icons */}
          <IconContext.Provider value={{ className: 'pointer-events-none' }}>
            {/* Object 1 (Code) */}
            <div className="absolute top-[10%] left-[15%] text-vibrant-purple text-5xl opacity-60 animate-float-1">
              <FaIcons.FaCode />
            </div>
            {/* Object 2 (Laptop Code) */}
            <div className="absolute bottom-[20%] right-[10%] text-sunshine-yellow text-4xl opacity-70 animate-float-2">
              <FaIcons.FaPencilAlt />
            </div>
            {/* Object 3 (Cloud) */}
            <div className="absolute top-[50%] left-[calc(50%+100px)] text-pastel-light-blue text-6xl opacity-50 animate-float-3">
              <FaIcons.FaCloud />
            </div>
            {/* New Object 4 (Terminal) */}
            <div className="absolute top-[30%] right-[25%] text-green-300 text-4xl opacity-65 animate-float-4">
              <FaIcons.FaBook />
            </div>
            {/* New Object 5 (Database) */}
      
          </IconContext.Provider>

        </div>
      </section>

      {/* About Me Section */}
      <section 
      ref={aboutRef}
      className={`w-full my-16 px-4
        ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
      `}>
        <h3 className="text-4xl font-bold text-center text-text-dark mb-10">About Me</h3>
        <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto mb-12">
          {homepageContent.aboutText}
        </p>
        {/* Achievement Cards (Updated Styling) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {achievementCards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4"
            >
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${card.circleBg}`}>
                <IconContext.Provider value={{ className: `${card.iconColor} text-3xl` }}>
                  {card.icon}
                </IconContext.Provider>
              </div>
              <h4 className="text-xl font-bold text-text-dark mb-1">{card.text}</h4>
              <p className="text-sm text-gray-600">{card.subText}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Skills Section (Background reverted) */}
      <section 
      ref={skillsRef}
      className={`w-full px-4 bg-gray-100 
      py-16 rounded-lg shadow-inner
      ${skillsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
      `}> {/* Reverted background to original */}
        <h3 className="text-4xl font-bold text-center text-text-dark mb-4">Featured Skills</h3>
        <p className="text-lg text-center text-gray-700 mb-10">
          Technologies I work with to build amazing applications
        </p>
        <div className="flex flex-wrap justify-center gap-6">
            {homepageContent.featuredSkillIds && homepageContent.featuredSkillIds.length > 0 ? (
              homepageContent.featuredSkillIds.map((skill: ISkill) => {
                const { iconComponent, colorClass } = getSkillIconAndColor(skill.name);
                return (
                  <div
                    key={skill._id}
                    className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 group" // Removed border
                  >
                    <IconContext.Provider value={{ className: `${colorClass} text-5xl` }}>
                      {iconComponent}
                    </IconContext.Provider>
                    <p className="mt-3 text-lg font-medium text-text-dark">{skill.name}</p>
                  </div>
                );
              })
            ) : (
              <span className="text-gray-400 text-center">No skills added yet.</span>
            )}
        </div>
      </section>

      {/* Featured Projects Section */}
      {homepageContent.featuredProjectIds && homepageContent.featuredProjectIds.length > 0 && (
        <section 
        ref={projectsRef}
        className={`w-full px-4 
        bg-gray-50 py-16
        ${projectsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
        `}>
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-4">Featured Projects</h3>
          <p className="text-lg text-center text-gray-700 mb-10">
            A glimpse of my recent work
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {homepageContent.featuredProjectIds.slice(0, 2).map((project: IProject, index) => {
              const { color } = getProjectCardMeta(index);
              return (
                <div
                  key={project._id}
                  className={`${color} rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-100`}
                >
                  {/* Colored section of the card */}
                  <div className={`${color} p-6 sm:p-8 rounded-t-lg`}>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-semibold text-gray-900">{project.name}</h4>
                      <a
                        href={project.liveLink || project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 transition-colors duration-300 ml-4 flex-shrink-0"
                      >
                        <FaIcons.FaExternalLinkAlt size={16} />
                      </a>
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed">{project.description}</p>
                  </div>
                  {/* White section for technologies */}
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
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-block bg-black text-text-light py-3 px-8 rounded-lg text-md font-semibold hover:bg-gray-800 transition duration-300 transform hover:scale-105 shadow-md"
            >
              View All Projects
            </Link>
          </div>
        </section>
      )}

      {/* Let's Work Together Section */}
      <section 
      ref={collaborateRef}
      className={`w-full py-20 px-4 bg-gradient-to-r 
        from-pastel-purple to-pastel-pink 
        text-dark text-center rounded-lg
        ${collaborateInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
        `}>
        <h3 className="text-4xl font-bold mb-4">Let's Work Together</h3>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          I'm always interested in new opportunities and exciting projects. Whether you have a project in mind or just want to connect, I'd love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-black text-white py-4 px-10 rounded-lg text-md font-semibold hover:bg-gray-900 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            <FaIcons.FaEnvelope className="mr-3 text-2xl" /> Contact Me
          </Link>
          {homepageContent.resumeUrl && (
            <a
              href={homepageContent.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-black py-4 px-10 rounded-lg text-md font-semibold transition duration-300 transform hover:scale-105 shadow-lg"
            >
              <FaIcons.FaDownload className="mr-3 text-2xl" /> Download Resume
            </a>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;