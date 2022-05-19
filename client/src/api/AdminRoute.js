//this route is for admin users only
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./auth";

const AdminRoute = ({ component: Component, ...rest }) => {
  return isAuthenticated() && isAuthenticated().user.role === 1 ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/login" from={{ pathname: "/" }} />
  );
};

export default AdminRoute;
