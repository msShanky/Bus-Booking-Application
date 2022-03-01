import React, { FunctionComponent } from "react";
import AppLayout from "../components/AppLayout";
import { DatePicker, Input, Row, Space, Table } from "antd";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios, { AxiosResponse } from "axios";
const { Search } = Input;

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
		render: (text: string, record: any) => (
			<Space size="middle">
				<a>Invite</a>
				<a>Delete</a>
			</Space>
		),
	},
];

type NextProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Buses: FunctionComponent<NextProps> = (props) => {
	const { buses } = props;
	const { data } = buses;

	console.log("PROPS DATA IS", buses);

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
