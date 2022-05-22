import React, { useEffect, useState } from "react";
import { Badge, Calendar } from "antd";
import AppLayout from "../components/AppLayout";
import { getBookingsByMonth } from "../helpers/apiHandler";
import moment, { Moment } from "moment";
import { findDateRange, getMonthlyTripDates } from "../helpers/dataFormatter";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";

type BookingType = Array<StrapiResponseData<Booking>>;

const Planner = () => {
	const [bookings, setBookings] = useState<BookingType>([]);
	const [availableBookings, setAvailableBookings] = useState<Array<string>>([]);
	const [mode, setMode] = useState<CalendarMode>('month')
	const [dateRange, setDateRange] = useState([
		moment().startOf("month").format("YYYY-MM-DD"),
		moment().endOf("month").format("YYYY-MM-DD"),
	]);

	const onPanelChange = (value: Moment, mode: CalendarMode) => {
		setDateRange(findDateRange(value));
		setMode(mode);
	};

	const onMonthSelect = (value: Moment) => {
		if (mode === 'year') {
			setMode('month')
			setDateRange(findDateRange(value))
		}
	}

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
									text={`${attributes.trip?.data?.attributes?.source}-${attributes.trip?.data?.attributes?.destination} | ${attributes.client?.data?.attributes?.name}`}
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
			const updatedBookings: Array<StrapiResponseData<Booking>> = [...strapiResponse];
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
				onSelect={onMonthSelect}
				onPanelChange={onPanelChange}
				mode={mode}
			/>
		</AppLayout>
	);
};

export default Planner;
