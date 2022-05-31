/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import moment from "moment";

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
							<tbody>
								<tr>
									<td><strong>Invoice Number</strong></td>
									<td>{booking?.id}</td>
								</tr>
								<tr>
									<td><strong>Name</strong></td>
									<td>{booking?.attributes.client?.data?.attributes.name}</td>
								</tr>
								<tr>
									<td><strong>Contact</strong></td>
									<td>{booking?.attributes.client?.data?.attributes.contact}</td>
								</tr>
								<tr>
									<td><strong>Address</strong></td>
									<td>{booking?.attributes.client?.data?.attributes.address}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div>
						<h2>Trip Information</h2>
						<table className="invoicetable">
							<tbody>
								<tr>
									<td><strong>From</strong></td>
									<td>{booking?.attributes.trip?.data?.attributes.source}</td>
								</tr>
								<tr>
									<td><strong>To</strong></td>
									<td>{booking?.attributes.trip?.data?.attributes.destination}</td>
								</tr>
								<tr>
									<td><strong>Pickup Date</strong></td>
									<td>{moment(booking?.attributes.trip?.data?.attributes.tripDate).format("DD-MM-YYYY")}</td>
								</tr>
								<tr>
									<td><strong>Pickup Time</strong></td>
									<td>{booking?.attributes.trip?.data?.attributes.pickupTime}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="fullwidth">
						<h2>Estimated Information</h2>
						<table className="invoicetable">
							<tbody>
								<tr>
									<td><strong>Booking Status</strong></td>
									<td>{booking?.attributes.bookingState}</td>
								</tr>
								<tr>
									<td><strong>Kilometer</strong></td>
									<td>{booking?.attributes.kilometer} KM</td>
								</tr>
								<tr>
									<td><strong>Diesel</strong></td>
									<td>{booking?.attributes.diesel} Ltr</td>
								</tr>
								<tr>
									<td><strong>Fast Tag</strong></td>
									<td>{booking?.attributes.fasttag} Rs</td>
								</tr>
								<tr>
									<td><strong>Quoted Prize</strong></td>
									<td>{booking?.attributes.quotedPrice} Rs</td>
								</tr>
								<tr>
									<td><strong>Advance Paid</strong></td>
									<td>{booking?.attributes.advancePaid} Rs</td>
								</tr>
								<tr style={{ background: '#ccc' }}>
									<td><strong>Balance Amount</strong></td>
									<td><strong>{booking?.attributes.balanceAmount} Rs</strong></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="fullwidth" style={{ marginTop: '240px' }}>
						<h2>Invoice Information</h2>
						{booking?.attributes.invoice?.data && (
							<table className="invoicetable">
								<tbody>
									<tr>
										<td><strong>Invoice Date</strong></td>
										<td>{booking.attributes.invoice?.data.attributes.invoiceDate}</td>
									</tr>
									<tr>
										<td><strong>Kilometer</strong></td>
										<td>{booking.attributes.invoice?.data.attributes.kilometer} KM</td>
									</tr>
									<tr>
										<td><strong>Diesel Cost</strong></td>
										<td>{booking.attributes.invoice?.data.attributes.dieselCost} Rs</td>
									</tr>
									<tr>
										<td><strong>Milage</strong></td>
										<td>{booking.attributes.invoice?.data.attributes.milage}</td>
									</tr>
									<tr style={{ background: '#ccc' }}>
										<td><strong>Total Amount</strong></td>
										<td><strong>{booking.attributes.invoice?.data.attributes.totalAmount} Rs</strong></td>
									</tr>
								</tbody>
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
