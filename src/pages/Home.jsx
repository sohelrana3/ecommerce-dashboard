import React from "react";
import { Col, Row, Menu } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const Home = () => {
    const navigation = useNavigate();
    const items = [
        getItem("Deshboard", "sub1", <MailOutlined />, [
            getItem("Merchant", "/home"),
            getItem("Users", "/home/userlist"),
        ]),
        getItem("Product", "sub2", <AppstoreOutlined />, [
            getItem("Category", "sub3", null, [
                getItem("Add Category", "/home/addcatagory"),
                getItem("View Category", "/home/viewcatagory"),
            ]),
            getItem("Sub Category", "sub4", null, [
                getItem("Add Sub Category", "/home/addsubcatagory"),
                getItem("View Sub Category", "/home/viewsubcatagory"),
            ]),
            getItem("Product", "sub5", null, [
                getItem("Add Product", "/home/addproduct"),
                getItem("View Product", "8"),
            ]),
        ]),
        getItem("Discount", "sub6", <SettingOutlined />, [
            getItem("Add Discount", "9"),
            getItem("View Discount", "10"),
        ]),
    ];

    const onClick = (e) => {
        // console.log("click ", e.key);
        navigation(e.key);
    };
    return (
        <Row>
            <Col span={5}>
                <Menu
                    onClick={onClick}
                    style={{
                        width: 256,
                    }}
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    items={items}
                />
            </Col>
            <Col span={19}>
                <Outlet />
            </Col>
        </Row>
    );
};

export default Home;
