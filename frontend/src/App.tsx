// frontend/src/App.tsx
import React, { JSX, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TransitionWrapper from './components/TransitionWrapper'; // Import the new wrapper component
import Layout from './components/Layout';
import HomePage from './pages/public/HomePage';
import ProjectsPage from './pages/public/ProjectsPage';
import BlogPage from './pages/public/BlogPage';
import ExperiencePage from './pages/public/ExperiencePage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';

import useAuthStore from './store/authStore';
import './App.css';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const App: React.FC = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      {/* Wrap your Routes component with TransitionWrapper */}
      <TransitionWrapper>
        <Routes>
          {/* Public Routes - Wrapped in the common Layout (NavBar + Footer) */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
          <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
          <Route path="/experience" element={<Layout><ExperiencePage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />

          {/* Admin/CRM Routes - NOT wrapped in public Layout */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Protected Dashboard and its sub-management views */}
          <Route
            path="/admin/dashboard/*"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />

          {/* Fallback for any other /admin path that is not /admin/login or /admin/dashboard */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <Navigate to="/admin/dashboard" replace />
              </PrivateRoute>
            }
          />

          {/* Fallback route for any other undefined paths - wrapped in public Layout */}
          <Route path="*" element={<Layout><h1 className="text-4xl text-center text-red-500 my-10">404 - Page Not Found</h1></Layout>} />
        </Routes>
      </TransitionWrapper>
    </Router>
  );
};

export default App;
