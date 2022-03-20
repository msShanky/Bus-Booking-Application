import { Button, DatePicker, Form, Input, message, Row, Space, Upload, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import moment from "moment";
import { API_URL } from "../../helpers/apiHandler";

import React, { FunctionComponent, useEffect, useState } from "react";
import { UploadRequestOption, RcFile } from "rc-upload/lib/interface";
import axios from "axios";

type ClientFormProps = {
	initialValues?: StrapiResponseData<Bus>;
	handleFormSubmit: (formData: BusPostBody) => void;
	handleReset: () => void;
	isCreateForm: boolean;
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
	const { initialValues, handleFormSubmit, handleReset, isCreateForm } = props;
	// const [progress, setProgress] = useState(0);
	const [form] = Form.useForm<BusPostBody>();

	const onFinish = (values: BusPostBody) => {
		handleFormSubmit({ ...values, insuranceExpiry: moment(values.insuranceExpiry).format("YYYY-MM-DD") });
	};

	useEffect(() => form.resetFields(), [initialValues, form]);
	const formattedInitialValues = {
		...initialValues?.attributes,
		insuranceExpiry: initialValues?.attributes && moment(initialValues?.attributes.insuranceExpiry),
	};

	const customFormEvent = async (props: UploadRequestOption) => {
		const { file, onSuccess, onProgress, onError } = props;
		const rcFile: RcFile = file as RcFile;
		const formData = new FormData();
		formData.append(`files`, rcFile, rcFile.name);

		const config = {
			headers: { "Content-Type": "multipart/form-data" },
			onUploadProgress: (event: any) => {
				// @ts-ignore
				onProgress({ percent: 100 });
			},
		};

		try {
			const response = await axios.post(`${API_URL}/upload`, formData, config);
			message.success(`${rcFile.name} file uploaded successfully`);
			// @ts-ignore
			onSuccess(response);
			// @ts-ignore
			onProgress({ percent: 100 });
			return true;
		} catch (error) {
			message.error(`${rcFile.name} file upload failed.`);
			// @ts-ignore
			onError({ error, status: "error" });
			return false;
		}
	};

	const fileUploadProps: UploadProps = {
		name: "file",
		headers: {
			"Content-Type": "multipart/form-data",
		},
		onChange(info: { file: { status: string; name: any }; fileList: any }) {
			info.file.status = "success";
		},
		customRequest: customFormEvent,
		maxCount: 1,
	};

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
				<Input placeholder="Bus Number" />
			</Form.Item>
			<Form.Item name="rc" label="RC" rules={[{ required: true, message: "Please enter the rc details!" }]}>
				<Input placeholder="RC Information" />
			</Form.Item>
			<Form.Item name="fc" label="FC" rules={[{ required: true, message: "Please enter the rc details!" }]}>
				<Input placeholder="FC Information" />
			</Form.Item>
			<Form.Item
				name="insurance"
				label="Insurance"
				rules={[{ required: true, message: "Please enter the rc details!" }]}
			>
				<Input placeholder="Insurance Information" />
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
				<Input placeholder="License Number" />
			</Form.Item>
			<Form.Item name="rcFile" label="RC File" rules={[{ required: true, message: "Please upload RC Document!" }]}>
				<Upload {...fileUploadProps}>
					<Button icon={<UploadOutlined />}>Upload RC</Button>
				</Upload>
			</Form.Item>
			<Row justify="end">
				<Space align="center" size={8}>
					<Button type="primary" htmlType="submit">
						{isCreateForm ? "Create" : "Update"}
					</Button>
					<Button type="primary" danger htmlType="reset">
						Cancel
					</Button>
				</Space>
			</Row>
		</Form>
	);
};
