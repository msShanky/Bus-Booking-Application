import { Button, DatePicker, Form, Input, InputNumber, Row, Space } from "antd";
import moment from "moment";

import React, { FunctionComponent } from "react";

type ClientFormProps = {
	initialValues: StrapiResponseData<Bus>;
	handleFormSubmit: (formData: Bus) => void;
	handleReset: () => void;
};

const formItemLayout = {
	labelCol: {
		xs: { span: 12 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 24 },
	},
};

export const BusForm: FunctionComponent<ClientFormProps> = (props) => {
	const { initialValues, handleFormSubmit, handleReset } = props;
	const [form] = Form.useForm<Bus>();

	const onFinish = (values: Bus) => {
		handleFormSubmit({ ...values, insuranceExpiry: moment(values.insuranceExpiry).format("YYYY-MM-DD") });
	};

	const { attributes } = initialValues;
	const { insuranceExpiry } = attributes;

	const formattedInitialValues = { ...attributes, insuranceExpiry: moment(insuranceExpiry) };

	return (
		<Form
			{...formItemLayout}
			initialValues={formattedInitialValues ?? {}}
			labelAlign="left"
			name="clientForm"
			form={form}
			onFinish={onFinish}
			onReset={handleReset}
			style={{ width: "80%" }}
		>
			<Form.Item
				name="busNumber"
				label="Bus Number"
				rules={[{ required: true, message: "Please enter the bus number!" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item name="rc" label="RC" rules={[{ required: true, message: "Please enter the rc details!" }]}>
				<Input />
			</Form.Item>
			<Form.Item name="fc" label="FC" rules={[{ required: true, message: "Please enter the rc details!" }]}>
				<Input />
			</Form.Item>
			<Form.Item
				name="insurance"
				label="Insurance"
				rules={[{ required: true, message: "Please enter the rc details!" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="insuranceExpiry"
				label="Insurance Expiry"
				rules={[{ required: true, message: "Please enter the InsuranceExpiry details!" }]}
			>
				<DatePicker style={{ width: "100%" }} />
			</Form.Item>
			<Form.Item
				name="license"
				label="License"
				rules={[{ required: true, message: "Please enter the License details!" }]}
			>
				<Input />
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
