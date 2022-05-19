import React, { useState, useEffect } from "react";
import {
  Typography,
  Breadcrumb,
  Row,
  Col,
  notification,
  Card,
  Drawer,
  Spin,
} from "antd";
import Controls from "../controls/Controls";
import { withRouter } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} from "../../api/category";
import EditForm from "../common/EditForm";

const CreateCategory = (props) => {
  const methods = useForm();
  const [categories, setCategories] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editCategory, setEditCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        notification[res.status]({
          message: res.message,
        });
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        notification[err.status]({
          message: err.message,
        });
      });
  }, [methods]);

  const onSubmit = async (data) => {
    if (isEdit) {
      await updateCategory(editCategory._id, data)
        .then((res) => {
          notification[res.status]({
            message: res.message,
          });
          getAllCategories().then((res) => {
            setCategories(res.data);
          });
        })
        .catch((err) => {
          notification[err.status]({
            message: err.message,
          });
        });
      setIsEdit(false);
    } else {
      await createCategory(data)
        .then((res) => {
          notification[res.status]({
            message: res.message,
          });
          getAllCategories().then((res) => {
            setCategories(res.data);
          });
        })
        .catch((err) => {
          notification[err.status]({
            message: err.response.data.message,
          });
        });
    }
  };

  const onDelete = async (id) => {
    await deleteCategory(id)
      .then((res) => {
        notification[res.status]({
          message: res.message,
        });
        getAllCategories().then((res) => {
          setCategories(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
        notification[err.status]({
          message: err.response.data.message,
        });
      });
  };

  const onEdit = (data) => {
    setEditCategory(data);
    setIsEdit(true);
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Create Category</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ margin: "16px 0", backgroundColor: "#fff", padding: 24 }}>
        <Typography.Title level={4}>Create Category</Typography.Title>
        <Typography.Paragraph>
          Create a new category for complaints.
        </Typography.Paragraph>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Row gutter={16}>
              <Col sm={24} md={24} lg={8} style={{ marginBottom: 16 }}>
                <Controls.TextField
                  label="Category Name"
                  name="label"
                  placeholder="Enter category name"
                  rules={{ required: "Category name is required" }}
                  register={methods.register}
                  errorFont={13}
                  error={methods.formState.errors}
                />
              </Col>
              <Col sm={24} md={24} lg={8} style={{ marginBottom: 16 }}>
                <Controls.TextField
                  label="Category Description"
                  name="description"
                  placeholder="Enter category description"
                  rules={{ required: "Category description is required" }}
                  register={methods.register}
                  errorFont={13}
                  error={methods.formState.errors}
                />
              </Col>
              <Col sm={24} md={24} lg={8} style={{ marginBottom: 16 }}>
                <Controls.TextField
                  label="Category value"
                  name="value"
                  placeholder="Enter category value"
                  rules={{ required: "Category value is required" }}
                  register={methods.register}
                  errorFont={13}
                  error={methods.formState.errors}
                />
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={8}>
                <Controls.Button
                  type="submit"
                  text={isEdit ? "Update" : "Create"}
                  style={{ marginTop: "16px" }}
                />
              </Col>
            </Row>
          </form>
        </FormProvider>
        {/* showing all the categories */}
        <Typography.Title level={4} style={{ margin: "16px 0" }}>
          All Categories
        </Typography.Title>
        <Row gutter={16}>
          {loading ? (
            <div style={{ width: "100%", textAlign: "center" }}>
              <Spin />
            </div>
          ) : (
            categories.map((category) => (
              <Col sm={24} md={24} lg={8} style={{ marginBottom: 16 }}>
                <Card
                  title={category.label}
                  bordered={true}
                  //extras for updateing or deleting the category
                  extra={
                    <>
                      <Controls.Button
                        text="Update"
                        style={{ marginRight: "16px" }}
                        type="link"
                        onClick={() => {
                          onEdit(category);
                        }}
                      />
                      <Controls.Button
                        text="Delete"
                        variant="danger"
                        onClick={() => {
                          onDelete(category._id);
                        }}
                      />
                    </>
                  }
                >
                  <Typography.Paragraph>
                    {category.description}
                  </Typography.Paragraph>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
      {isEdit && (
        <Drawer
          title="Update Category"
          width={720}
          onClose={() => {
            setIsEdit(false);
          }}
          visible={isEdit}
        >
          <EditForm data={editCategory} onSubmit={onSubmit} from="category" />
        </Drawer>
      )}
    </>
  );
};

export default withRouter(CreateCategory);
