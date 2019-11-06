import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from './screens/Dashboard';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route path="/products">
          <ProductScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
