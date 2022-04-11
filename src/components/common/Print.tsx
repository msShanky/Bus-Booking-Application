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

const Print = forwardRef<HTMLDivElement, PrintProps>((props, ref) => {
	const { booking } = props;

	return (
		<div ref={ref}>
			<div style={{ padding: '10px 30px 30px' }}>
				<img width={200} src={"/logo.png"} alt="KNT Travels" />
				<h2 style={{ textAlign: 'right', fontSize: '30px', letterSpacing: '1px' }}>Invoice</h2>
				<div className="invoice-container">
					<div>
						<h2>Client Information</h2>
						<table className="invoicetable">
							<tr>
								<th>Invoice Number</th>
								<td>{booking?.id}</td>
							</tr>
							<tr>
								<th>Name</th>
								<td>{booking?.attributes.client?.data?.attributes.name}</td>
							</tr>
							<tr>
								<th>Contact</th>
								<td>{booking?.attributes.client?.data?.attributes.contact}</td>
							</tr>
							<tr>
								<th>Address</th>
								<td>{booking?.attributes.client?.data?.attributes.address}</td>
							</tr>
						</table>
					</div>
					<div>
						<h2>Trip Information</h2>
						<table className="invoicetable">
							<tr>
								<th>From</th>
								<td>{booking?.attributes.trip?.data?.attributes.source}</td>
							</tr>
							<tr>
								<th>To</th>
								<td>{booking?.attributes.trip?.data?.attributes.destination}</td>
							</tr>
							<tr>
								<th>Pickup Date</th>
								<td>{moment(booking?.attributes.trip?.data?.attributes.tripDate).format("DD-MM-YYYY")}</td>
							</tr>
							<tr>
								<th>Pickup Time</th>
								<td>{booking?.attributes.trip?.data?.attributes.pickupTime}</td>
							</tr>
						</table>
					</div>
					<div className="fullwidth">
						<h2>Estimated Information</h2>
						<table className="invoicetable">
							<tr>
								<th>Booking Status</th>
								<td>{booking?.attributes.bookingState}</td>
							</tr>
							<tr>
								<th>Kilometer</th>
								<td>{booking?.attributes.kilometer} KM</td>
							</tr>
							<tr>
								<th>Diesel</th>
								<td>{booking?.attributes.diesel} Ltr</td>
							</tr>
							<tr>
								<th>Fast Tag</th>
								<td>{booking?.attributes.fasttag} Rs</td>
							</tr>
							<tr>
								<th>Quoted Prize</th>
								<td>{booking?.attributes.quotedPrice} Rs</td>
							</tr>
							<tr>
								<th>Advance Paid</th>
								<td>{booking?.attributes.advancePaid} Rs</td>
							</tr>
							<tr style={{ background: '#ccc' }}>
								<th>Balance Amount</th>
								<td><strong>{booking?.attributes.balanceAmount} Rs</strong></td>
							</tr>
						</table>
					</div>
					<div className="fullwidth" style={{ marginTop: '240px' }}>
						<h2>Invoice Information</h2>
						{booking?.attributes.invoice?.data && (
							<table className="invoicetable">
								<tr>
									<th>Invoice Date</th>
									<td>{booking.attributes.invoice?.data.attributes.invoiceDate}</td>
								</tr>
								<tr>
									<th>Kilometer</th>
									<td>{booking.attributes.invoice?.data.attributes.kilometer} KM</td>
								</tr>
								<tr>
									<th>Diesel Cost</th>
									<td>{booking.attributes.invoice?.data.attributes.dieselCost} Rs</td>
								</tr>
								<tr>
									<th>Milage</th>
									<td>{booking.attributes.invoice?.data.attributes.milage}</td>
								</tr>
								<tr style={{ background: '#ccc' }}>
									<th>Total Amount</th>
									<td><strong>{booking.attributes.invoice?.data.attributes.totalAmount} Rs</strong></td>
								</tr>
							</table>
						)}
					</div>
				</div>
				<div className="footer-cont">
					<p style={{ fontSize: '15px' }}>Thanks for choosing  <a href="#" style={{ color: '#4bb2fd' }}>KNT Travels</a></p>
				</div>
			</div>
		</div>
	);
});

export default Print;
