import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const AddCaragory = () => {
    const notifysuccess = (message) => toast.success(message);
    let user = useSelector((state) => state.userData.value);
    let [value, setvalue] = useState("");
    const onFinish = async (values) => {
        let res = await axios.post(
            "http://localhost:8000/api/v1/product/catagory",
            {
                name: values.categoryname,
                ownerId: user._id,
            }
        );
  

        notifysuccess(values.categoryname + " " + res.data.success);
    };
    return (
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
            autoComplete="off"
        >
            <Form.Item
                label="Category Name"
                name="categoryname"
                rules={[
                    {
                        required: true,
                        message: "Please input your category name!",
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
    );
};

export default AddCaragory;
