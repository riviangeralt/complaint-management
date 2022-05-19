import React from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./Sidebar.module.css";
import { logout } from "../../api/login";
import { withRouter, Link } from "react-router-dom";
import { isAuthenticated } from "../../api/auth";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = (props) => {
  return (
    <Sider
      collapsible
      collapsed={props.collapsed}
      onCollapse={props.toggle}
      breakpoint={"sm"}
    >
      <div className={styles.logo} />
      <Menu
        theme="dark"
        defaultSelectedKeys={
          isAuthenticated() && isAuthenticated().user.role === 1 ? ["0"] : ["1"]
        }
        mode="inline"
      >
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <Menu.Item key="0" icon={<PieChartOutlined />}>
            <Link to="/admin">Admin Dashboard</Link>
          </Menu.Item>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 ? (
          <Menu.Item key="2" icon={<FileOutlined />}>
            <Link to="/create">Create Category</Link>
          </Menu.Item>
        ) : (
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/complaint">Create Complaint</Link>
          </Menu.Item>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <>
            <Menu.Item key="3" icon={<TeamOutlined />}>
              <Link to="/manage">Manage Complaints</Link>
            </Menu.Item>
            <Menu.Item key="55" icon={<TeamOutlined />}>
              <Link to="/users">Manage Users</Link>
            </Menu.Item>
          </>
        )}
        <Menu.Item key="9" icon={<UserOutlined />}>
          <Link to="/profile">Profile</Link>
        </Menu.Item>
        {/* Menu Item for Logout */}
        <Menu.Item
          key="10"
          icon={<FileOutlined />}
          onClick={() => logout(() => props.history.push("/login"))}
        >
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default withRouter(Sidebar);
