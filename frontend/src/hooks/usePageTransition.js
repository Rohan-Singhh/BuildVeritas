import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransition } from '../context/TransitionContext';

export const usePageTransition = () => {
  const navigate = useNavigate();
  const { startTransition, endTransition } = useTransition();

  const navigateWithTransition = useCallback((to) => {
    startTransition();
    
    // Wait for side panels to slide in
    setTimeout(() => {
      // Navigate after panels are in
      navigate(to);
      
      // Keep transition visible briefly after navigation
      setTimeout(() => {
        endTransition();
      }, 800); // Slightly longer to ensure smooth exit
    }, 300); // Shorter initial delay for snappier response
  }, [navigate, startTransition, endTransition]);

  return {
    navigateWithTransition
  };
};