import React, { useEffect, useState } from "react";
import { Form, Input, Button, Space, Table, Modal } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const ViewCatagory = () => {
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState("");
    let userdata = useSelector((state) => state.userData.value);
    let [loadData, setLoadData] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editid, setEditId] = useState(false);

    // modal
    const showModal = (id) => {
        setIsModalOpen(true);
        setEditId(id);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // onFinishModal

    const onFinishModal = async (values) => {
        console.log("Success Modal:", values, editid);
        let data = await axios.post(
            "http://localhost:8000/api/v1/product/editcatagory",
            {
                name: values.categoryname,
                id: editid,
            }
        );
        setLoadData(!loadData);
        setIsModalOpen(false);
        console.log(data);
    };

    // handleapprove
    let handleapprove = async (item) => {
        // active catagory
        if (item.active == "Pending") {
            let res = await axios.post(
                "http://localhost:8000/api/v1/product/approvecatagory",
                {
                    isActive: true,
                    id: item.key,
                }
            );
            setLoadData(!loadData);

            return console.log(res);
        }

        // Dactive catagory
        if (item.active == "Approved") {
            let res = await axios.post(
                "http://localhost:8000/api/v1/product/approvecatagory",
                {
                    isActive: false,
                    id: item.key,
                }
            );
            setLoadData(!loadData);

            return console.log(res);
        }
    };
    // handleDelete button
    let handleDelete = async (id) => {
        let data = await axios.post(
            "http://localhost:8000/api/v1/product/deletcatagory",
            { id: id }
        );
        setLoadData(!loadData);

        console.log(data);
    };
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Active",
            dataIndex: "active",
            key: "active",
        },

        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {userdata.role == "Merchant" && (
                        <Button
                            type="primary"
                            onClick={() => showModal(record.key)}
                        >
                            Edit
                        </Button>
                    )}
                    <Button
                        onClick={() => handleDelete(record.key)}
                        loading={loading == record.key ? true : false}
                    >
                        Delete
                    </Button>
                    {userdata.role == "Admin" && (
                        <Button
                            onClick={() => handleapprove(record)}
                            loading={loading == record.key ? true : false}
                        >
                            {record.active == "Approved" ? "Hold" : "Approve"}
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    useEffect(() => {
        let arr = [];
        async function viewAllCatagory() {
            let data = await axios.get(
                "http://localhost:8000/api/v1/product/allcatagory"
            );
            data.data.map((item) => {
                console.log(item);
                arr.push({
                    key: item._id,
                    name: item.name,
                    active: item.isActive ? "Approved" : "Pending",
                });
            });

            setData(arr);
            console.log(arr);
        }
        viewAllCatagory();
    }, [loadData]);

    return (
        <>
            <h1>Categories {data.length}</h1>
            <Table columns={columns} dataSource={data} />
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
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
                    onFinish={onFinishModal}
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
            </Modal>
        </>
    );
};

export default ViewCatagory;
