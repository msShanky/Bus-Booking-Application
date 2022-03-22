import type { NextPage } from "next";
import { Button, Calendar, Col, message, Result, Row, Space, Tabs, Typography } from "antd";
import Layout from "../components/AppLayout";
import { BookingForm } from "../components/BookingForm";
import { TripDescription } from "../components/common/TripDescription";
import { BookingFormValues } from "../types/BookingForm";
import {
	createBooking,
	createClient,
	createTrip,
	getBookingsByDate,
	getBookingsByMonth,
	updateBooking,
	deleteBooking,
} from "../helpers/apiHandler";
import { Component, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Spin } from "antd";
import moment, { Moment } from "moment";
import { findDateRange, getClientInfo, getMonthlyTripDates } from "../helpers/dataFormatter";
import { CustomModal } from "../components/common/CustomModal";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import Print from "../components/common/Print";
const { TabPane } = Tabs;
const { Title } = Typography;

type BookingType = Array<StrapiResponseData<Booking>>;

const Home: NextPage = () => {
	const [apiState, setApiState] = useState<ApiState>("idle");
	const [selectedDate, setSelectedDate] = useState<Moment>(moment());
	const [showEditPopUp, setShowEditPopUp] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [activeBookings, setActiveBookings] = useState<StrapiResponseData<Booking>[]>();
	const [activeBooking, setActiveBooking] = useState<StrapiResponseData<Booking>>();
	const [bookings, setBookings] = useState<BookingType>([]);
	const [availableBookings, setAvailableBookings] = useState<Array<string>>([]);
	const [dateRange, setDateRange] = useState([
		moment().startOf("month").format("YYYY-MM-DD"),
		moment().endOf("month").format("YYYY-MM-DD"),
	]);
	const printRef = useRef<HTMLDivElement | null>(null);

	const handleAfterPrint = useCallback(() => {
		console.log("`onAfterPrint` called");
	}, []);

	const handleBeforePrint = useCallback(() => {
		console.log("`onBeforePrint` called");
	}, []);

	const reactToPrintContent = useCallback(() => {
		return printRef.current;
	}, [printRef.current]);

	const handlePrint = useReactToPrint({
		content: reactToPrintContent,
		documentTitle: "AwesomeFileName",
		onBeforePrint: handleBeforePrint,
		onAfterPrint: handleAfterPrint,
		removeAfterPrint: true,
	});

	const fetchBookingsByDate = async (date = moment()) => {
		setSelectedDate(date);
		try {
			const { data } = await getBookingsByDate(date);
			setActiveBookings(data.data);
		} catch (error) {}
	};

	const onPanelChange = (value: any, mode: any) => {
		fetchBookingsByDate(value);
		setDateRange(findDateRange(value));
	};

	const handleDateChange = (value: Moment) => {
		fetchBookingsByDate(value);
		setDateRange(findDateRange(value));
	};

	const onTabChange = (event: any) => {};

	const handleBookingForm = async (formValues: BookingFormValues) => {
		setApiState("inProgress");
		try {
			const {
				data: {
					data: { id: tripId },
				},
			} = await createTrip(formValues);
			const {
				data: {
					data: { id: clientId },
				},
			} = await createClient(getClientInfo(formValues));
			await createBooking(formValues, tripId, clientId);
			setApiState("success");
		} catch (error) {
			setApiState("error");
		}
	};

	const handleBookingEdit = async (formValues: BookingFormValues) => {
		await updateBooking(activeBooking as StrapiResponseData<Booking>, formValues);
	};

	const dateCellRender = (date: Moment): ReactNode => {
		const cellDate = date.format("YYYY-MM-DD");
		const isBooked = availableBookings.includes(cellDate);
		return isBooked && <span className="calendarBooking" />;
	};

	const fetchBookings = async () => {
		const { data } = await getBookingsByMonth(dateRange);
		const { data: strapiResponse } = data;
		if (strapiResponse.length === 0) {
			setActiveBookings(undefined);
			setBookings([]);
			setActiveBooking(undefined);
			setAvailableBookings([]);
			return;
		}

		strapiResponse.forEach((apiBooking) => {
			const { id } = apiBooking;
			const existingIndex = bookings.findIndex(({ id: bookingId }) => {
				return bookingId === id;
			});
			if (existingIndex >= 0) {
				const updatedBookings = [...bookings.slice(0, existingIndex), apiBooking, ...bookings.slice(existingIndex)];
				setBookings(updatedBookings);
				const monthlyTripDates = getMonthlyTripDates(updatedBookings);
				setAvailableBookings(monthlyTripDates);
				return;
			}
			const updatedBookings: Array<StrapiResponseData<Booking>> = [...bookings, ...strapiResponse];
			setBookings(updatedBookings);
			const monthlyTripDates = getMonthlyTripDates(updatedBookings);
			setAvailableBookings(monthlyTripDates);
		});
	};

	const handleCancel = () => {
		setShowEditPopUp(false);
		setActiveBooking(undefined);
	};

	const handleBookingDelete = async (booking: StrapiResponseData<Booking>) => {
		setActiveBooking(booking);
		setIsLoading(true);
		try {
			await deleteBooking(booking);
			await fetchBookings();
			message.success(`Successfully deleted booking id: ${booking.id}`);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			message.error(`Error deleting booking id: ${booking.id} and it's dependencies`);
		}
	};

	const handleBookingPrinting = (booking: StrapiResponseData<Booking>) => {
		console.log("this would trigger the print function", booking);
		setActiveBooking(booking);
		handlePrint();
	};

	const toggleEditForm = (booking: StrapiResponseData<Booking>) => {
		setActiveBooking(booking);
		setShowEditPopUp(!showEditPopUp);
	};

	useEffect(() => {
		fetchBookings();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDate, dateRange]);

	useEffect(() => {
		fetchBookings();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout>
			<CustomModal
				title="Buses"
				isVisible={showEditPopUp}
				handleCancel={handleCancel}
				isLoading={isLoading}
				width={900}
			>
				<BookingForm initialValue={activeBooking} onFormSubmit={handleBookingEdit} handleCancel={handleCancel} />
			</CustomModal>
			{/* <ReactToPrint content={() => printRef.current} /> */}
			<div style={{ display: "none" }}>
				<Print booking={activeBooking as StrapiResponseData<Booking>} ref={printRef} />
			</div>
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
											<TripDescription
												onDelete={() => handleBookingDelete(booking)}
												onPrint={() => handleBookingPrinting(booking)}
												onEdit={() => toggleEditForm(booking)}
												bookingInfo={booking}
											/>
										</TabPane>
									);
								})}
						</Tabs>
					</Col>
				</Row>
				<>
					<Title level={4}>Feed</Title>
					{apiState !== "success" && apiState !== "inProgress" && (
						<BookingForm
							initialValue={activeBooking}
							onFormSubmit={handleBookingForm}
							handleCancel={handleCancel}
							isCreateForm
						/>
					)}
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
		</Layout>
	);
};

export default Home;
