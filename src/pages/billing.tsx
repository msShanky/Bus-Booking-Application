import React, { FunctionComponent } from "react";
import AppLayout from "../components/AppLayout";
import { DatePicker, Input, Row, Space, Table } from "antd";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios, { AxiosResponse } from "axios";
const { Search } = Input;

const columns = [
	{ title: "ID", dataIndex: "id", key: "id" },
	{ title: "Name", dataIndex: "name", key: "name" },
	{ title: "Address", dataIndex: "address", key: "address" },
	{ title: "Contact", dataIndex: "contact", key: "contact" },
	{ title: "Bill No", dataIndex: "billNumber", key: "billNumber" },
	{
		title: "Action",
		key: "action",
		render: (text: string, record: any) => (
			<Space size="middle">
				<a>Invite</a>
				<a>Delete</a>
			</Space>
		),
	},
];

type NextProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Billing: FunctionComponent<NextProps> = (props) => {
	console.log("THE PROPS ON BILLING PAGE", props);

	return (
		<AppLayout>
			<Row gutter={8} justify="space-between">
				<Search style={{ width: "40%" }} />
				<DatePicker />
			</Row>
			<Row style={{ marginTop: "2em" }} gutter={8}>
				<Table style={{ width: "100%", minHeight: "700px" }} columns={columns} dataSource={[]} />
			</Row>
		</AppLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const API_URL = process.env.API_URL || "http://localhost:1337/api";
	const { data } = await axios.get<AxiosResponse<StrapiResponseType<Invoice>>>(`${API_URL}/invoices`, {
		params: {
			populate: "*",
		},
	});

	console.log("THE BUS RESPONSE VIA API", data);

	return {
		props: {
			buses: data,
		},
	};
};

export default Billing;
