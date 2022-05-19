import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Breadcrumb, Typography, Row, Col, notification, Spin } from "antd";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../../api/userProfile";
import Controls from "../controls/Controls";
import { useForm, FormProvider } from "react-hook-form";
import { logout } from "../../api/login";

const Profile = (props) => {
  const [user, setUser] = useState({});
  const methods = useForm();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserProfile()
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [methods, loading]);
  const handleSubmit = (data) => {
    updateUserProfile(data).then((res) => {
      notification[res.status]({
        message: res.message,
      });
      setUser(res.data);
    });
  };
  const handleDelete = () => {
    deleteUserProfile().then((res) => {
      logout(() => props.history.push("/login"));
      notification[res.status]({
        message: res.message,
      });
    });
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
        <Typography.Title level={3}>
          {JSON.parse(localStorage.getItem("jwt"))?.user?.name}'s Profile
        </Typography.Title>
        {!loading ? (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <Row gutter={[16, 16]}>
                <Col sm={24} md={24} lg={12}>
                  <Controls.TextField
                    name="name"
                    placeholder="Name"
                    control={methods.control}
                    register={methods.register}
                    rules={{ required: "Name is required" }}
                    defaultValue={user.name}
                    errorFont={13}
                    error={methods.formState.errors}
                  />
                </Col>
                <Col sm={24} md={24} lg={12}>
                  <Controls.TextField
                    name="email"
                    placeholder="Email"
                    control={methods.control}
                    register={methods.register}
                    rules={{ required: "Email is required" }}
                    defaultValue={user.email}
                    errorFont={13}
                    error={methods.formState.errors}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                <Col sm={24} md={24} lg={12}>
                  <Controls.TextField
                    name="phone"
                    placeholder="Phone"
                    control={methods.control}
                    register={methods.register}
                    rules={{ required: "Phone is required" }}
                    defaultValue={user.phone}
                    errorFont={13}
                    error={methods.formState.errors}
                  />
                </Col>
                <Col sm={24} md={24} lg={12}>
                  <Controls.TextField
                    name="address"
                    placeholder="Address"
                    control={methods.control}
                    register={methods.register}
                    rules={{ required: "Address is required" }}
                    defaultValue={user?.address}
                    errorFont={13}
                    error={methods.formState.errors}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                <Col sm={24} md={24} lg={12}>
                  <Controls.TextField
                    name="city"
                    placeholder="City"
                    control={methods.control}
                    register={methods.register}
                    rules={{ required: "City is required" }}
                    defaultValue={user.city}
                    errorFont={13}
                    error={methods.formState.errors}
                  />
                </Col>
                <Col sm={24} md={24} lg={12}>
                  <Controls.TextField
                    name="country"
                    placeholder="Country"
                    control={methods.control}
                    register={methods.register}
                    rules={{ required: "Country is required" }}
                    defaultValue={user.country}
                    errorFont={13}
                    error={methods.formState.errors}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                <Col sm={24} md={24} lg={12}>
                  <Controls.TextField
                    name="designation"
                    placeholder="Designation"
                    control={methods.control}
                    register={methods.register}
                    rules={{ required: "Designation is required" }}
                    defaultValue={user.designation}
                    errorFont={13}
                    error={methods.formState.errors}
                  />
                </Col>
                <Col sm={24} md={24} lg={12}>
                  <Controls.TextField
                    name="age"
                    placeholder="Age"
                    control={methods.control}
                    register={methods.register}
                    rules={{ required: "Age is required" }}
                    defaultValue={user.age}
                    errorFont={13}
                    error={methods.formState.errors}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                <Col sm={24} md={24} lg={12}>
                  <Controls.Button
                    type="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    Save
                  </Controls.Button>
                </Col>
                <Col sm={24} md={24} lg={12}>
                  <Controls.Button
                    type="danger"
                    onClick={handleDelete}
                    loading={loading}
                    disabled={loading}
                  >
                    Delete
                  </Controls.Button>
                </Col>
              </Row>
            </form>
          </FormProvider>
        ) : (
          <>
            <Spin size="large" />
          </>
        )}
      </div>
    </>
  );
};

export default withRouter(Profile);
