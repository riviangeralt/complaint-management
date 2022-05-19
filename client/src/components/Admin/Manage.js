import React, { useState, useEffect } from "react";
import {
  Typography,
  Breadcrumb,
  Row,
  Col,
  notification,
  Card,
  Tag,
  Spin,
  Drawer,
} from "antd";
import { manageComplaint, updateComplaint } from "../../api/complaints";
import Controls from "../controls/Controls";
import EditForm from "../common/EditForm";
import { status } from "../common/common";

const Manage = () => {
  const [complaints, setComplaints] = useState([]);
  const [open, setOpen] = useState(false);
  const [complaint, setComplaint] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    manageComplaint()
      .then((res) => {
        notification[res.status]({
          message: res.message,
        });
        setComplaints(res.data);
        setLoading(false);
      })
      .catch((err) =>
        notification[err.status]({
          message: err.message,
        })
      );
  }, []);

  const onUpdate = async (data) => {
    setComplaint(data);
    setOpen(true);
  };
  const onSubmit = async (data) => {
    await updateComplaint(complaint._id, data)
      .then((res) => {
        notification[res.status]({
          message: res.message,
        });
        manageComplaint().then((res) => {
          notification[res.status]({
            message: res.message,
          });
          setComplaints(res.data);
        });
        setOpen(false);
      })
      .catch((err) =>
        notification[err.status]({
          message: err.message,
        })
      );
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Manage</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ margin: "16px 0", backgroundColor: "#fff", padding: 24 }}>
        <Typography.Title level={4}>Manage Complaints</Typography.Title>
        <Typography.Paragraph>
          You can manage all your complaints here.
        </Typography.Paragraph>
        <Row gutter={16}>
          {loading ? (
            <div style={{ width: "100%", textAlign: "center" }}>
              <Spin />
            </div>
          ) : (
            complaints?.complaints?.map((complaint) => {
              return (
                <Col sm={24} md={24} lg={8} style={{ marginBottom: 16 }}>
                  <Card
                    title={complaint.title}
                    bordered={true}
                    actions={[
                      <Controls.Button
                        text="Update"
                        onClick={() => {
                          onUpdate(complaint);
                        }}
                      />,
                      <Controls.Button text="Delete" variant="danger" />,
                    ]}
                  >
                    <Typography.Paragraph>
                      {complaint.description}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      <Tag color="orange">{complaint.status}</Tag>
                      <Tag color="orange">{complaint.type}</Tag>
                      <Tag color="orange">{complaint.category}</Tag>
                    </Typography.Paragraph>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </div>
      {open && (
        <Drawer
          title="Update Complaint"
          width={720}
          onClose={() => {
            setOpen(false);
          }}
          visible={open}
        >
          <EditForm
            data={complaint}
            options={status}
            onSubmit={onSubmit}
            from="complaint"
          />
        </Drawer>
      )}
    </>
  );
};

export default Manage;
