import React, { FunctionComponent, useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { Button, DatePicker, Input, message, Row, Space, Table, Typography } from "antd";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CustomModal, confirm } from "../components/common/CustomModal";
import { InvoiceForm } from "../components/common/InvoiceForm";
import {
	createInvoice,
	fetchBookings,
	fetchBookingsWithQuery,
	updateInvoice,
	getBookingsByInvoiceDate,
	deleteBooking,
} from "../helpers/apiHandler";
import { Moment } from "moment";
import { billingFormColumns } from "../components/common/BillingFormColumn";
const { Search } = Input;

type NextProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Billing: FunctionComponent<NextProps> = (props) => {
	const { bookings: preFetchedBookings } = props;
	const [bookings, setBookings] = useState(preFetchedBookings);
	const [showEditPopUp, setShowEditPopUp] = useState(false);
	const [activeItem, setActiveItem] = useState<StrapiResponseData<Booking>>();
	const [dateFilterValue, setDateFilterValue] = useState<Moment>();
	const [apiState, setApiState] = useState<ApiState>("idle");
	const [searchValue, setSearchValue] = useState<string>();

	const handleCancel = () => {
		setShowEditPopUp(false);
		setActiveItem(undefined);
	};

	const afterSuccessUpdates = async () => {
		const {
			data: { data },
		} = await fetchBookings();
		setBookings(data);
		setApiState("success");
		handleCancel();
	};

	const onSearch = async (value: string) => {
		setApiState("inProgress");
		setSearchValue(value);
		try {
			const {
				data: { data },
			} = await fetchBookingsWithQuery(value);
			setBookings(data);
			setApiState("success");
		} catch (error) {
			setApiState("error");
		}
	};

	const handleFormSubmit = async (formValues: InvoiceFormType) => {
		const isInvoiced = activeItem?.attributes.bookingState === "Invoiced";
		setApiState("inProgress");
		if (isInvoiced) {
			try {
				await updateInvoice(formValues, activeItem as StrapiResponseData<Booking>);
				afterSuccessUpdates();
			} catch (error) {
				setApiState("error");
				handleCancel();
			}
			return;
		}

		try {
			await createInvoice(formValues, activeItem as StrapiResponseData<Booking>);
			afterSuccessUpdates();
		} catch (error) {
			setApiState("error");
			handleCancel();
		}
	};

	const handleFormItemEdit = (record: StrapiResponseData<Booking>) => {
		setActiveItem(record);
		setShowEditPopUp(!showEditPopUp);
	};

	const handleDateFilterSelection = async (date: Moment) => {
		setDateFilterValue(date);
		setApiState("inProgress");

		try {
			if (date) {
				const response = await getBookingsByInvoiceDate(date);
				setBookings(response.data.data);
			} else {
				const response = await fetchBookings();
				setBookings(response.data.data);
			}
			setApiState("success");
		} catch (error) {
			setApiState("error");
		}
	};

	useEffect(() => {
		() => setSearchValue("");
	});

	const handleDelete = async (record: StrapiResponseData<Booking>) => {
		setApiState("inProgress");
		try {
			await deleteBooking(record);
			const response = await fetchBookings();
			setBookings(response.data.data);
			setApiState("success");
			message.success(`Successfully deleted booking id: ${record.id}`);
		} catch (error) {
			setApiState("error");
			message.success(`There has been some error deleting booking id: ${record.id}`);
		}
	};

	console.log("The bookings received are", bookings);

	return (
		<AppLayout>
			<CustomModal
				title="Invoice"
				isVisible={showEditPopUp}
				handleCancel={handleCancel}
				isLoading={apiState === "inProgress"}
				width={1200}
			>
				<InvoiceForm
					initialValues={activeItem as StrapiResponseData<Booking>}
					handleFormSubmit={handleFormSubmit}
					handleReset={handleCancel}
					apiState={apiState}
				/>
			</CustomModal>
			<Row gutter={8} justify="space-between">
				<Search allowClear onSearch={onSearch} style={{ width: "40%" }} />
				<DatePicker onChange={(dateValue) => handleDateFilterSelection(dateValue as Moment)} />
			</Row>
			<Row style={{ marginTop: "2em" }} gutter={8}>
				<Table
					loading={apiState === "inProgress"}
					style={{ width: "100%", minHeight: "700px" }}
					columns={billingFormColumns({
						handleEdit: handleFormItemEdit,
						handleDelete,
					})}
					dataSource={bookings}
				/>
			</Row>
		</AppLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const {
		data: { data },
	} = await fetchBookings();

	return {
		props: {
			bookings: data,
		},
	};
};

export default Billing;
