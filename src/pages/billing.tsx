import React, { FunctionComponent, useState } from "react";
import AppLayout from "../components/AppLayout";
import { Button, Input, Row, Space, Table, Typography } from "antd";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CustomModal, confirm } from "../components/common/CustomModal";
import { InvoiceForm } from "../components/common/InvoiceForm";
import { createInvoice, fetchBookings, fetchBookingsWithQuery, updateInvoice } from "../helpers/apiHandler";
const { Search } = Input;

type NextProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Billing: FunctionComponent<NextProps> = (props) => {
	const { bookings: preFetchedBookings } = props;
	const [bookings, setBookings] = useState(preFetchedBookings);
	const [showEditPopUp, setShowEditPopUp] = useState(false);
	const [activeItem, setActiveItem] = useState<StrapiResponseData<Booking>>();
	const [isLoading, setIsLoading] = useState(false);
	const [apiState, setApiState] = useState<ApiState>("idle");
	const [searchValue, setSearchValue] = useState<string>();

	const handleConfirmation = (activeId: number) => {
		console.log(" ********** DELETE THE ITEM ********** ", activeId);
	};

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

	const columns = [
		{ title: "ID", dataIndex: "id", key: "id" },
		{ title: "Name", dataIndex: ["attributes", "client", "data", "attributes", "name"], key: "name" },
		{
			title: "Trip",
			key: "place",
			render: (record: StrapiResponseData<Booking>) => {
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
		{ title: "Quoted Price", dataIndex: ["attributes", "quotedPrice"], key: "quotedPrice" },
		{ title: "Billing Status", dataIndex: ["attributes", "bookingState"], key: "bookingState" },
		{
			title: "Action",
			key: "action",
			render: (record: StrapiResponseData<Booking>) => {
				return (
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
				);
			},
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
					apiState={apiState}
				/>
			</CustomModal>
			<Row gutter={8} justify="space-between">
				<Search allowClear onSearch={onSearch} style={{ width: "40%" }} />
			</Row>
			<Row style={{ marginTop: "2em" }} gutter={8}>
				<Table
					loading={apiState === "inProgress"}
					style={{ width: "100%", minHeight: "700px" }}
					columns={columns}
					dataSource={bookings}
				/>
			</Row>
		</AppLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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
