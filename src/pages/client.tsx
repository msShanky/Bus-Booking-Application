import { Button, DatePicker, Input, Row, Space, Table } from "antd";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps, InferGetServerSidePropsType, NextPageContext } from "next";
import React, { FunctionComponent, useState } from "react";
import AppLayout from "../components/AppLayout";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { CustomModal, confirm } from "../components/common/CustomModal";
import { ClientForm } from "../components/common/ClientForm";
import { API_URL, fetchClients, deleteClient } from "../helpers/apiHandler";
const { Search } = Input;

type NextProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Client: FunctionComponent<NextProps> = (props) => {
	const { clients: preFetchedClients } = props;
	const { data } = preFetchedClients;
	const [showEditPopUp, setShowEditPopUp] = useState(false);
	const [activeItem, setActiveItem] = useState<StrapiResponseData<Client>>();
	const [isLoading, setIsLoading] = useState(false);
	const [clients, setClients] = useState(data);

	const handleCancel = () => {
		setShowEditPopUp(false);
	};

	const handleFormSubmit = async (values: Client) => {
		setIsLoading(true);
		const url = `${API_URL}/clients/${activeItem?.id}`;
		await axios.put(url, {
			data: values,
		});
		setIsLoading(false);
		setShowEditPopUp(false);
		const {
			data: { data },
		} = await fetchClients();
		setClients(data);
	};

	const handleConfirmation = async (id: number) => {
		console.log(" ********** DELETE THE ITEM ********** ", activeItem?.id, id);
		await deleteClient(id);
	};

	const columns = [
		{ title: "ID", dataIndex: "id", key: "id" },
		{ title: "Name", dataIndex: ["attributes", "name"], key: "name" },
		{ title: "Address", dataIndex: ["attributes", "address"], key: "address" },
		{ title: "Contact", dataIndex: ["attributes", "contact"], key: "contact" },
		{
			title: "Action",
			key: "action",
			render: (record: StrapiResponseData<Client>) => {
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
							onClick={() => {
								setActiveItem(record);
								confirm(() => handleConfirmation(record.id), handleCancel);
							}}
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
				title="Client"
				isVisible={showEditPopUp}
				handleCancel={handleCancel}
				handleSubmit={() => console.log("SUBMIT WAS CLICKED")}
				isLoading={isLoading}
			>
				<ClientForm
					initialValues={{
						name: activeItem?.attributes.name ?? "",
						contact: activeItem?.attributes.contact ?? "",
						address: activeItem?.attributes.address ?? "",
					}}
					handleFormSubmit={handleFormSubmit}
					handleReset={handleCancel}
				/>
			</CustomModal>
			<Row gutter={8} justify="space-between">
				<Search style={{ width: "40%" }} />
			</Row>
			<Row style={{ marginTop: "2em" }} gutter={8}>
				<Table style={{ width: "100%", minHeight: "700px" }} columns={columns} dataSource={clients} />
			</Row>
		</AppLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const API_URL = process.env.API_URL || "https://bus-booking-cms.herokuapp.com/api";
	const { data } = await axios.get<AxiosResponse<StrapiResponseType<Client>>>(`${API_URL}/clients`, {
		params: {
			populate: "*",
			publicationState: "preview",
		},
	});

	return {
		props: {
			clients: data,
		}, // will be passed to the page component as props
	};
};

export default Client;
