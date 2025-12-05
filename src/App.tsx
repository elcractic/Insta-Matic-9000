import React from 'react';
// Ensure the file is named "RetroCamera.tsx" in the same folder
import RetroCamera from './RetroCamera';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 font-mono select-none overflow-hidden bg-black text-white">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-black">
          {/* Animated Grid */}
          <div 
             className="absolute inset-0 opacity-[0.1] animate-grid-move h-[200%]" 
             style={{ 
                 backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)',
                 backgroundSize: '40px 40px',
                 transform: 'perspective(500px) rotateX(60deg)',
                 transformOrigin: 'top center',
             }}
          ></div>
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_90%)] pointer-events-none"></div>
      </div>

      {/* Main Component */}
      <RetroCamera />
    </div>
  );
};

export default App;