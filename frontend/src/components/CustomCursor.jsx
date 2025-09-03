import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if the cursor is over a clickable element
      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a'
      );
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-[100] transition-transform duration-100 ${
          isClicking ? 'scale-75' : 'scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className={`w-4 h-4 rounded-full bg-blue-400/30 backdrop-blur-sm transition-transform duration-150 ${
          isPointer ? 'scale-150' : 'scale-100'
        }`} />
      </div>

      {/* Trailer effect */}
      <div
        className="fixed pointer-events-none z-[99] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)'
        }}
      >
        <div className={`w-2 h-2 rounded-full bg-white transition-transform duration-150 ${
          isPointer ? 'scale-150 opacity-100' : 'scale-100 opacity-50'
        }`} />
      </div>
    </>
  );
};

export default CustomCursor;
