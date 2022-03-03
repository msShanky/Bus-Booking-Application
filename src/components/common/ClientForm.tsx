import { Button, Form, Input, InputNumber, Row, Space } from "antd";

import React, { FunctionComponent, useEffect } from "react";

type ClientFormProps = {
	initialValues?: ClientPostBody;
	handleFormSubmit: (formData: Client) => void;
	handleReset: () => void;
	isCreateNewForm: boolean;
};

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

export const ClientForm: FunctionComponent<ClientFormProps> = (props) => {
	const { initialValues, handleFormSubmit, handleReset, isCreateNewForm } = props;
	const [form] = Form.useForm<Client>();

	const onFinish = (values: Client) => {
		handleFormSubmit(values);
	};

	useEffect(() => form.resetFields(), [initialValues, form]);

	return (
		<Form
			{...formItemLayout}
			initialValues={initialValues ?? {}}
			labelAlign="left"
			name="clientForm"
			form={form}
			onFinish={onFinish}
			onReset={handleReset}
			style={{ width: "80%" }}
		>
			<Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter the client name!" }]}>
				<Input />
			</Form.Item>
			<Form.Item name="address" label="Address" rules={[{ required: true, message: "Please enter the address!" }]}>
				<Input />
			</Form.Item>
			<Form.Item
				name="contact"
				label="Contact"
				rules={[{ required: true, message: "Please enter the client contact!" }]}
			>
				<InputNumber style={{ width: "100%" }} />
			</Form.Item>
			<Form.Item
				name="booking"
				label="Booking ID"
				rules={[{ required: true, message: "Please enter a valid booking ID" }]}
			>
				<InputNumber style={{ width: "100%" }} />
			</Form.Item>
			<Row justify="end">
				<Space align="center" size={8}>
					<Button type="primary" htmlType="submit">
						{isCreateNewForm ? "Create" : "Update"}
					</Button>
					<Button type="primary" danger htmlType="reset">
						Cancel
					</Button>
				</Space>
			</Row>
		</Form>
	);
};
