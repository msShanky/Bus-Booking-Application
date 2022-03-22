/* eslint-disable react/display-name */
import { Badge, Col, Descriptions, Layout, Row, Typography } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, { forwardRef, FunctionComponent, MutableRefObject, Ref } from "react";
const { Title } = Typography;
import moment from "moment";

type RefType = MutableRefObject<HTMLDivElement | null>;
type PrintProps = {
	booking: StrapiResponseData<Booking>;
};

// const Print = forwardRef((props, ref) => {
// 	return (
// 		<div style={{ width: "800px", height: "800px", background: "red" }} ref={ref}>
// 			<h1>This would be the printed on to the preview</h1>
// 		</div>
// 	);
// });

const Print = forwardRef<HTMLDivElement, PrintProps>((props, ref) => {
	console.log("The props received for print is", props);

	const { booking } = props;

	return (
		<div ref={ref}>
			{/* {booking && ( */}
			<Layout>
				<Header
					style={{
						height: "80px",
					}}
				>
					<Title style={{ color: "white", marginTop: "1em" }} level={3}>
						Booking Invoice {booking?.id}
					</Title>
				</Header>
				<Layout>
					<Content style={{ paddingTop: "4em", minHeight: "100vh" }}>
						<Row
							style={{
								width: "90%",
								margin: "0 3em",
							}}
							align="top"
							justify="center"
						>
							<Col span={12}>
								<Title level={5}>Client Information</Title>
								{/* Name */}
								<Row style={{ marginTop: "2em" }} align="middle" justify="space-between">
									<Col span={12}>
										<Typography>Name</Typography>
									</Col>
									<Col span={12}>
										<Typography>{booking?.attributes.client?.data.attributes.name}</Typography>
									</Col>
								</Row>
								{/* Contact */}
								<Row style={{ marginTop: "2em" }} align="middle" justify="space-between">
									<Col span={12}>
										<Typography>Contact</Typography>
									</Col>
									<Col span={12}>
										<Typography>{booking?.attributes.client?.data.attributes.contact}</Typography>
									</Col>
								</Row>
								{/* Address */}
								<Row style={{ marginTop: "2em" }} align="middle" justify="space-between">
									<Col span={12}>
										<Typography>Address</Typography>
									</Col>
									<Col span={12}>
										<Typography>{booking?.attributes.client?.data.attributes.address}</Typography>
									</Col>
								</Row>
							</Col>
							<Col span={12}>
								<Title level={5}>Trip Information</Title>
								{/* Place From */}
								<Row style={{ marginTop: "2em" }} align="middle" justify="space-between">
									<Col span={12}>
										<Typography>From</Typography>
									</Col>
									<Col span={12}>
										<Typography>{booking?.attributes.trip?.data.attributes.source}</Typography>
									</Col>
								</Row>
								{/* Place To */}
								<Row style={{ marginTop: "2em" }} align="middle" justify="space-between">
									<Col span={12}>
										<Typography>To</Typography>
									</Col>
									<Col span={12}>
										<Typography>{booking?.attributes.trip?.data.attributes.destination}</Typography>
									</Col>
								</Row>
								{/* Pickup Date */}
								<Row style={{ marginTop: "2em" }} align="middle" justify="space-between">
									<Col span={12}>
										<Typography>Pickup Date</Typography>
									</Col>
									<Col span={12}>
										<Typography>
											{moment(booking?.attributes.trip?.data.attributes.tripDate).format("DD-MM-YYYY")}
										</Typography>
									</Col>
								</Row>
								{/* Place To */}
								<Row style={{ marginTop: "2em" }} align="middle" justify="space-between">
									<Col span={12}>
										<Typography>Pickup Time</Typography>
									</Col>
									<Col span={12}>
										<Typography>
											{booking?.attributes.trip?.data.attributes.pickupTime}
											{/* {moment(booking.attributes.trip?.data.attributes.pickupTime).format("HH:SS")} */}
										</Typography>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row style={{ width: "90%", margin: "0 auto" }}>
							<Descriptions
								labelStyle={{ background: "#40a9ff" }}
								style={{ marginTop: "2em" }}
								title="Estimated Information"
								bordered
							>
								<Descriptions.Item span={2} label="Booking Status">
									{booking?.attributes.bookingState}
								</Descriptions.Item>
								<Descriptions.Item span={2} label="Kilometer">
									{booking?.attributes.kilometer}
								</Descriptions.Item>
								<Descriptions.Item span={2} label="Diesel">
									{booking?.attributes.diesel}
								</Descriptions.Item>
								<Descriptions.Item span={2} label="Fast Tag">
									{booking?.attributes.fasttag}
								</Descriptions.Item>
								<Descriptions.Item span={2} label="Quoted Prize">
									{booking?.attributes.quotedPrice}
								</Descriptions.Item>
								<Descriptions.Item span={2} label="Advance Paid">
									{booking?.attributes.quotedPrice}
								</Descriptions.Item>
								<Descriptions.Item span={2} label="Balance Amount">
									{booking?.attributes.balanceAmount}
								</Descriptions.Item>
							</Descriptions>
						</Row>
						<Row style={{ width: "90%", margin: "0 auto" }}>
							{booking?.attributes.invoice?.data && (
								<Descriptions
									labelStyle={{ background: "#40a9ff" }}
									style={{ marginTop: "2em" }}
									title="Invoice Information"
									bordered
								>
									<Descriptions.Item span={2} label="Invoice Date">
										{booking.attributes.invoice?.data.attributes.invoiceDate}
									</Descriptions.Item>
									<Descriptions.Item span={2} label="Kilometer">
										{booking.attributes.invoice?.data.attributes.kilometer}
									</Descriptions.Item>
									<Descriptions.Item span={2} label="Diesel">
										{booking.attributes.invoice?.data.attributes.kilometer}
									</Descriptions.Item>
									<Descriptions.Item span={2} label="Diesel Cost">
										{booking.attributes.invoice?.data.attributes.dieselCost}
									</Descriptions.Item>
									<Descriptions.Item span={2} label="Milage">
										{booking.attributes.invoice?.data.attributes.milage}
									</Descriptions.Item>
									<Descriptions.Item span={2} label="Total Amount">
										{booking.attributes.invoice?.data.attributes.totalAmount}
									</Descriptions.Item>
								</Descriptions>
							)}
						</Row>
					</Content>
				</Layout>
				{/* <Footer>footer</Footer> */}
			</Layout>
			{/* )} */}
		</div>
	);
});

export default Print;
