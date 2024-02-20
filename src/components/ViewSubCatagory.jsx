import React, { useState, useEffect } from "react";
import { Form, Input, Button, Space, Table, Modal } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

const ViewSubCatagory = () => {
    let [data, setdata] = useState([]);
    let [loading, setLoading] = useState("");
    let userdata = useSelector((state) => state.userData.value);

    // columns
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

    //
    useEffect(() => {
        let arr = [];
        async function viewSubAllCatagory() {
            let data = await axios.get(
                "http://localhost:8000/api/v1/product/allSubcatagory"
            );
            data.data.map((item) => {
                arr.push({
                    key: item._id,
                    name: item.name,
                    active: item.isActive ? "Approved" : "Pending",
                });
            });

            console.log(arr);
            setdata(arr);
        }
        viewSubAllCatagory();
    }, []);

    return (
        <>
            {/* <h1>Categories {data.length}</h1> */}
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default ViewSubCatagory;
