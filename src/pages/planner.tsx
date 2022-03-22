import React, { useEffect, useState } from "react";
import { Badge, Calendar } from "antd";
import AppLayout from "../components/AppLayout";
import { getBookingsByDate, getBookingsByMonth } from "../helpers/apiHandler";
import moment, { Moment } from "moment";
import { findDateRange, getMonthlyTripDates } from "../helpers/dataFormatter";

type BookingType = Array<StrapiResponseData<Booking>>;

const Planner = () => {
	const [bookings, setBookings] = useState<BookingType>([]);
	const [availableBookings, setAvailableBookings] = useState<Array<string>>([]);
	const [dateRange, setDateRange] = useState([
		moment().startOf("month").format("YYYY-MM-DD"),
		moment().endOf("month").format("YYYY-MM-DD"),
	]);

	const onPanelChange = (value: Moment, mode: any) => {
		setDateRange(findDateRange(value));
	};

	const dateCellRender = (cellDate: Moment) => {
		const cellDateFormatted = cellDate.format("YYYY-MM-DD");
		const isAvailable = availableBookings.includes(cellDateFormatted);
		const currentDateBookings = bookings?.filter((booking) => {
			const tripDate = booking.attributes.trip?.data.attributes.tripDate;
			return tripDate === cellDateFormatted;
		});

		return (
			isAvailable && (
				<ul className="dailyBookings">
					{currentDateBookings?.map((booking: StrapiResponseData<Booking>) => {
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
			const { data } = await getBookingsByMonth(dateRange);
			const { data: strapiResponse } = data;
			const updatedBookings: Array<StrapiResponseData<Booking>> = [...bookings, ...strapiResponse];
			setBookings(updatedBookings);
			const monthlyTripDates = getMonthlyTripDates(updatedBookings);
			setAvailableBookings(monthlyTripDates);
		};
		fetchBookings();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dateRange]);

	return (
		<AppLayout>
			<Calendar
				dateCellRender={dateCellRender}
				onSelect={(value) => console.log("THE VALUE IS CLICKED", value)}
				onPanelChange={onPanelChange}
			/>
		</AppLayout>
	);
};

export default Planner;
