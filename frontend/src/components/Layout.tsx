// frontend/src/components/Layout.tsx
import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // The overall min-h-screen and flex-col remains for sticky footer
    <div className="flex flex-col min-h-screen bg-gray-50 text-text-dark"> 
      <NavBar />
      {/* Removed max-w, mx-auto, px, py from main. Individual pages will manage their layout. */}
      <main className="flex-1 w-full relative"> 
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;