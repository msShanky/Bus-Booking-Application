import React, { FunctionComponent } from "react";
import { AppHeader } from "./common/AppHeader";
import { Layout } from "antd";
const { Content } = Layout;

const AppLayout: FunctionComponent = ({ children }) => {
	return (
		<Layout className="layout">
			<AppHeader />
			<Content>{children}</Content>
		</Layout>
	);
};

export default AppLayout;
