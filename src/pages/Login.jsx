import React from "react";
import { Card, Button, Checkbox, Form, Input, Alert } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
    const onFinish = async (values) => {
        console.log("Success:", values);
        let data = {
            email: values.email,
            password: values.password,
        };
        let userdata = await axios.post(
            "http://localhost:8000/api/v1/auth/login",
            data
        );


        console.log(userdata.data);

    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <Card
            title="Registration"
            bordered={false}
            style={{
                width: 300,
            }}
        >
            {/* -----------from start----------- */}
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Login;
