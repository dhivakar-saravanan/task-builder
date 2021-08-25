import React, { useEffect } from "react";
import { Form, Input, Button, Space } from "antd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import IUser from "../interfaces/user";
import "../styles/login.css";

const Login: React.FunctionComponent = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = async (values: IUser) => {
    const response = await fetch("https://reqres.in/api/users/2", {
      method: "GET",
    });
    const userDetail = await response.json();
    if (
      userDetail.data.first_name === values.username &&
      userDetail.data.last_name === values.password
    ) {
      dispatch({ type: "USER_LOGIN", payload: userDetail });
    }
  };

  return (
    <div>
      <Space direction="vertical" size="small" className="login-component">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

export default Login;
