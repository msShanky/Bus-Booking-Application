import React from "react";
import Link from "next/link";
import { Button, Col, Layout, Menu, Row } from "antd";
import { useRouter } from "next/router";
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
	const router = useRouter();
	return (
		<Header className="booking-header">
			<Row justify="space-between" align="middle">
				<Col>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img className="logogrey" src={"/logo_gray.png"} alt="KNT Travels" />
				</Col>
				<Col span={pageLinks.length + 1}>
					{pageLinks.map((pageLink, index) => {
						const key = `MENU_ITEM_${index + 1}`;
						const { label, url } = pageLink;
						return (
							<Link key={key} href={url} passHref>
								<Button className={`${url === router.route && "active"}`} type="link">
									{label}
								</Button>
							</Link>
						);
					})}
				</Col>
			</Row>
		</Header>
	);
};
