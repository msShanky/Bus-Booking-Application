import { DatePicker, Input, Row, Space, Table } from "antd";
import React from "react";
import AppLayout from "../components/AppLayout";
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

const Client = () => {
  const data: any[] = [
    {
      id: "123",
      name: "Nithyarooban",
      address: "123, abc road, trichy",
      contact: "+91 6380323242",
      billNumber: "H3015",
    },
    {
      id: "456",
      name: "Nithyarooban",
      address: "123, abc road, trichy",
      contact: "+91 6380323242",
      billNumber: "H3015",
    },
    {
      id: "789",
      name: "Nithyarooban",
      address: "123, abc road, trichy",
      contact: "+91 6380323242",
      billNumber: "H3015",
    },
  ];
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

export default Client;
