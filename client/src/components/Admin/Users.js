import React, { useEffect, useState } from "react";
import {
  Typography,
  Breadcrumb,
  Row,
  notification,
  Card,
  Tag,
  Drawer,
  Avatar,
  Spin,
} from "antd";
import { allUsers, updateUserProfileByAdmin } from "../../api/userProfile";
import Controls from "../controls/Controls";
import EditForm from "../common/EditForm";
import { roles } from "../common/common";

const Users = (props) => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    allUsers()
      .then((res) => {
        setLoading(false);
        setUsers(res.data.users);
        notification[res.status]({
          message: res.message,
        });
      })
      .catch((err) =>
        notification[err.status]({
          message: err.message,
        })
      );
  }, []);
  const onSubmit = async (data) => {
    try {
      await updateUserProfileByAdmin(user._id, data).then((res) => {
        notification[res.status]({
          message: res.message,
        });
        setVisible(false);
        allUsers()
          .then((res) => {
            setUsers(res.data.users);
          })
          .catch((err) =>
            notification[err.status]({
              message: err.message,
            })
          );
      });
    } catch (err) {
      notification[err.status]({
        message: err.message,
      });
    }
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ margin: "16px 0", backgroundColor: "#fff", padding: 24 }}>
        <Typography.Title level={4}>Manage Users</Typography.Title>
        <Typography.Paragraph>
          You can manage all your users here.
        </Typography.Paragraph>
        {loading ? (
          <div style={{ width: "100%", textAlign: "center" }}>
            <Spin />
          </div>
        ) : (
          users?.map((item) => {
            return (
              <Row style={{ marginBottom: 16 }}>
                <Card
                  style={{ width: "100%" }}
                  actions={[
                    <Tag color={item.role === 1 ? "green" : "red"}>
                      {item.role === 1 ? "Admin" : "User"}
                    </Tag>,
                    <Controls.Button
                      text="Update"
                      onClick={() => {
                        setUser(item);
                        setVisible(true);
                      }}
                    />,
                  ]}
                >
                  <Card.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor:
                            "#" +
                            (((1 << 24) * Math.random()) | 0).toString(16),
                        }}
                      >
                        {item?.name.includes(" ")
                          ? item?.name.split(" ")[0].charAt(0) +
                            item?.name.split(" ")[1].charAt(0)
                          : item.name.charAt(0)}
                      </Avatar>
                    }
                    title={item.name}
                    description={item.designation}
                  />
                </Card>
              </Row>
            );
          })
        )}
      </div>
      <Drawer
        title="Update User"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <EditForm data={user} from="user" onSubmit={onSubmit} options={roles} />
      </Drawer>
    </>
  );
};

export default Users;
