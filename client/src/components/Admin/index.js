import React, { useState, useEffect } from "react";
import { Typography, Breadcrumb, Row, Col, Card } from "antd";
import { getUserCount } from "../../api/userProfile";
import { getComplaintsByStatus } from "../../api/complaints";

const Admin = () => {
  const [userCount, setUserCount] = useState({});
  const [complaintCount, setComplaintCount] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getUserCount(), getComplaintsByStatus()])
      .then(([user, complaint]) => {
        setUserCount(user.data);
        setComplaintCount(complaint.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={2}>Admin Dashboard</Typography.Title>
      <Typography.Paragraph>
        Welcome to the admin dashboard. You can manage your complaints here.
      </Typography.Paragraph>
      <div
        style={{
          margin: "16px 0",
          backgroundColor: "#fff",
          padding: 24,
          minHeight: 360,
        }}
      >
        <Typography.Title level={4}>Complaints</Typography.Title>
        <Row gutter={16}>
          <Col sm={24} md={24} lg={8}>
            <Card
              title="Pending"
              bordered={true}
              extra={<a href="#">More</a>}
              loading={loading}
            >
              <Typography.Paragraph>
                There are <strong>{complaintCount.pending}</strong> pending
                complaints.
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col sm={24} md={24} lg={8}>
            <Card
              title="In Progress"
              bordered={true}
              extra={<a href="#">More</a>}
              loading={loading}
            >
              <Typography.Paragraph>
                There are <strong>{complaintCount.inProgress}</strong>{" "}
                complaints in progress.
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col sm={24} md={24} lg={8}>
            <Card
              title="Completed"
              bordered={true}
              extra={<a href="#">More</a>}
              loading={loading}
            >
              <Typography.Paragraph>
                There are <strong>{complaintCount.resolved}</strong> completed
                complaints.
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>
        {/* notification for new user registration */}
        <Typography.Title level={4} style={{ margin: "16px 0" }}>
          New User Registration
        </Typography.Title>
        <Row gutter={16}>
          <Col sm={24} md={24} lg={8}>
            <Card
              title="Today"
              bordered={true}
              extra={<a href="#">More</a>}
              loading={loading}
            >
              <Typography.Paragraph>
                There are <strong>{userCount?.todayCount}</strong> new users
                registered today.
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col sm={24} md={24} lg={8}>
            <Card
              title="This Week"
              bordered={true}
              extra={<a href="#">More</a>}
              loading={loading}
            >
              <Typography.Paragraph>
                There are <strong>{userCount?.thisWeekCount}</strong> new
                registrations this week.
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col sm={24} md={24} lg={8}>
            <Card
              title="This Month"
              bordered={true}
              extra={<a href="#">More</a>}
              loading={loading}
            >
              <Typography.Paragraph>
                There are <strong>{userCount?.thisMonthCount}</strong> new
                registrations this month.
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Admin;
