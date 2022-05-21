import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Typography } from "antd";
import { confirm } from "../../components/common/CustomModal";
import moment from "moment";

type ColumnPropType = {
	handleEdit: (record: StrapiResponseData<Booking>) => void;
	handleDelete: (record: StrapiResponseData<Booking>) => void;
};

export const billingFormColumns = (props: ColumnPropType) => {
	const { handleDelete, handleEdit } = props;

	return [
		{ title: "ID", dataIndex: "id", key: "id" },
		{
			title: "Invoice Date",
			key: "invoiceTime",
			dataIndex: ["attributes", "invoice", "data", "attributes", "invoiceDate"],
			render: (record: string) => {
				return <Typography>{record && moment(record).format("DD-MM-YYYY")}</Typography>;
			},
		},
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
		{ title: "Trip Date", dataIndex: ["attributes", "trip", "data", "attributes", "tripDate"], key: "tripDate" },
		{ title: "KM", dataIndex: ["attributes", "kilometer"], key: "contact" },
		{ title: "Quoted Price", dataIndex: ["attributes", "quotedPrice"], key: "quotedPrice" },
		{ title: "Billing Status", dataIndex: ["attributes", "bookingState"], key: "bookingState" },
		{
			title: "Action",
			key: "action",
			render: (record: StrapiResponseData<Booking>) => {
				return (
					<Space size="middle">
						<Button onClick={() => handleEdit(record)} style={{ outline: "none", border: "none" }}>
							<EditOutlined />
						</Button>
						<Popconfirm
							onConfirm={() => handleDelete(record)}
							title="Are you sure, you you be deleting all related items?"
							icon={<QuestionCircleOutlined />}
						>
							<DeleteOutlined />
						</Popconfirm>{" "}
					</Space>
				);
			},
		},
	];
};
