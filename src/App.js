import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";

import Dashboard from "./screens/Dashboard";
import LoginScreen from "./screens/LoginScreen";
import ProductScreen from "./screens/ProductScreen";

import LoginRoute from "./components/LoginRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import ProductStore from "./stores/product.store";
import ProductAddScreen from "./screens/ProductAddScreen";

const App = () => {
  return (
    <Provider productStore={new ProductStore()}>
      <Router>
        <Switch>
          <ProtectedRoute exact path="/">
            <Dashboard />
          </ProtectedRoute>
          <LoginRoute path="/login">
            <LoginScreen />
          </LoginRoute>

          <ProtectedRoute exact path="/products" component={ProductScreen} />
          <ProtectedRoute exact path="/products/add" component={ProductAddScreen} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
