// frontend/src/components/Loader.tsx
import React from 'react';

const Loader: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 bg-opacity-60 transition-opacity duration-300">
    {/* Increased overall size of the loader container */}
    <div className="relative w-20 h-20"> {/* Changed from w-16 h-16 to w-20 h-20 */}
      {/* Outer ring: Increased border thickness */}
      <div className="absolute inset-0 border-8 border-t-blue-400 border-transparent rounded-full animate-spin-loader-slow"></div> {/* Changed border-4 to border-8 */}
      {/* Inner ring: Increased border thickness and adjusted inset for spacing */}
      <div className="absolute inset-4 border-8 border-t-green-400 border-transparent rounded-full animate-spin-loader-fast"></div> {/* Changed border-4 to border-8 and inset-2 to inset-4 */}
    </div>
  </div>
);

export default Loader;
