import React, { createContext, useContext, useState } from 'react';
import PageTransition from '../components/PageTransition';

const TransitionContext = createContext(null);

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = () => {
    setIsTransitioning(true);
  };

  const endTransition = () => {
    setIsTransitioning(false);
  };

  return (
    <TransitionContext.Provider value={{ startTransition, endTransition }}>
      <PageTransition isActive={isTransitioning} />
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};
