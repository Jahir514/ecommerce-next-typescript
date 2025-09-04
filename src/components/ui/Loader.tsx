import React from 'react';

const Loader: React.FC = () => (
  <div className="flex items-center justify-center w-full h-full py-10">
    <div className="relative flex items-center justify-center">
      <div className="absolute animate-spin rounded-full h-20 w-20 border-4 border-green-500 border-t-blue-500 border-b-yellow-400 border-l-green-500"></div>
      <div className="relative flex items-center justify-center h-16 w-16 bg-white rounded-full shadow-lg">
        {/* Example: Shopping cart SVG icon */}
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
          <defs>
            <linearGradient id="icon-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ec4899" /> {/* pink-500 */}
              <stop offset="50%" stopColor="#3b82f6" /> {/* blue-500 */}
              <stop offset="100%" stopColor="#f59e42" /> {/* yellow-400 */}
            </linearGradient>
          </defs>
          <path stroke="url(#icon-gradient)" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.9-.55L21 9M7 13V6a1 1 0 011-1h3m4 0h2a1 1 0 011 1v2" />
        </svg>
      </div>
    </div>
  </div>
);

export default Loader;
