import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('TMDb-Key') !== null;
  const location = useLocation();

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};

export default PrivateRoute;
321