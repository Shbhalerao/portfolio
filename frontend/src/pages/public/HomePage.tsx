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
// Import additional icons for floating objects (already done in previous steps)
import TechSphere from '../../components/TechSphere';



// Import the image directly from the new recommended location
import skillsCloudImage from '../../assets/images/download.png';
import TechSphereCSSOnly from '../../components/TechSphere';


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
      case 'spring boot':
        iconComponent = <FaLeaf />;
        colorClass = 'text-skill-spring-boot';
        break;
      case 'react.js':
        iconComponent = <FaReact />;
        colorClass = 'text-skill-react';
        break;
      case 'javascript':
        iconComponent = <FaJsSquare />;
        colorClass = 'text-skill-javascript';
        break;
      case 'postgresql':
        iconComponent = <FaIcons.FaDatabase />; // Keep using FaDatabase if needed elsewhere, otherwise FaDatabaseIcon
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
        iconComponent = <FaIcons.FaCode />; // Generic code icon for others
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
    { icon: <FaIcons.FaBriefcase />, text: '4+ Years', subText: 'Professional Experience', circleBg: 'bg-soft-blue', iconColor: 'text-blue-600' },
    { icon: <FaIcons.FaCode />, text: 'Clean Code', subText: 'Successfully Delivered Multiple Projects', circleBg: 'bg-soft-green', iconColor: 'text-green-600' },
    { icon: <FaIcons.FaBinoculars />, text: 'Innovative', subText: 'Always Learning New Technologies', circleBg: 'bg-pastel-purple', iconColor: 'text-purple-600' },
  ];

  // Colors array for project cards based on screenshot and user's "soft" colors
  const projectCardBackgroundColors = ['bg-soft-blue', 'bg-soft-green'];

  // Function to get background color for project card based on index
  const getProjectCardMeta = (index: number) => {
    const colors = projectCardBackgroundColors;
    const color = colors[index % colors.length];
    return { color };
  };

  // Colors for the skill tag dots, cycling through some vibrant pastels
  const dotColors = [
    'bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500', 'bg-teal-500',
  ];


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

          {/* Floating Objects - Tech Icons (background of hero) - These are for the *hero section*, not the skills section. */}
          <IconContext.Provider value={{ className: 'pointer-events-none' }}>
            {/* Object 1 (Code) */}
            <div className="absolute top-[10%] left-[15%] text-vibrant-purple text-5xl opacity-60 animate-float-1">
              <FaIcons.FaCode />
            </div>
            {/* Object 2 (Laptop Code) */}
            <div className="absolute bottom-[20%] right-[10%] text-sunshine-yellow text-4xl opacity-70 animate-float-2">
              <FaIcons.FaLaptopCode />
            </div>
            {/* Object 3 (Cloud) */}
            <div className="absolute top-[50%] left-[calc(50%+100px)] text-pastel-light-blue text-6xl opacity-50 animate-float-3">
              <FaIcons.FaCloud />
            </div>
            {/* New Object 4 (Terminal) */}
            <div className="absolute top-[30%] right-[25%] text-pastel-green text-3xl opacity-65 animate-float-4">
              <FaIcons.FaTerminal />
            </div>
            {/* New Object 5 (Database) */}
            <div className="absolute bottom-[10%] left-[5%] text-pastel-purple text-4xl opacity-75 animate-float-5">
              <FaIcons.FaDatabase />
            </div>
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
        <div className="flex justify-center gap-2 max-w-2xl mx-auto">
          {achievementCards.map((card, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white/80 border border-gray-200 rounded-full px-3 py-2 shadow-sm hover:shadow-md transition-all duration-200 min-w-[90px]"
              style={{ minWidth: 90 }}
            >
              <span className={`w-7 h-7 flex items-center justify-center rounded-full ${card.circleBg} shadow`}>
                <IconContext.Provider value={{ className: `${card.iconColor} text-base` }}>
                  {card.icon}
                </IconContext.Provider>
              </span>
              <span className="flex flex-col items-start">
                <span className="text-xs font-bold text-text-dark leading-tight">{card.text}</span>
                <span className="text-[10px] text-gray-500 leading-tight">{card.subText}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Skills Section (Image Replication) */}
     <section 
  ref={skillsRef}
  className={`w-full px-4 py-10 text-text-dark bg-gray-100
  ${skillsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
  `}>
  <div className="container mx-auto flex flex-col items-center gap-6 max-w-5xl">

    {/* Heading centered at top */}
    <h3 className="text-3xl font-bold text-black text-center mb-3">Technical Skills</h3>

    {/* Two-column layout for pills and sphere */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full items-center">

      {/* Left Column: Skills Tags */}
      <div className="flex flex-col items-start justify-center md:pr-6">
        <div className="flex flex-wrap gap-2">
          {homepageContent.featuredSkillIds && homepageContent.featuredSkillIds.length > 0 ? (
            homepageContent.featuredSkillIds.map((skill: ISkill, index: number) => {
              const dotColorClass = dotColors[index % dotColors.length];
              return (
                <div
                  key={skill._id}
                  className={`flex items-center space-x-2 bg-white text-text-dark text-sm px-2.5 py-1 rounded-full font-medium whitespace-nowrap shadow-sm border border-gray-200`}
                >
                  <span className={`w-2 h-2 rounded-full ${dotColorClass}`}></span>
                  <span>{skill.name}</span>
                </div>
              );
            })
          ) : (
            <span className="text-gray-600">No skills added yet.</span>
          )}
        </div>
      </div>

      {/* Right Column: Animated Icon Sphere */}
      <div className="relative w-full aspect-square md:w-[260px] md:h-[260px] flex-shrink-0 mx-auto rounded-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 rounded-full transform scale-110"></div>
        <TechSphere />
      </div>
    </div>
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
                        className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors duration-300 ml-4 flex-shrink-0"
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