import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Row } from "antd";
import React, { FunctionComponent } from "react";

type CustomModalProps = {
	isVisible: boolean;
	title: string;
	handleSubmit: () => void;
	handleCancel: () => void;
	isLoading: boolean;
	width?: number;
};

export const CustomModal: FunctionComponent<CustomModalProps> = (props) => {
	const { title, children, isVisible, handleSubmit, handleCancel, isLoading, width } = props;
	return (
		<Modal
			footer={null}
			title={title}
			visible={isVisible}
			onOk={handleSubmit}
			onCancel={handleCancel}
			confirmLoading={isLoading}
			width={width}
		>
			<Row justify="center">{children}</Row>
		</Modal>
	);
};

type FunctionType = (id?: number) => void;

export const confirm = (handleConfirmation: FunctionType, handleCancel: FunctionType) => {
	return Modal.confirm({
		title: "Client Delete",
		icon: <ExclamationCircleOutlined />,
		content: "Do you want to delete this client?",
		okText: "Confirm",
		cancelText: "Cancel",
		onOk: handleConfirmation,
		onCancel: handleCancel,
	});
};
