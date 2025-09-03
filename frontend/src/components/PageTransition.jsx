import React from 'react';

const PageTransition = ({ isActive }) => {
  return (
    <div
      className={`fixed inset-0 z-[100] pointer-events-none transition-all duration-700 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Main transition layer with cool gradient */}
      <div 
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-blue-500 to-blue-600 transform transition-all duration-700 ease-out ${
          isActive ? 'scale-100 opacity-98' : 'scale-150 opacity-0'
        }`}
      >
        {/* Animated patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 mix-blend-overlay">
            <div className={`w-full h-full bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] transform transition-transform duration-1000 ${
              isActive ? 'scale-100' : 'scale-150'
            }`} />
          </div>
        </div>

        {/* Loading animation */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="relative">
            {/* Outer circle */}
            <div className="w-24 h-24 rounded-full border-2 border-white/20 animate-[spin_2s_linear_infinite]" />
            
            {/* Middle circle */}
            <div className="absolute top-1 left-1 w-[88px] h-[88px] rounded-full border-2 border-white/40 animate-[spin_1.5s_linear_infinite_reverse]" />
            
            {/* Inner circle */}
            <div className="absolute top-3 left-3 w-[72px] h-[72px] rounded-full border-2 border-white/60 animate-[spin_1s_linear_infinite]" />
            
            {/* Center logo */}
            <div className="absolute top-[26px] left-[26px] w-[44px] h-[44px]">
              <div className="w-full h-full bg-white rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Side panels animation */}
      <div 
        className={`absolute inset-y-0 left-0 w-1/2 bg-blue-500/80 backdrop-blur-sm transform transition-transform duration-700 ease-in-out ${
          isActive ? 'translate-x-0' : '-translate-x-full'
        }`} 
      />
      <div 
        className={`absolute inset-y-0 right-0 w-1/2 bg-blue-500/80 backdrop-blur-sm transform transition-transform duration-700 ease-in-out ${
          isActive ? 'translate-x-0' : 'translate-x-full'
        }`} 
      />
    </div>
  );
};

export default PageTransition;