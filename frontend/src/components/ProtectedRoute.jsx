import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAuth = isAuthenticated();
  console.log('ProtectedRoute check:', {
    isAuthenticated: isAuth,
    hasUser: !!user,
    userDetails: user,
    token: localStorage.getItem('token')
  });

  if (!isAuth || !user) {
    console.log('Access denied:', {
      reason: !isAuth ? 'Not authenticated' : 'No user data',
      redirecting: true
    });
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
