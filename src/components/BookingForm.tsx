import { Button, DatePicker, Form, Input, InputNumber, Select, Space, TimePicker } from "antd";
import React from "react";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const initialValues = {
  balanceAmount: 0,
  contactNumber: "91",
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="91">+91</Option>
    </Select>
  </Form.Item>
);

export const BookingForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      {...formItemLayout}
      initialValues={initialValues}
      labelAlign="left"
      name="bookingForm"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        style={{ width: "45%" }}
        name="userName"
        label="Name"
        rules={[{ required: true, message: "Please enter the user name!" }]}
      >
        <Input placeholder="Customer Name" />
      </Form.Item>
      <Form.Item
        style={{ width: "45%" }}
        name="date"
        label="Date"
        rules={[{ required: true, message: "Please enter the start date!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item style={{ width: "45%" }} name="place" label="Place">
        <Input.Group compact>
          <Form.Item name={["place", "from"]} noStyle rules={[{ required: true, message: "From is required" }]}>
            <Input placeholder="From" />
          </Form.Item>
          <Form.Item name={["place", "to"]} noStyle rules={[{ required: true, message: "From is required" }]}>
            <Input placeholder="To" />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item
        style={{ width: "45%" }}
        name="time"
        label="Time"
        rules={[{ required: true, message: "Please enter time!" }]}
      >
        <TimePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        style={{ width: "45%" }}
        name="estimate"
        label="Estimated KM"
        rules={[{ required: true, message: "Please enter estimated KMS!" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        style={{ width: "45%" }}
        name="diesel"
        label="Diesel"
        rules={[{ required: true, message: "Please enter estimated Diesel!" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        style={{ width: "45%" }}
        name="tollCharges"
        label="Toll Charges"
        rules={[{ required: true, message: "Please enter estimated Toll charges!" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        style={{ width: "45%" }}
        name="contactNumber"
        label="Contact Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <InputNumber addonBefore={prefixSelector} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        style={{ width: "45%" }}
        name="totalAmount"
        label="Total Estimated Amount"
        rules={[{ required: true, message: "Please input estimated !" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        style={{ width: "45%" }}
        name="advanceAmount"
        label="Advance Amount"
        rules={[{ required: true, message: "Please input advance paid!" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item style={{ width: "45%" }} name="balanceAmount" label="Balance Amount">
        <InputNumber disabled value={"1234"} readOnly={true} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item style={{ width: "100%" }}>
        <Space size={8}>
          <Button htmlType="submit">Add</Button>
          <Button>Print</Button>
          <Button htmlType="reset">Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
