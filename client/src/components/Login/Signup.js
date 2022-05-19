import { Form, notification, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm, FormProvider } from "react-hook-form";
import Controls from "../controls/Controls";
import { withRouter, Link } from "react-router-dom";
import { register } from "../../api/login";
import { authenticate } from "../../api/auth";
import styles from "./Login.module.css";
import { useState } from "react";

const Signup = (props) => {
  const methods = useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      let response = await register(values);
      authenticate(response, () => {
        if (response.user.role === 0) {
          props.history.push("/");
        } else {
          props.history.push("/admin");
        }
      });
      notification[response.status]({
        message: response.message,
      });
    } catch (error) {
      notification[error.status]({
        message: error.message,
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onFinish)}
        className={styles.container}
      >
        <Typography.Paragraph>Please signup to continue.</Typography.Paragraph>
        <Form.Item>
          <Controls.TextField
            name="email"
            placeholder="Email"
            rules={{ required: "Email is required" }}
            control={methods.control}
            error={methods.formState.errors}
            register={methods.register}
            errorFont={13}
            prefix={<UserOutlined />}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Controls.TextField
            name="password"
            placeholder="Password"
            type="password"
            rules={{ required: "Password is required" }}
            control={methods.control}
            error={methods.formState.errors}
            register={methods.register}
            errorFont={13}
            prefix={<LockOutlined />}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Controls.TextField
            name="designation"
            placeholder="Designation"
            rules={{ required: "Designation is required" }}
            control={methods.control}
            error={methods.formState.errors}
            register={methods.register}
            errorFont={13}
            prefix={<LockOutlined />}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Controls.TextField
            name="name"
            placeholder="Name"
            rules={{ required: "Name is required" }}
            control={methods.control}
            error={methods.formState.errors}
            register={methods.register}
            errorFont={13}
            prefix={<LockOutlined />}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Controls.Button
            variant="default"
            type="submit"
            size="large"
            text="Register"
            loading={loading}
          />
          <span className={styles.register}>Or</span>
          <Controls.Button
            onClick={() => props.history.push("/login")}
            size="large"
            text="Login"
          />
        </Form.Item>
      </form>
    </FormProvider>
  );
};

export default withRouter(Signup);
