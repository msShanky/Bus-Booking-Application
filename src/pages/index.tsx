import type { NextPage } from "next";
import { Button, Calendar, Col, Result, Row, Space, Tabs, Typography } from "antd";
import Layout from "../components/AppLayout";
import { BookingForm } from "../components/BookingForm";
import { TripDescription } from "../components/common/TripDescription";
import { FormValues } from "../types/BookingForm";
import { createBooking, createClient, createTrip, getBookingsByDate, getBookingsByMonth } from "../helpers/apiHandler";
import { ReactNode, useEffect, useState } from "react";
import { Spin } from "antd";
import moment, { Moment } from "moment";
import { getMonthlyTripDates } from "../helpers/dataFormatter";
const { TabPane } = Tabs;
const { Title } = Typography;

const Home: NextPage = () => {
	const [apiState, setApiState] = useState<"idle" | "inProgress" | "success" | "error">("idle");
	const [selectedDate, setSelectedDate] = useState<Moment>(moment());
	const [activeBookings, setActiveBookings] = useState<StrapiResponseData<Booking>[]>();
	const [monthlyBookings, setMonthlyBookings] = useState<StrapiResponseData<Booking>[]>();
	const [availableBookings, setMonthlyAvailableBookings] = useState<Array<string>>([]);
	const [dateRange, setDateRange] = useState([
		moment().startOf("month").format("YYYY-MM-DD"),
		moment().endOf("month").format("YYYY-MM-DD"),
	]);

	const fetchBookingsByDate = async (date: Moment) => {
		setSelectedDate(date);
		try {
			const { data } = await getBookingsByDate(date);
			setActiveBookings(data.data);
		} catch (error) {}
	};

	const onPanelChange = (value: any, mode: any) => {
		fetchBookingsByDate(value);
	};

	const handleDateChange = (value: Moment) => {
		fetchBookingsByDate(value);
	};

	const onTabChange = (event: any) => {};

	const handleBookingForm = async (formValues: FormValues) => {
		setApiState("inProgress");
		try {
			const {
				data: {
					data: { id: tripId, attributes: trip },
				},
			} = await createTrip(formValues);
			const {
				data: {
					data: { id: clientId, attributes: client },
				},
			} = await createClient(formValues);
			await createBooking(formValues, tripId, clientId);
			setApiState("success");
		} catch (error) {
			setApiState("error");
		}
	};

	const dateCellRender = (date: Moment): ReactNode => {
		console.log("THE DATE VALUE IS");
		const cellDate = date.format("YYYY-MM-DD");
		return availableBookings.includes(cellDate) && <span className="calendarBooking" />;
	};

	useEffect(() => {
		const fetchBookings = async () => {
			const { data } = await getBookingsByDate(selectedDate);
			const { data: monthlyBooking } = await getBookingsByMonth(dateRange);
			setActiveBookings(data.data);
			setMonthlyBookings(monthlyBooking.data);
			console.log("MONTHLY BOOKING", monthlyBooking.data);
			setMonthlyAvailableBookings(getMonthlyTripDates(monthlyBooking.data));
		};
		fetchBookings();
	}, [selectedDate, dateRange]);

	console.log("THE MONTHLY BOOKINGS", monthlyBookings);

	return (
		<Layout>
			<Space className="sectionContainer" size={16} direction="vertical">
				<Row className="sectionOneRow" wrap={false} align="middle" justify="space-around" gutter={[40, 0]}>
					<Col span={12}>
						<Calendar
							defaultValue={selectedDate}
							style={{ height: "350px" }}
							fullscreen={false}
							onChange={handleDateChange}
							onPanelChange={onPanelChange}
							dateCellRender={dateCellRender}
							mode="month"
						/>
					</Col>
					<Col span={12}>
						<Tabs className="tabContainer" defaultActiveKey="1" onChange={onTabChange}>
							{activeBookings &&
								activeBookings.map((booking, index) => {
									const date = booking.attributes.trip?.data.attributes.tripDate;
									const month = moment(date).format("MMMM");
									const day = moment(date).date();
									return (
										<TabPane tab={`${month} ${day}`} key={index.toString()}>
											<TripDescription bookingInfo={booking} />
										</TabPane>
									);
								})}
						</Tabs>
					</Col>
				</Row>
				<>
					<Title level={4}>Feed</Title>
					{apiState !== "success" && apiState !== "inProgress" && <BookingForm onFormSubmit={handleBookingForm} />}
					{apiState === "success" && (
						<Result
							status="success"
							title="The booking has been created successfully"
							extra={
								<Button
									onClick={() => {
										setApiState("idle");
									}}
									type="primary"
									key="console"
								>
									Create New
								</Button>
							}
						/>
					)}
					{apiState === "inProgress" && <Spin style={{ width: "100%" }} size="large" />}
				</>
			</Space>
			{/* Section 1 : Date picker and details */}
		</Layout>
	);
};

export default Home;
