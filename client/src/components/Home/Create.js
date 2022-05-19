import React, { useEffect, useState } from "react";
import { Breadcrumb, Typography, Row, Col, notification } from "antd";
import Controls from "../../components/controls/Controls";
import { useForm, FormProvider } from "react-hook-form";
import { getAllCategories } from "../../api/category";
import { createComplaint } from "../../api/complaints";

const Create = () => {
  const methods = useForm();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onFinish = async (values) => {
    try {
      let response = await createComplaint(values);
      notification[response.status]({
        message: response.message,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Complaints</Breadcrumb.Item>
        <Breadcrumb.Item>Create</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
        <Typography.Title level={3}>Create Complaint</Typography.Title>
        <Typography.Paragraph>Create a new complaint</Typography.Paragraph>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onFinish)}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Controls.TextField
                  name="title"
                  placeholder="Title"
                  control={methods.control}
                  register={methods.register}
                  rules={{ required: "Title is required" }}
                  errorFont={13}
                  error={methods.formState.errors}
                />
              </Col>
              <Col span={12}>
                <Controls.TextField
                  name="description"
                  placeholder="Description"
                  control={methods.control}
                  register={methods.register}
                  rules={{ required: "Description is required" }}
                  errorFont={13}
                  error={methods.formState.errors}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Controls.CustomSelect
                  name="category"
                  placeholder="Category"
                  control={methods.control}
                  register={methods.register}
                  rules={{ required: "Category is required" }}
                  errorFont={13}
                  error={methods.formState.errors}
                  options={categories?.length ? categories : []}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Controls.Button type="submit" text="Create" />
              </Col>
            </Row>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default Create;
