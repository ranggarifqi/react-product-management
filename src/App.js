import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";

import Dashboard from './screens/Dashboard';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';

import LoginRoute from './components/LoginRoute';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/">
          <Dashboard />
        </ProtectedRoute>
        <LoginRoute path="/login">
          <LoginScreen />
        </LoginRoute>
        <ProtectedRoute path="/products">
          <ProductScreen />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
};

export default App;
