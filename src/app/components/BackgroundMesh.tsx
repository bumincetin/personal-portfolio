'use client';

import React from 'react';

const BackgroundMesh: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none bg-void">
      {/* Orb 1 - Purple */}
      <div className="absolute w-[60vw] h-[60vw] rounded-full blur-[80px] opacity-40 animate-float -top-[20%] -left-[10%] bg-[radial-gradient(circle,_#7000ff,_transparent)]" />
      
      {/* Orb 2 - Cyan */}
      <div className="absolute w-[50vw] h-[50vw] rounded-full blur-[80px] opacity-40 animate-float-delayed -bottom-[10%] -right-[10%] bg-[radial-gradient(circle,_#00f0ff,_transparent)]" />
    </div>
  );
};

export default BackgroundMesh;

