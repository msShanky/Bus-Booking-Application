import React, { FunctionComponent } from "react";
import { Button, Descriptions, Space } from "antd";

type TripDescriptionProps = {
	bookingInfo: StrapiResponseData<Booking>;
};

const TabActionTray = () => {
	return (
		<Space size={8}>
			<Button>Edit</Button>
			<Button>Delete</Button>
			<Button>Print</Button>
		</Space>
	);
};

export const TripDescription: FunctionComponent<TripDescriptionProps> = ({ bookingInfo }) => {
	const { id, attributes } = bookingInfo;
	const { trip, client, kilometer, diesel, quotedPrice, advancePaid, balanceAmount } = attributes;
	return (
		<>
			<Descriptions layout="horizontal" extra={TabActionTray()}>
				<Descriptions.Item label="Name">{client?.data.attributes.name}</Descriptions.Item>
				<Descriptions.Item label="Date">{trip?.data.attributes.tripDate}</Descriptions.Item>
				<Descriptions.Item label="Place">
					<br />
					From: {trip?.data.attributes.source}
					<br />
					To:{trip?.data.attributes.destination}
				</Descriptions.Item>
				<Descriptions.Item label="Time">{trip?.data.attributes.pickupTime}</Descriptions.Item>
				<Descriptions.Item label="Estimate">{kilometer} kms</Descriptions.Item>
				<Descriptions.Item label="Diesel">{diesel} litres</Descriptions.Item>
				<Descriptions.Item label="Bill No">{id}</Descriptions.Item>
				<Descriptions.Item label="Contact">+91 {client?.data.attributes.contact}</Descriptions.Item>
				<Descriptions.Item label="Total">{quotedPrice}</Descriptions.Item>
				<Descriptions.Item label="Advance">{advancePaid}</Descriptions.Item>
				<Descriptions.Item label="Balance">{balanceAmount}</Descriptions.Item>
			</Descriptions>
		</>
	);
};