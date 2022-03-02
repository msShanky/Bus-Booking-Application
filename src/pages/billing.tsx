import React, { FunctionComponent, useState } from "react";
import AppLayout from "../components/AppLayout";
import { Button, DatePicker, Input, Row, Space, Table, Typography } from "antd";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios, { AxiosResponse } from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CustomModal, confirm } from "../components/common/CustomModal";
import { InvoiceForm, InvoiceFormType } from "../components/common/InvoiceForm";
import { createInvoice, fetchBookings } from "../helpers/apiHandler";
const { Search } = Input;

type NextProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Billing: FunctionComponent<NextProps> = (props) => {
	const { bookings: preFetchedBookings } = props;
	const [bookings, setBooking] = useState(preFetchedBookings);
	const [showEditPopUp, setShowEditPopUp] = useState(false);
	const [activeItem, setActiveItem] = useState<StrapiResponseData<Booking>>();
	const [isLoading, setIsLoading] = useState(false);

	console.log("BOOKINGS FETCHED ARE", bookings);

	const handleConfirmation = (activeId: number) => {
		console.log(" ********** DELETE THE ITEM ********** ", activeId);
	};

	const handleCancel = () => {
		setShowEditPopUp(false);
	};

	const handleFormSubmit = async (formValues: InvoiceFormType) => {
		await createInvoice(formValues, activeItem as StrapiResponseData<Booking>);
		await fetchBookings();
	};

	const columns = [
		{ title: "ID", dataIndex: "id", key: "id" },
		{ title: "Name", dataIndex: ["attributes", "client", "data", "attributes", "name"], key: "name" },
		{
			title: "Trip",
			key: "place",
			render: (record: StrapiResponseData<Booking>) => {
				console.log("RECORD RECEIVED FOR EACH ROW IS", record);
				const { attributes } = record;
				const { trip } = attributes;
				return (
					<Typography>
						{trip?.data.attributes.source} - {trip?.data.attributes.destination}
					</Typography>
				);
			},
		},
		{ title: "KM", dataIndex: ["attributes", "kilometer"], key: "contact" },
		{ title: "Quoted Price", dataIndex: "id", key: "quotedPrice" },
		{
			title: "Action",
			key: "action",
			render: (record: StrapiResponseData<Booking>) => (
				<Space size="middle">
					<Button
						onClick={() => {
							setActiveItem(record);
							setShowEditPopUp(!showEditPopUp);
						}}
						style={{ outline: "none", border: "none" }}
					>
						<EditOutlined />
					</Button>
					<Button
						onClick={() => confirm(() => handleConfirmation(record.id), handleCancel)}
						style={{ outline: "none", border: "none" }}
					>
						<DeleteOutlined />
					</Button>
				</Space>
			),
		},
	];

	return (
		<AppLayout>
			<CustomModal
				title="Invoice"
				isVisible={showEditPopUp}
				handleCancel={handleCancel}
				handleSubmit={() => console.log("SUBMIT WAS CLICKED")}
				isLoading={isLoading}
				width={1200}
			>
				<InvoiceForm
					initialValues={activeItem as StrapiResponseData<Booking>}
					handleFormSubmit={handleFormSubmit}
					handleReset={handleCancel}
				/>
			</CustomModal>
			<Row gutter={8} justify="space-between">
				<Search style={{ width: "40%" }} />
			</Row>
			<Row style={{ marginTop: "2em" }} gutter={8}>
				<Table style={{ width: "100%", minHeight: "700px" }} columns={columns} dataSource={bookings} />
			</Row>
		</AppLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const API_URL = process.env.API_URL || "https://bus-booking-cms.herokuapp.com/api";
	console.log("API URL FOR FETCHING BOOKINGS ", API_URL);
	const {
		data: { data },
	} = await fetchBookings();
	// const {
	// 	data: { data },
	// } = await axios.get<AxiosResponse<StrapiResponseType<Booking>>>(`${API_URL}/bookings`, {
	// 	params: {
	// 		populate: "*",
	// 	},
	// });

	console.log("THE BUS RESPONSE VIA API", data);

	return {
		props: {
			bookings: data,
		},
	};
};

export default Billing;
