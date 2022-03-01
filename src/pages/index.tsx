import type { NextPage } from "next";
import { Calendar, Col, Row, Space, Tabs, Typography } from "antd";
import Layout from "../components/AppLayout";
import { BookingForm } from "../components/BookingForm";
import { TripDescription } from "../components/common/TripDescription";
import { FormValues } from "../types/BookingForm";
import { createBooking, createClient, createTrip, getBookingsByDate } from "../helpers/apiHandler";
import { useEffect, useState } from "react";
import { Spin } from "antd";
const { TabPane } = Tabs;
import moment, { Moment } from "moment";

const Home: NextPage = () => {
	const [apiState, setApiState] = useState<"idle" | "inProgress" | "success" | "error">("idle");
	const [selectedDate, setSelectedDate] = useState<Moment>(moment());
	const [activeBookings, setActiveBookings] = useState<StrapiResponseData<Booking>[]>();

	const fetchBookingsByDate = async (date: Moment) => {
		setSelectedDate(date);
		try {
			const { data } = await getBookingsByDate(date);
			setActiveBookings(data.data);
		} catch (error) {}
	};

	const onPanelChange = (value: any, mode: any) => {
		console.log("DATE CHANGE VALUE", value);
		console.log("DATE CHANGE MODE", mode);
		fetchBookingsByDate(value);
	};

	const handleDateChange = (value: Moment) => {
		console.log("DATE CHANGE VALUE", value);
		fetchBookingsByDate(value);
	};

	const onTabChange = (event: any) => {
		console.log("THE CHANGE EVENT ON TAB", event);
	};

	const handleBookingForm = async (formValues: FormValues) => {
		console.log("THE POST BODY RECEIVED IS", formValues);
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
			// const {
			// 	data: {
			// 		data: { id: bookingId, attributes: booking },
			// 	},
			// } =
			await createBooking(formValues, tripId, clientId);
			setApiState("success");
		} catch (error) {
			setApiState("error");
		}
	};

	useEffect(() => {
		const fetchBookings = async () => {
			const { data } = await getBookingsByDate(selectedDate);
			setActiveBookings(data.data);
		};
		fetchBookings();
	}, [selectedDate]);

	console.log("THE CURRENT DATA FETCHED FOR DATE BOOKING", activeBookings);

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
						/>
					</Col>
					<Col span={12}>
						<Tabs className="tabContainer" defaultActiveKey="1" onChange={onTabChange}>
							{activeBookings &&
								activeBookings.map((booking, index) => {
									return (
										<TabPane tab={"April 5"} key={index.toString()}>
											<TripDescription bookingInfo={booking} />
										</TabPane>
									);
								})}
							{/* <TabPane tab="Tab 2" key="2">
								<TripDescription />
							</TabPane>
							<TabPane tab="Tab 3" key="3">
								<TripDescription />
							</TabPane> */}
						</Tabs>
					</Col>
				</Row>
				<>
					<Typography>Feed</Typography>
					{apiState !== "success" && <BookingForm onFormSubmit={handleBookingForm} />}
					{apiState === "success" && <p>Created a booking</p>}
					{apiState === "inProgress" && <Spin size="large" />}
				</>
			</Space>
			{/* Section 1 : Date picker and details */}
		</Layout>
	);
};

export default Home;
