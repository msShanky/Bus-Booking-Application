import React, { FunctionComponent } from "react";
import { Button, Descriptions, Popconfirm, Space } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

type TripDescriptionProps = {
	bookingInfo: StrapiResponseData<Booking>;
	isLoading: boolean;
} & ActionTrayType;

type ActionTrayType = {
	onEdit: () => void;
	onDelete: () => void;
	onPrint: () => void;
};

const TabActionTray = (props: TripDescriptionProps) => {
	const { onDelete, onEdit, onPrint, isLoading } = props;
	return (
		<Space size={8}>
			<Button onClick={onEdit}>Edit</Button>
			{/* <Button onClick={onDelete}>Delete</Button> */}
			<Popconfirm
				onConfirm={onDelete}
				title="Are you sure, you you be deleting all related items?"
				icon={<QuestionCircleOutlined />}
			>
				<Button danger type="primary">Delete</Button>
			</Popconfirm>
			<Button loading={isLoading} onClick={onPrint}>
				Print
			</Button>
		</Space>
	);
};

export const TripDescription: FunctionComponent<TripDescriptionProps> = (props) => {
	const { bookingInfo, onDelete, onEdit, onPrint } = props;
	const { id, attributes } = bookingInfo;
	const { trip, client, kilometer, diesel, quotedPrice, advancePaid, balanceAmount } = attributes;
	return (
		<>
			{/* <Descriptions layout="horizontal" extra={<TabActionTray loading={isLoading} onDelete={onDelete} onEdit={onEdit} onPrint={onPrint} />}> */}
			<Descriptions layout="horizontal" extra={<TabActionTray {...props} />}>
				<Descriptions.Item label="Name">{client?.data?.attributes.name}</Descriptions.Item>
				<Descriptions.Item label="Date">{trip?.data?.attributes.tripDate}</Descriptions.Item>
				<Descriptions.Item label="Place">
					{/* <br /> */}
					From: {trip?.data?.attributes.source}
					<br />
					To:{trip?.data?.attributes.destination}
				</Descriptions.Item>
				<Descriptions.Item label="Time">{trip?.data?.attributes.pickupTime}</Descriptions.Item>
				<Descriptions.Item label="Estimate">{kilometer} kms</Descriptions.Item>
				<Descriptions.Item label="Diesel">{diesel} litres</Descriptions.Item>
				<Descriptions.Item label="Bill No">{id}</Descriptions.Item>
				<Descriptions.Item label="Contact">+91 {client?.data?.attributes.contact}</Descriptions.Item>
				<Descriptions.Item label="Total">{quotedPrice}</Descriptions.Item>
				<Descriptions.Item label="Advance">{advancePaid}</Descriptions.Item>
				<Descriptions.Item label="Balance">{balanceAmount}</Descriptions.Item>
			</Descriptions>
		</>
	);
};
