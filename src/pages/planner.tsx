import React, { useEffect, useState } from "react";
import { Badge, Calendar } from "antd";
import AppLayout from "../components/AppLayout";
import { getBookingsByDate, getBookingsByMonth } from "../helpers/apiHandler";
import moment, { Moment } from "moment";
import { getMonthlyTripDates } from "../helpers/dataFormatter";

const Planner = () => {
	const [monthlyBookings, setMonthlyBookings] = useState<StrapiResponseData<Booking>[]>();
	const [availableBookings, setMonthlyAvailableBookings] = useState<Array<string>>([]);
	const [dateRange, setDateRange] = useState([
		moment().startOf("month").format("YYYY-MM-DD"),
		moment().endOf("month").format("YYYY-MM-DD"),
	]);

	const onPanelChange = (value: any, mode: any) => {
		console.log(value.format("YYYY-MM-DD"), mode);
	};

	const dateCellRender = (cellDate: Moment) => {
		const cellDateFormatted = cellDate.format("YYYY-MM-DD");
		const isAvailable = availableBookings.includes(cellDateFormatted);
		console.log("THE AVAILABLE INDEX IS", isAvailable);
		const currentDateBookings = monthlyBookings?.filter((booking) => {
			const tripDate = booking.attributes.trip?.data.attributes.tripDate;
			return tripDate === cellDateFormatted;
		});
		console.log("CURRENT DATE BOOKINGS ", currentDateBookings);
		return (
			isAvailable && (
				<ul className="dailyBookings">
					{currentDateBookings?.map((booking) => {
						const { id, attributes } = booking;
						return (
							<li key={`BOOKING_ID_${id}`}>
								<Badge
									size="small"
									status="success"
									text={`${attributes.trip?.data.attributes.source}-${attributes.trip?.data.attributes.destination} | ${attributes.client?.data.attributes.name}`}
								/>
							</li>
						);
					})}
				</ul>
			)
		);
	};

	useEffect(() => {
		const fetchBookings = async () => {
			const { data: monthlyBooking } = await getBookingsByMonth(dateRange);
			setMonthlyBookings(monthlyBooking.data);
			console.log("MONTHLY BOOKING", monthlyBooking.data);
			setMonthlyAvailableBookings(getMonthlyTripDates(monthlyBooking.data));
		};
		fetchBookings();
	}, [dateRange]);

	return (
		<AppLayout>
			<Calendar dateCellRender={dateCellRender} onPanelChange={onPanelChange} />
		</AppLayout>
	);
};

export default Planner;
