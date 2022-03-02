import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Space, TimePicker, Typography } from "antd";
import moment, { Moment } from "moment";
import React, { FunctionComponent } from "react";
const { Title } = Typography;

type InvoiceFormProps = {
	initialValues: StrapiResponseData<Booking>;
	handleFormSubmit: (formData: InvoiceFormType) => void;
	handleReset: () => void;
};

export type InvoiceFormType = {
	client: Partial<Client>;
	trip: {
		source: string;
		destination: string;
		tripDate: Moment;
		pickupTime: Moment;
	};
	estimated: {
		kilometer: number;
		diesel: number;
		fasttag: number;
		quotedPrice: number;
		advancePaid: number;
		balanceAmount: number;
	};
	invoice: {
		kilometer: number;
		diesel: number;
		dieselCost: number;
		milage: number;
		totalAmount: number;
		balanceAmount: number;
	};
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

const getFormattedInitialValues = (values: StrapiResponseData<Booking>) => {
	const { attributes } = values;
	const { trip, client, kilometer, fasttag, quotedPrice, balanceAmount, advancePaid, diesel } = attributes;

	const formattedInitialValues = {
		client: {
			name: client?.data.attributes.name,
			contact: client?.data.attributes.contact,
		},
		trip: {
			source: trip?.data.attributes.source,
			destination: trip?.data.attributes.destination,
			tripDate: moment(trip?.data.attributes.tripDate, "YYYY-MM-DD"),
			pickupTime: moment(trip?.data.attributes.pickupTime, "HH:mm:ss"),
		},
		estimated: {
			kilometer,
			diesel,
			fasttag,
			quotedPrice,
			advancePaid,
			balanceAmount,
		},
	};

	return formattedInitialValues;
};

export const InvoiceForm: FunctionComponent<InvoiceFormProps> = (props) => {
	const [form] = Form.useForm();
	const { initialValues, handleFormSubmit, handleReset } = props;

	const onFinish = (values: InvoiceFormType) => {
		handleFormSubmit(values);
	};

	const values = getFormattedInitialValues(initialValues);

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
						<Input />
					</Form.Item>
					<Form.Item
						name={["trip", "destination"]}
						label="To"
						rules={[{ required: true, message: "Please enter the rc details!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name={["trip", "tripDate"]}
						label="Pickup Date"
						rules={[{ required: true, message: "Please enter the pickup date details!" }]}
					>
						<DatePicker format={"YYYY-MM-DD"} style={{ width: "100%" }} />
					</Form.Item>
					<Form.Item
						name={["trip", "pickupTime"]}
						label="Pickup Time"
						rules={[{ required: true, message: "Please enter the pick up time details!" }]}
					>
						<TimePicker format={"HH:mm"} style={{ width: "100%" }} />
					</Form.Item>
				</Col>
			</Row>
			<Row justify="start" gutter={60} align="middle">
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
					<Form.Item
						name={["invoice", "balanceAmount"]}
						label="Balance Amount"
						rules={[{ required: true, message: "Please enter the rc details!" }]}
					>
						<InputNumber style={{ width: "100%" }} />
					</Form.Item>
				</Col>
			</Row>
			<Row justify="end">
				<Space align="center" size={8}>
					<Button type="primary" htmlType="submit">
						Create Invoice
					</Button>
					<Button type="primary" danger htmlType="reset">
						Cancel
					</Button>
				</Space>
			</Row>
		</Form>
	);
};
