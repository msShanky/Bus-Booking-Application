import { DatePicker, Input, Row, Space, Table } from "antd";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps, InferGetServerSidePropsType, NextPageContext } from "next";
import React, { FunctionComponent } from "react";
import AppLayout from "../components/AppLayout";
const { Search } = Input;

const columns = [
	{ title: "ID", dataIndex: "id", key: "id" },
	{ title: "Name", dataIndex: ["attributes", "name"], key: "name" },
	{ title: "Address", dataIndex: ["attributes", "address"], key: "address" },
	{ title: "Contact", dataIndex: ["attributes", "contact"], key: "contact" },
	{ title: "Bill No", dataIndex: ["attributes", "billNumber"], key: "billNumber" },
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

const Client: FunctionComponent<NextProps> = (props) => {
	const { clients } = props;
	const { data } = clients;
	console.log("CLIENTS AS PROPS", data);

	return (
		<AppLayout>
			<Row gutter={8} justify="space-between">
				<Search style={{ width: "40%" }} />
				<DatePicker />
			</Row>
			<Row style={{ marginTop: "2em" }} gutter={8}>
				<Table style={{ width: "100%", minHeight: "700px" }} columns={columns} dataSource={data} />
			</Row>
		</AppLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const API_URL = process.env.API_URL || "http://localhost:1337/api";
	const { data } = await axios.get<AxiosResponse<StrapiResponseType<Client>>>(`${API_URL}/clients`, {
		params: {
			populate: "*",
			publicationState: "preview",
		},
	});

	console.log("THE CLIENT RESPONSE VIA API", data);

	return {
		props: {
			clients: data,
		}, // will be passed to the page component as props
	};
};

export default Client;
