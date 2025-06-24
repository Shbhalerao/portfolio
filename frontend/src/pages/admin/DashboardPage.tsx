// frontend/src/pages/admin/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
// CHANGED: Import from 'react-icons/fa' for Font Awesome 5
import { FaHome, FaProjectDiagram, FaBriefcase, FaBlog, FaEnvelope, FaShareAlt, FaSignOutAlt, FaCog } from 'react-icons/fa'; 

// Import management components (as defined in previous prompts)
import ManageHomepageContent from './ManageHomepageContent';
import ManageProjects from './ManageProjects';
import ManageExperience from './ManageExperience';
import ManageArticles from './ManageArticles';
import ManageContactMessages from './ManageContactMessages';
import ManageSocialLinks from './ManageSocialLinks';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, loading, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('homepage'); // Default active tab

  useEffect(() => {
    // checkAuth(); // REMOVE: Auth is checked globally in App.tsx
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login'); // Redirect to login if not authenticated
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-text-dark">Loading dashboard...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // This state should ideally not be reached due to useEffect redirect
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'homepage', label: 'Homepage Content', icon: FaHome, component: ManageHomepageContent },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram, component: ManageProjects },
    { id: 'experience', label: 'Experience', icon: FaBriefcase, component: ManageExperience },
    { id: 'articles', label: 'Articles', icon: FaBlog, component: ManageArticles },
    { id: 'contact-messages', label: 'Contact Messages', icon: FaEnvelope, component: ManageContactMessages },
    { id: 'social-links', label: 'Social Links', icon: FaShareAlt, component: ManageSocialLinks },
  ];

  const ActiveComponent = menuItems.find(item => item.id === activeTab)?.component;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-pastel-light-blue shadow-lg p-6 flex flex-col justify-between rounded-r-lg">
        <div>
          <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Admin Panel</h2>
          <nav>
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left flex items-center p-3 rounded-lg text-lg font-medium transition duration-300
                      ${activeTab === item.id
                        ? 'bg-pastel-purple text-text-light shadow-md'
                        : 'text-text-dark hover:bg-pastel-green hover:text-white'}
                    `}
                  >
                    <item.icon className="mr-3 text-xl" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center p-3 rounded-lg text-lg font-medium bg-red-500 text-white hover:bg-red-600 transition duration-300 shadow-md"
          >
            <FaSignOutAlt className="mr-3 text-xl" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-8 bg-gray-50 overflow-auto">
        <div className="bg-white p-8 rounded-lg shadow-md min-h-[calc(100vh-64px)]">
          {ActiveComponent ? <ActiveComponent /> : <div className="text-center text-xl text-gray-600">Select a section from the sidebar.</div>}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;