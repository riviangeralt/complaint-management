import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { getSingleComplaint } from "../../api/complaints";
import { Breadcrumb, Typography, Tag, notification, Spin } from "antd";
import moment from "moment";

const Complaint = (props) => {
  const [complaint, setComplaint] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getSingleComplaint(props?.match?.params?.id)
      .then((res) => {
        notification[res.status]({
          message: "Complaint fetched successfully",
        });
        setLoading(false);
        setComplaint(res.data);
      })
      .catch((err) => {
        notification[err.status]({
          message: "Error fetching complaint",
        });
      });
  }, []);

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Complaints</Breadcrumb.Item>
        <Breadcrumb.Item>{complaint?.title}</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
        {loading ? (
          <div
            style={{
              width: "100%",
              height: 312,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin />
          </div>
        ) : (
          <>
            <Typography.Title level={3}>{complaint?.title}</Typography.Title>
            <Typography.Paragraph>
              {complaint?.description}
            </Typography.Paragraph>
            <Typography.Paragraph>
              Status: <Tag color="#f50">{complaint?.status}</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
              Category: <Tag color="#f50">{complaint?.category}</Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
              Created at : {moment(complaint?.createdAt).format("DD-MM-YYYY")}
            </Typography.Paragraph>
            <Typography.Paragraph>
              Updated at : {moment(complaint?.updatedAt).format("DD-MM-YYYY")}
            </Typography.Paragraph>
            <Typography.Paragraph>
              Remarks : {complaint?.remarks ? complaint?.remarks : "No remarks"}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Link to="/">Back to home</Link>
            </Typography.Paragraph>
          </>
        )}
      </div>
    </>
  );
};

export default withRouter(Complaint);
