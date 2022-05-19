import React, { useEffect, useState } from "react";
import { Card, Typography, notification, Tag, Spin } from "antd";
import { withRouter, Link } from "react-router-dom";
import { getAllComplaints } from "../../api/complaints";
import Controls from "../controls/Controls";
import { useForm, FormProvider } from "react-hook-form";

const Home = (props) => {
  const methods = useForm();
  const [user, setUser] = useState({});
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  //create a search function
  const search = (search) => {
    if (search === "" || search === undefined) {
      getAllComplaints()
        .then((response) => {
          setComplaints(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let filtered = complaints.filter((complaint) => {
        return complaint.title.toLowerCase().includes(search.toLowerCase());
      });
      setComplaints(search.length === 0 ? complaints : filtered);
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("jwt")).user);
    getAllComplaints()
      .then((res) => {
        notification[res.status]({
          message: "Complaints fetched successfully",
        });
        setLoading(false);
        setComplaints(res.data);
      })
      .catch((err) => {
        notification[err.status]({
          message: err.message,
        });
      });
  }, []);
  return (
    <>
      <Typography.Title level={3}>
        Welcome {user.name?.trim()}!
      </Typography.Title>
      <Typography.Paragraph
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        You have {complaints?.length} complaints
        <FormProvider {...methods}>
          <Controls.TextField
            name="search"
            placeholder="Search"
            control={methods.control}
            register={methods.register}
            rules={{ required: false }}
            errorFont={13}
            error={methods.formState.errors}
            onChange={(e) => search(e.target.value)}
            style={{ flex: 0.5 }}
          />
        </FormProvider>
      </Typography.Paragraph>
      {loading ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <Spin />
        </div>
      ) : (
        complaints?.map((complaint) => {
          return (
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title={complaint.title}
              loading={complaints?.length === 0}
              key={complaint._id}
              extra={
                <>
                  <Tag color="#f50">{complaint.status}</Tag>
                  <Tag
                    color="#2db7f5"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      props.history.push(`/complaint/${complaint._id}`)
                    }
                  >
                    View
                  </Tag>
                </>
              }
            >
              <Typography.Paragraph style={{ margin: 0 }}>
                {complaint.description}
              </Typography.Paragraph>
            </Card>
          );
        })
      )}
    </>
  );
};

export default withRouter(Home);
