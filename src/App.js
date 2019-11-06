import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from './screens/Dashboard';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';

import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/">
          <Dashboard />
        </ProtectedRoute>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <ProtectedRoute path="/products">
          <ProductScreen />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
};

export default App;
