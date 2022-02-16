import React from "react";
import Link from "next/link";
import { Button, Col, Layout, Menu, Row } from "antd";
const { Header } = Layout;

type PageLink = {
	url: string;
	label: string;
};

const pageLinks: Array<PageLink> = [
	{
		url: "/",
		label: "Home",
	},
	{
		url: "/planner",
		label: "Planner",
	},
	{
		url: "/client",
		label: "Client",
	},
	{
		url: "/buses",
		label: "Buses",
	},
	{
		url: "/billing",
		label: "Billing",
	},
];

export const AppHeader = () => {
	return (
		<Header>
			<Row justify="space-between" align="middle">
				<Col>
					<div className="logo" />
				</Col>
				<Col span={pageLinks.length + 1}>
					{pageLinks.map((pageLink, index) => {
						const key = `MENU_ITEM_${index + 1}`;
						const { label, url } = pageLink;
						return (
							<Link key={key} href={url} passHref>
								<Button type="link">{label}</Button>
							</Link>
						);
					})}
				</Col>
			</Row>
		</Header>
	);
};
