import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space, TimePicker, Typography } from "antd";
import React, { FunctionComponent, useEffect, useState } from "react";
import { getFormattedInitialValues } from "../../helpers/dataFormatter";
const { Title } = Typography;
const { Option } = Select;

type InvoiceFormProps = {
	initialValues: StrapiResponseData<Booking>;
	handleFormSubmit: (formData: InvoiceFormType) => void;
	handleReset: () => void;
	handlePrint: () => void;
	apiState: ApiState;
	isPrintLoading: boolean;
};

const formItemLayout = {
	labelCol: {
		xs: { span: 10 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 24 },
	},
};

export const InvoiceForm: FunctionComponent<InvoiceFormProps> = (props) => {
	const [form] = Form.useForm();
	const { initialValues, handleFormSubmit, handleReset, handlePrint, apiState, isPrintLoading } = props;
	const [isInvoiced, setIsInvoiced] = useState<boolean>(initialValues?.attributes?.bookingState === "Invoiced");

	const onFinish = (values: InvoiceFormType) => {
		handleFormSubmit(values);
	};

	const values = getFormattedInitialValues(initialValues);

	useEffect(() => form.resetFields(), [initialValues, form]);
	useEffect(() => {
		setIsInvoiced(initialValues.attributes.bookingState === "Invoiced");
	}, [initialValues.attributes.bookingState]);

	if (!initialValues) {
		return <></>;
	}

	return (
		<Form
			{...formItemLayout}
			initialValues={values}
			labelAlign="left"
			name="clientForm"
			form={form}
			onFinish={onFinish}
			onReset={handleReset}
			style={{ width: "80%" }}
		>
			<Row justify="start">
				<Form.Item name="bookingState">
					<Select placeholder="Select Booking Status">
						<Option value="Invoiced">Invoiced</Option>
						<Option value="Booked">Booked</Option>
						<Option value="InTransit">In Transit</Option>
					</Select>
				</Form.Item>
			</Row>
			<Row justify="start" gutter={60}>
				<Col style={{ width: "50%" }}>
					<Row>
						<Title level={4}>Client Information</Title>
					</Row>
					<Form.Item name={["client", "name"]} label="Name">
						<Input readOnly disabled />
					</Form.Item>
					<Form.Item name={["client", "contact"]} label="Contact">
						<InputNumber readOnly disabled style={{ width: "100%" }} />
					</Form.Item>
				</Col>
				<Col style={{ width: "50%" }}>
					<Row>
						<Title level={4}>Trip Information</Title>
					</Row>
					<Form.Item
						name={["trip", "source"]}
						label="From"
						rules={[{ required: true, message: "Please enter the rc details!" }]}
					>
						<Input readOnly disabled />
					</Form.Item>
					<Form.Item
						name={["trip", "destination"]}
						label="To"
						rules={[{ required: true, message: "Please enter the rc details!" }]}
					>
						<Input readOnly disabled />
					</Form.Item>
					<Form.Item
						name={["trip", "tripDate"]}
						label="Pickup Date"
						rules={[{ required: true, message: "Please enter the pickup date details!" }]}
					>
						<DatePicker disabled format={"YYYY-MM-DD"} style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item
						name={["trip", "pickupTime"]}
						label="Pickup Time"
						rules={[{ required: true, message: "Please enter the pick up time details!" }]}
					>
						<TimePicker disabled format={"HH:mm"} style={{ width: "100%" }} />
					</Form.Item>
				</Col>
			</Row>
			<Row justify="start" gutter={60} align="top">
				<Col style={{ width: "50%" }}>
					<Row>
						<Title level={4}>Estimated Information</Title>
					</Row>
					<Form.Item name={["estimated", "kilometer"]} label="Kilometer">
						<InputNumber readOnly disabled style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item name={["estimated", "diesel"]} label="Diesel">
						<InputNumber readOnly disabled style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item name={["estimated", "fasttag"]} label="Fast Tag">
						<InputNumber readOnly disabled style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item name={["estimated", "quotedPrice"]} label="Quoted Price">
						<InputNumber readOnly disabled style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item name={["estimated", "advancePaid"]} label="Advance Paid">
						<InputNumber readOnly disabled style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item name={["estimated", "balanceAmount"]} label="Balance Amount">
						<InputNumber readOnly disabled style={{ width: "100%" }} />
					</Form.Item>
				</Col>
				<Col style={{ width: "50%" }}>
					<Row>
						<Title level={4}>Invoice Information</Title>
					</Row>
					<Form.Item
						name={["invoice", "kilometer"]}
						label="Kilometer"
						rules={[{ required: true, message: "Please enter the rc details!" }]}
					>
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item
						name={["invoice", "diesel"]}
						label="Diesel"
						rules={[{ required: true, message: "Please enter the rc details!" }]}
					>
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item
						name={["invoice", "dieselCost"]}
						label="Diesel Cost"
						rules={[{ required: true, message: "Please enter the rc details!" }]}
					>
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item
						name={["invoice", "milage"]}
						label="Milage"
						rules={[{ required: true, message: "Please enter the rc details!" }]}
					>
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item
						name={["invoice", "totalAmount"]}
						label="Total Amount"
						rules={[{ required: true, message: "Please enter the rc details!" }]}
					>
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
				</Col>
			</Row>
			<Row justify="end">
				<Space align="center" size={8}>
					<Button type="primary" htmlType="submit" loading={apiState === "inProgress"}>
						{isInvoiced ? "Update Invoice" : "Create Invoice"}
					</Button>
					{isInvoiced && (
						<Button onClick={handlePrint} loading={isPrintLoading}>
							Print
						</Button>
					)}
					<Button type="primary" danger htmlType="reset">
						Cancel
					</Button>
				</Space>
			</Row>
		</Form>
	);
};
