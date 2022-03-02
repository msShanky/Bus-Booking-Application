import React, { FunctionComponent, useState } from "react";
import AppLayout from "../components/AppLayout";
import { Button, DatePicker, Input, Row, Space, Table } from "antd";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios, { AxiosResponse } from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Search } = Input;
import { CustomModal, confirm } from "../components/common/CustomModal";
import { BusForm } from "../components/common/BusForm";
import { API_URL, fetchBuses } from "../helpers/apiHandler";

type NextProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Buses: FunctionComponent<NextProps> = (props) => {
	const { buses: preFetchedBuses } = props;
	const { data } = preFetchedBuses;
	const [buses, setBuses] = useState(data);
	const [showEditPopUp, setShowEditPopUp] = useState(false);
	const [activeItem, setActiveItem] = useState<StrapiResponseData<Bus>>();
	const [isLoading, setIsLoading] = useState(false);

	const handleCancel = () => {
		setShowEditPopUp(false);
	};

	const handleFormSubmit = async (values: Bus) => {
		setIsLoading(true);
		const url = `${API_URL}/buses/1`;
		console.log("THE API URL FOR BUSES", url);
		await axios.put(url, {
			data: values,
		});
		setIsLoading(false);
		setShowEditPopUp(false);
		const {
			data: { data },
		} = await fetchBuses();
		setBuses(data);
	};

	const handleConfirmation = (activeId: number) => {
		console.log(" ********** DELETE THE ITEM ********** ", activeId);
	};

	const columns = [
		{ title: "ID", dataIndex: "id", key: "id" },
		{ title: "Bus No", dataIndex: ["attributes", "busNumber"], key: "busNumber" },
		{ title: "RC", dataIndex: ["attributes", "rc"], key: "rc" },
		{ title: "FC", dataIndex: ["attributes", "fc"], key: "fc" },
		{ title: "Insurance", dataIndex: ["attributes", "insurance"], key: "insurance" },
		{ title: "License", dataIndex: ["attributes", "license"], key: "license" },
		{
			title: "Action",
			key: "action",
			render: (record: any) => (
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
				title="Buses"
				isVisible={showEditPopUp}
				handleCancel={handleCancel}
				handleSubmit={() => console.log("SUBMIT WAS CLICKED")}
				isLoading={isLoading}
			>
				<BusForm
					initialValues={activeItem as StrapiResponseData<Bus>}
					handleFormSubmit={handleFormSubmit}
					handleReset={handleCancel}
				/>
			</CustomModal>
			<Row gutter={8} justify="space-between">
				<Search style={{ width: "40%" }} />
			</Row>
			<Row style={{ marginTop: "2em" }} gutter={8}>
				<Table style={{ width: "100%", minHeight: "700px" }} columns={columns} dataSource={buses} />
			</Row>
		</AppLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const API_URL = process.env.API_URL || "https://bus-booking-cms.herokuapp.com/api";
	const { data } = await axios.get<AxiosResponse<StrapiResponseType<Bus>>>(`${API_URL}/buses`, {
		params: {
			populate: "*",
			publicationState: "preview",
		},
	});

	console.log("THE BUS RESPONSE VIA API", data);

	return {
		props: {
			buses: data,
		}, // will be passed to the page component as props
	};
};

export default Buses;
