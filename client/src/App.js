import React, { useState } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { Layout, Typography } from "antd";

import Sidebar from "./components/common/Sidebar";
import Home from "./components/Home/index";
import Complaint from "./components/Home/Complaint";
import Admin from "./components/Admin";

import Login from "./components/Login";
import Signup from "./components/Login/Signup";
import PrivateRoute from "./api/PrivateRoute";

import { isAuthenticated } from "./api/auth";
import AdminRoute from "./api/AdminRoute";
import Create from "./components/Home/Create";
import Profile from "./components/Profile";
import CreateCategory from "./components/Admin/CreateCategory";
import Manage from "./components/Admin/Manage";
import Users from "./components/Admin/Users";

const { Header, Content, Footer } = Layout;

const App = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isAuthenticated() && (
        <Sidebar collapsed={collapsed} toggle={() => toggle()} />
      )}
      <Layout>
        {isAuthenticated() && (
          <Header style={{ padding: 0 }}>
            <Typography.Title
              level={3}
              style={{
                height: "100%",
                color: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Complaint Management System
            </Typography.Title>
          </Header>
        )}
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Switch>
              {!isAuthenticated() && <Route path="/login" component={Login} />}
              {!isAuthenticated() && (
                <Route path="/signup" component={Signup} />
              )}
              <AdminRoute path="/users" component={Users} />
              <AdminRoute path="/manage" component={Manage} />
              <AdminRoute path="/admin" component={Admin} />
              <AdminRoute path="/create" component={CreateCategory} />
              <PrivateRoute path="/complaint/:id" component={Complaint} />
              <PrivateRoute path="/complaint" component={Create} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/" component={Home} />

              {/* <Route exact path="*" render={() => <h1>404 Not Found</h1>} /> */}
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Complaint Management System ©2022 Created by Aasim Sayyed
        </Footer>
      </Layout>
    </Layout>
  );
};

export default withRouter(App);
