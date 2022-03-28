import React, { FunctionComponent, useState } from "react";
import AppLayout from "../components/AppLayout";
import { Button, DatePicker, Input, message, Popconfirm, Row, Space, Table } from "antd";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios, { AxiosResponse } from "axios";
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
const { Search } = Input;
import { CustomModal, confirm } from "../components/common/CustomModal";
import { BusForm } from "../components/common/BusForm";
import { API_URL, createBus, deleteBus, fetchBuses } from "../helpers/apiHandler";

type NextProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Buses: FunctionComponent<NextProps> = (props) => {
	const { buses: preFetchedBuses } = props;
	const [buses, setBuses] = useState(preFetchedBuses);
	const [showEditPopUp, setShowEditPopUp] = useState(false);
	const [activeItem, setActiveItem] = useState<StrapiResponseData<Bus>>();
	const [isLoading, setIsLoading] = useState(false);
	const [isCreateForm, setIsCreateForm] = useState(false);

	const handleCancel = () => {
		setShowEditPopUp(false);
		setActiveItem(undefined);
	};

	const onSearch = async (value: string) => {
		const {
			data: { data },
		} = await fetchBuses(value);
		setBuses(data);
	};

	const handleFormSubmit = async (values: BusPostBody) => {
		setIsLoading(true);
		if (isCreateForm) {
			await createBus(values);
		} else {
			const url = `${API_URL}/buses/${activeItem?.id}`;
			await axios.put(url, {
				data: values,
			});
		}
		setIsLoading(false);
		setShowEditPopUp(false);
		const {
			data: { data },
		} = await fetchBuses();
		setBuses(data);
	};

	const handleConfirmation = async (record: StrapiResponseData<Bus>) => {
		setIsLoading(true);
		try {
			const response = await deleteBus(record);
			message.success("Successfully Deleted the item");
			const {
				data: { data },
			} = await fetchBuses();
			setBuses(data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			message.error("Cannot deleted the item");
		}
	};

	const columns = [
		{ title: "ID", dataIndex: "id", key: "id" },
		{ title: "Bus No", dataIndex: ["attributes", "busNumber"], key: "busNumber" },
		{ title: "Engine / Chase No", dataIndex: ["attributes", "rc"], key: "rc" },
		{ title: "FC", dataIndex: ["attributes", "fc"], key: "fc" },
		{ title: "Insurance", dataIndex: ["attributes", "insurance"], key: "insurance" },
		{ title: "Tax No", dataIndex: ["attributes", "license"], key: "license" },
		{
			title: "Action",
			key: "action",
			render: (record: any) => (
				<Space size="middle">
					<Button
						onClick={() => {
							setIsCreateForm(false);
							setActiveItem(record);
							setShowEditPopUp(!showEditPopUp);
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
			),
		},
	];

	return (
		<AppLayout>
			<CustomModal title="Buses" isVisible={showEditPopUp} handleCancel={handleCancel} isLoading={isLoading}>
				<BusForm
					initialValues={activeItem as StrapiResponseData<Bus>}
					handleFormSubmit={handleFormSubmit}
					handleReset={handleCancel}
					isCreateForm={isCreateForm}
				/>
			</CustomModal>
			<Row gutter={8} justify="space-between">
				<Search enterButton allowClear onSearch={onSearch} style={{ width: "40%" }} />
				<Button
					onClick={() => {
						setIsCreateForm(true);
						setShowEditPopUp(true);
					}}
					type="primary"
				>
					Add New
				</Button>
			</Row>
			<Row style={{ marginTop: "2em" }} gutter={8}>
				<Table style={{ width: "100%", minHeight: "700px" }} columns={columns} dataSource={buses} />
			</Row>
		</AppLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const {
		data: { data },
	} = await fetchBuses();

	return {
		props: {
			buses: data,
		}, // will be passed to the page component as props
	};
};

export default Buses;
