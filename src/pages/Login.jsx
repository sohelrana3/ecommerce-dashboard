import React from "react";
import { Card, Button, Checkbox, Form, Input, Alert } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    let navigate = useNavigate();
    const notifyerror = (message) => toast.error(message);
    const notifysuccess = (message) => toast.success(message);
    const onFinish = async (values) => {
        let data = {
            email: values.email,
            password: values.password,
        };
        let userdata = await axios.post(
            "http://localhost:8000/api/v1/auth/login",
            data
        );
        // login data verify
        if (userdata.data.role == "Admin") {
            navigate("/home");
            console.log(userdata);
            notifysuccess("Login Successfull");
        } else {
            if (userdata.data.role == "User") {
                notifyerror(
                    "You do not have permission for login Please Update role "
                );
            }
        }
        notifyerror(userdata.data.error);
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
            <p>
                <Link to="/forgotpassword">Forgotpassword</Link>
            </p>
        </Card>
    );
};

export default Login;
