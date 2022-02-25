import React from "react";
import { Button, Descriptions, Space } from "antd";

const TabActionTray = () => {
  return (
    <Space size={8}>
      <Button>Edit</Button>
      <Button>Delete</Button>
      <Button>Print</Button>
    </Space>
  );
};

export const TripDescription = () => {
  return (
    <>
      <Descriptions layout="horizontal" extra={TabActionTray()}>
        <Descriptions.Item label="Name">Shankara Narayanan</Descriptions.Item>
        <Descriptions.Item label="Date">05/04/2022</Descriptions.Item>
        <Descriptions.Item label="Place">
          <br />
          From: Trichy
          <br />
          To:Bangalore
        </Descriptions.Item>
        <Descriptions.Item label="Time">10.45am</Descriptions.Item>
        <Descriptions.Item label="Estimate">800km</Descriptions.Item>
        <Descriptions.Item label="Diesel">100 litres</Descriptions.Item>
        <Descriptions.Item label="Bill No">H12kj1</Descriptions.Item>
        <Descriptions.Item label="Contact">+91 8939358304</Descriptions.Item>
        <Descriptions.Item label="Total">60,000</Descriptions.Item>
        <Descriptions.Item label="Advance">20,000</Descriptions.Item>
        <Descriptions.Item label="Balance">40,000</Descriptions.Item>
      </Descriptions>
    </>
  );
};
