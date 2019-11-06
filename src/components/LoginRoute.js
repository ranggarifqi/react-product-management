import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const checkIsAuthenticated = () => {
  // cek di local storage apakah ada key `token`
  const token = localStorage.getItem('token');
  if (!token) {
    return true;
  }
  return false;
}

const LoginRoute = ({ children, ...rest }) => {
  const isNotAuthenticated = checkIsAuthenticated();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isNotAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default LoginRoute;