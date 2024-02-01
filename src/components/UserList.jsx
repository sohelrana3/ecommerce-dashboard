import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";

const UserList = () => {
    let [userlist, setuserlist] = useState([]);
    

    const columns = [
        {
            title: "name",
            dataIndex: "username",
          
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.name.startsWith(value),
            width: "30%",
        },
        {
            title: "Email",
            filters: [
                {
                    text: "Joe",
                    value: "Joe",
                },
                {
                    text: "Category 1",
                    value: "Category 1",
                },
                {
                    text: "Category 2",
                    value: "Category 2",
                },
            ],
            filterMode: "tree",
            filterSearch: true,
            dataIndex: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            filters: [
                {
                    text: "London",
                    value: "London",
                },
                {
                    text: "New York",
                    value: "New York",
                },
            ],
            onFilter: (value, record) => record.address.startsWith(value),
            filterSearch: true,
            width: "40%",
        },
    ];

    useEffect(() => {
        async function user() {
            let username = [];
            let userdata = await axios.get(
                "http://localhost:8000/api/v1/auth/alluser"
            );
            setuserlist(userdata.data);
          
        }
        user();
    }, []);
    return <Table columns={columns} dataSource={userlist} />;
};

export default UserList;
