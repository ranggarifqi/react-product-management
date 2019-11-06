import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
  const isAuthenticated = false;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;