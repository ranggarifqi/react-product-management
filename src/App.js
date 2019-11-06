import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";

import Dashboard from "./screens/Dashboard";
import LoginScreen from "./screens/LoginScreen";
import ProductScreen from "./screens/ProductScreen";

import LoginRoute from "./components/LoginRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import ProductStore from "./stores/product.store";

const App = () => {
  return (
    <Provider
      productStore={new ProductStore()}
    >
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
    </Provider>
  );
};

export default App;
