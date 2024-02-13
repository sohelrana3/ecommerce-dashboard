import React, { useEffect, useState } from "react";
import { Form, Input, Button, Space, Table, Modal } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const ViewCatagory = () => {
    let [data, setData] = useState([]);
    let [loading,setLoading] = useState("")
    let userdata = useSelector((state) => state.userData.value);
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
                            Edit{" "}
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
                            {" "}
                            {record.active == "Approved"
                                ? "Hold"
                                : "Approve"}{" "}
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
                arr.push({
                    key: item._id,
                    name: item.name,
                    active: item.isActive ? "Approved" : "Pending",
                });
            });

            setData(arr);
        }
        viewAllCatagory();
    }, []);

    return (
        <>
            <h1>Categories {data.length}</h1>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default ViewCatagory;
