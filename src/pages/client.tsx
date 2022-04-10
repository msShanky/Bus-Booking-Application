import { Button, Input, message, Popconfirm, Row, Space, Table } from "antd";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { FunctionComponent, useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { CustomModal } from "../components/common/CustomModal";
import { ClientForm } from "../components/common/ClientForm";
import { fetchClients, deleteClient, updateClient, createClient } from "../helpers/apiHandler";
const { Search } = Input;

// type NextProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Client: FunctionComponent = (props) => {
	// const { clients: preFetchedClients } = props;
	const [showEditPopUp, setShowEditPopUp] = useState(false);
	const [activeItem, setActiveItem] = useState<StrapiResponseData<Client>>();
	const [isLoading, setIsLoading] = useState(false);
	const [clients, setClients] = useState<StrapiResponseData<Client>[]>([]);
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

	useEffect(() => {
		setIsLoading(true);
		handleClientFetch();
		setIsLoading(false);
	}, []);

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

	const handleConfirmation = async (record: StrapiResponseData<Client>) => {
		setActiveItem(record);
		setIsLoading(true);
		try {
			await deleteClient(record.id);
			setActiveItem(undefined);
			handleClientFetch();
			message.success("The item was deleted successfully!");
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			message.error("There was an error deleting the item");
		}
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
						<Popconfirm
							onConfirm={() => handleConfirmation(record)}
							title="Are you sure?"
							icon={<QuestionCircleOutlined style={{ color: "red" }} />}
						>
							<DeleteOutlined />
						</Popconfirm>
					</Space>
				);
			},
		},
	];

	return (
		<AppLayout>
			<CustomModal title="Client" isVisible={showEditPopUp} handleCancel={handleCancel} isLoading={isLoading}>
				<ClientForm
					isCreateNewForm={isCreateForm as boolean}
					initialValues={{
						name: activeItem?.attributes.name ?? "",
						contact: activeItem?.attributes.contact ?? "",
						address: activeItem?.attributes.address ?? "",
						booking: activeItem?.attributes.booking?.data?.id ?? undefined,
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
		</AppLayout>
	);
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const {
// 		data: { data },
// 	} = await fetchClients();

// 	return {
// 		props: {
// 			clients: data,
// 		}, // will be passed to the page component as props
// 	};
// };

export default Client;
