import React from "react";
import { Calendar } from "antd";
import AppLayout from "../components/AppLayout";

const Planner = () => {
  const onPanelChange = (value: any, mode: any) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <AppLayout>
      <Calendar onPanelChange={onPanelChange} />
    </AppLayout>
  );
};

export default Planner;
