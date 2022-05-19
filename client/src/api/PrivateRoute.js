//this route is for authenticated users only
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "./auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return isAuthenticated() ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
