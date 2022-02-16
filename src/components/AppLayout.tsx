import React, { FunctionComponent } from "react";
import { AppHeader } from "./common/AppHeader";
import { Layout } from "antd";
const { Content } = Layout;

const AppLayout: FunctionComponent = ({ children }) => {
	return (
		<Layout hasSider={false} className="layout">
			<AppHeader />
			<Content className="app-container">{children}</Content>
		</Layout>
	);
};

export default AppLayout;
