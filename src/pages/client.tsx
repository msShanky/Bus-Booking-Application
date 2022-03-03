import { Button, DatePicker, Input, Row, Space, Table } from "antd";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps, InferGetServerSidePropsType, NextPageContext } from "next";
import React, { FunctionComponent, useState } from "react";
import AppLayout from "../components/AppLayout";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { CustomModal, confirm } from "../components/common/CustomModal";
import { ClientForm } from "../components/common/ClientForm";
import { API_URL, fetchClients, deleteClient, updateClient, createClient } from "../helpers/apiHandler";
const { Search } = Input;

type NextProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Client: FunctionComponent<NextProps> = (props) => {
	const { clients: preFetchedClients } = props;
	const [showEditPopUp, setShowEditPopUp] = useState(false);
	const [activeItem, setActiveItem] = useState<StrapiResponseData<Client>>();
	const [isLoading, setIsLoading] = useState(false);
	const [clients, setClients] = useState(preFetchedClients);
	const [isCreateForm, setIsCreateForm] = useState<boolean>();

	const handleCancel = () => {
		setShowEditPopUp(false);
		setActiveItem(undefined);
	};

	const handleClientFetch = async (queryValue?: string) => {
		const {
			data: { data },
		} = await fetchClients(queryValue);
		setClients(data);
	};

	const onSearch = async (value: string) => {
		setIsLoading(true);
		handleClientFetch(value);
		setIsLoading(false);
	};

	const handleFormSubmit = async (values: Client) => {
		setIsLoading(true);
		if (isCreateForm) {
			await createClient(values);
		} else {
			await updateClient(values, activeItem?.id as number);
		}
		setShowEditPopUp(false);
		handleClientFetch();
		setIsLoading(false);
	};

	const handleConfirmation = async (id: number) => {
		await deleteClient(id);
	};

	const columns = [
		{ title: "ID", dataIndex: "id", key: "id" },
		{ title: "Name", dataIndex: ["attributes", "name"], key: "name" },
		{ title: "Address", dataIndex: ["attributes", "address"], key: "address" },
		{ title: "Contact", dataIndex: ["attributes", "contact"], key: "contact" },
		{ title: "Booking ID", dataIndex: ["attributes", "booking", "data", "id"], key: "contact" },
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
								setIsCreateForm(false);
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
					isCreateNewForm={isCreateForm as boolean}
					initialValues={{
						name: activeItem?.attributes.name ?? "",
						contact: activeItem?.attributes.contact ?? "",
						address: activeItem?.attributes.address ?? "",
						booking: undefined,
					}}
					handleFormSubmit={handleFormSubmit}
					handleReset={handleCancel}
				/>
			</CustomModal>
			<Row gutter={8} justify="space-between">
				<Search allowClear enterButton onSearch={onSearch} style={{ width: "40%" }} />
				<Button
					onClick={() => {
						setIsCreateForm(true);
						setShowEditPopUp(true);
					}}
					type="primary"
				>
					Create New
				</Button>
			</Row>
			<Row style={{ marginTop: "2em" }} gutter={8}>
				<Table
					loading={isLoading}
					style={{ width: "100%", minHeight: "700px" }}
					columns={columns}
					dataSource={clients}
				/>
			</Row>
			{/* <Row>
				<ClientForm handleFormSubmit={() => console.log("HANDLE FORM CREATE")} handleReset={handleCancel} />
			</Row> */}
		</AppLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const {
		data: { data },
	} = await fetchClients();

	return {
		props: {
			clients: data,
		}, // will be passed to the page component as props
	};
};

export default Client;
