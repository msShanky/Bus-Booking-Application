import { Button, Form, Input, InputNumber, Row, Space } from "antd";

import React, { FunctionComponent } from "react";

type ClientFormProps = {
	initialValues: Client;
	handleFormSubmit: (formData: Client) => void;
	handleReset: () => void;
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
	const { initialValues, handleFormSubmit, handleReset } = props;
	const [form] = Form.useForm<Client>();

	const onFinish = (values: Client) => {
		handleFormSubmit(values);
	};

	return (
		<Form
			{...formItemLayout}
			initialValues={initialValues ?? {}}
			labelAlign="left"
			name="clientForm"
			form={form}
			onFinish={onFinish}
      onReset={handleReset}
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
			<Row justify="end">
				<Space align="center" size={8}>
					<Button type="primary" htmlType="submit">
						Update
					</Button>
					<Button type="primary" danger htmlType="reset">
						Cancel
					</Button>
				</Space>
			</Row>
		</Form>
	);
};
