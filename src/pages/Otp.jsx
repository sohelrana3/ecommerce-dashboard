import React from "react";
import { Card, Button, Checkbox, Form, Input, Alert } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Otp = () => {
    let { email } = useParams();
    let navigate = useNavigate();
    const onFinish = async (values) => {
        console.log("Success:", values);
        const data = {
            otp: values.otp,
            email: email,
        };
        console.log(data);

        let userdata = await axios.post(
            "http://localhost:8000/api/v1/auth/otpverify",
            data
        );
        console.log(userdata);
        if (userdata.data.success == "Verify") {
            navigate("/login");
        }
        // seterror(userdata.data);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <Card
            title="Otp"
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
                    label="Otp"
                    name="otp"
                    rules={[
                        {
                            required: true,
                            message: "Please input your otp!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Otp;
