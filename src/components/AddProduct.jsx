import React, { useEffect, useState } from "react";
import {
    Button,
    Checkbox,
    Form,
    Input,
    Card,
    Col,
    Row,
    Select,
    Alert,
    Space,
} from "antd";
import axios from "axios";

const AddProduct = () => {
    let [varinatvalue, setVarinatvalue] = useState([]);
    let [checkSize, setCheckSize] = useState("");
    let [value, setValue] = useState("");
    let [valuestock, setValueStock] = useState("");
    let [data, setdata] = useState("");
    let [storelist, setStorelist] = useState([]);
    let [images, setimages] = useState({});
    let [imagePrev, setImagePrev] = useState("");
    const onFinishMain = async (values) => {
        console.log(values);
        let data = await axios.post(
            "http://localhost:8000/api/v1/product/createProduct",
            {
                name: values.name,
                description: values.description,
                images: images,
                variant: varinatvalue,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        setdata(data.data.success);
        console.log(data.data);
    };

    // const onFinish = (values) => {
    //     let arr = [...varinatvalue];

    //     if (values.variantname.toLowerCase() == "size") {
    //         setCheckSize("size");
    //     }
    //     arr.push({
    //         name: values.variantname,
    //         value: [],
    //     });
    //     if (arr.length <= 2) {
    //         setVarinatvalue(arr);
    //     } else {
    //         console.log("Bas r na");
    //     }
    // };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    // const handleVariantValue = (index) => {
    //     varinatvalue[index].value.push({
    //         name: value,
    //         stock: valuestock,
    //     });
    //     let arr = [...varinatvalue];
    //     console.log(arr);
    //     setVarinatvalue(arr);
    // };

    // let handleDelete = (index) => {
    //     console.log(index);
    //     let arr = [...varinatvalue];
    //     arr.splice(index, 1);
    //     setVarinatvalue(arr);
    // };

    // let handleValueDelete = (mainid, id) => {
    //     console.log(mainid, id);
    //     let arr = [...varinatvalue];
    //     console.log(arr[mainid].value);
    //     arr[mainid].value.splice(id, 1);
    //     setValue(arr);
    // };

    // handleChange
    let handleChange = (e) => {
        setimages(e.target.files[0]);
        setImagePrev(URL.createObjectURL(e.target.files[0]));
        console.log(e.target.files[0]);
    };

    useEffect(() => {
        async function getData() {
            let data = await axios.get(
                "http://localhost:8000/api/v1/product/allStore/65b5bbd0eeb07cf9112bdd80"
            );

            setStorelist(data.data);
        }
        getData();
    }, []);

    return (
        <>
            {data && (
                <Space
                    direction="vertical"
                    style={{
                        width: "44%",
                        marginLeft: "330px",
                        marginBottom: "20px",
                    }}
                >
                    <Alert message={data} type="success" showIcon />
                </Space>
            )}

            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 1000,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinishMain}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your product name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Please input your description!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <div>
                    <input onChange={handleChange} type="file" />
                    <img style={{ width: "120px" }} src={imagePrev} />
                </div>

                <Form.Item
                    label="Brand Name"
                    name="brandname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your brand name!",
                        },
                    ]}
                >
                    <Select>
                        {storelist.map((item) => (
                            <Select.Option key={item._id} value={item._id}>
                                {item.storename}
                            </Select.Option>
                        ))}
                    </Select>
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

            {/* <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 1000,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Variant Name"
                    name="variantname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your variant!",
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
                        Add Variant
                    </Button>
                </Form.Item>
                <Row>
                    {varinatvalue.length > 0 &&
                        varinatvalue.map((item, index) => (
                            <Col span={8}>
                                <Card style={{ width: 300 }}>
                                    <>
                                        <Button
                                            onClick={() => handleDelete(index)}
                                        >
                                            Delete
                                        </Button>
                                        <p>
                                            <b>{item.name}</b>
                                        </p>
                                        <input
                                            placeholder="value name"
                                            onChange={(e) =>
                                                setValue(e.target.value)
                                            }
                                        />
                                        {item.name == "size" &&
                                        varinatvalue.length == 1 ? (
                                            <input
                                                placeholder="Sotck"
                                                onChange={(e) =>
                                                    setValueStock(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            item.name == "color" &&
                                            varinatvalue.length != 1 && (
                                                <input
                                                    placeholder="Sotck"
                                                    onChange={(e) =>
                                                        setValueStock(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            )
                                        )}
                                        <Button
                                            onClick={() =>
                                                handleVariantValue(index)
                                            }
                                        >
                                            Add
                                        </Button>
                                        {item.value.map((i, id) => (
                                            <>
                                                <p>{i.name}</p>
                                                <p>{i.stock}</p>
                                                <Button
                                                    danger
                                                    onClick={() =>
                                                        handleValueDelete(
                                                            index,
                                                            id
                                                        )
                                                    }
                                                >
                                                    delete
                                                </Button>
                                            </>
                                        ))}
                                    </>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Form> */}
        </>
    );
};

export default AddProduct;
