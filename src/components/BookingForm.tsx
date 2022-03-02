import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space, TimePicker } from "antd";
import React, { FunctionComponent } from "react";
import { FormValues } from "../types/BookingForm";

type BookingFormProps = {
	onFormSubmit: (formValues: FormValues) => void;
};

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

const prefixSelector = (
	<Form.Item name="prefix" noStyle>
		<Select style={{ width: 70 }}>
			<Option value="91">+91</Option>
		</Select>
	</Form.Item>
);

export const BookingForm: FunctionComponent<BookingFormProps> = ({ onFormSubmit }) => {
	const [form] = Form.useForm<FormValues>();

	const onFinish = (values: FormValues) => {
		onFormSubmit(values);
	};

	const handleFormChange = (values: any) => {
		const formValues = form.getFieldsValue();
		const { advancePaid, quotedPrice } = formValues;
		if (!advancePaid || !quotedPrice) {
			return;
		}
		form.setFieldsValue({ ...formValues, balanceAmount: quotedPrice - advancePaid });
	};

	return (
		<Form
			{...formItemLayout}
			labelAlign="left"
			name="bookingForm"
			form={form}
			onFinish={onFinish}
			onChange={handleFormChange}
		>
			<Row gutter={40} style={{ width: "100%" }}>
				<Col style={{ width: "50%" }}>
					<Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter the user name!" }]}>
						<Input placeholder="Customer Name" />
					</Form.Item>
					<Form.Item name="place" label="Place" rules={[{ required: true, message: "Please enter the start date!" }]}>
						<Input.Group compact>
							<Space direction="vertical" style={{ width: "100%" }} size={8}>
								<Form.Item name={["place", "from"]} rules={[{ required: true, message: "From is required" }]}>
									<Input placeholder="From" />
								</Form.Item>
								<Form.Item name={["place", "to"]} rules={[{ required: true, message: "From is required" }]}>
									<Input placeholder="To" />
								</Form.Item>
							</Space>
						</Input.Group>
					</Form.Item>
					<Form.Item name="date" label="Date" rules={[{ required: true, message: "Please enter the start date!" }]}>
						<DatePicker style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item name="time" label="Time" rules={[{ required: true, message: "Please enter time!" }]}>
						<TimePicker format={"HH:mm"} style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item
						name="contact"
						label="Contact Number"
						rules={[{ required: true, message: "Please input your phone number!" }]}
					>
						{/* addonBefore={prefixSelector} */}
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
				</Col>
				<Col style={{ width: "50%" }}>
					<Form.Item
						name="kilometer"
						label="Estimated KM"
						rules={[{ required: true, message: "Please enter estimated KMS!" }]}
					>
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item
						name="diesel"
						label="Diesel"
						rules={[{ required: true, message: "Please enter estimated Diesel!" }]}
					>
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item
						name="fasttag"
						label="Toll Charges"
						rules={[{ required: true, message: "Please enter estimated Toll charges!" }]}
					>
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item
						name="quotedPrice"
						label="Total Estimated Amount"
						rules={[{ required: true, message: "Please input estimated !" }]}
					>
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item
						name="advancePaid"
						label="Advance Amount"
						rules={[{ required: true, message: "Please input advance paid!" }]}
					>
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item shouldUpdate name="balanceAmount" label="Balance Amount">
						<InputNumber readOnly style={{ width: "100%" }} />
					</Form.Item>
				</Col>
			</Row>
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
