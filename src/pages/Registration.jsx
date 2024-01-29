import React from "react";
import { Card, Button, Checkbox, Form, Input, Alert } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Registration = () => {
    let [error, seterror] = useState({});
    let navigate = useNavigate();
    const onFinish = async (values) => {
        console.log("Success:", values);
        const data = {
            username: values.username,
            email: values.email,
            password: values.password,
        };
        let userdata = await axios.post(
            "http://localhost:8000/api/v1/auth/registration",
            data
        );
        seterror(userdata.data);
        navigate(`/otp/${userdata.data.email}`);
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
            {error.error && <p style={{ color: "red" }}>{error.error}</p>}

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
                    label="username"
                    name="username"
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
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Sing Up
                    </Button>
                </Form.Item>
            </Form>
            <p>
                Have an account?
                <span>
                    <Link to="/login">Sign in</Link>
                </span>
            </p>
        </Card>
    );
};

export default Registration;
