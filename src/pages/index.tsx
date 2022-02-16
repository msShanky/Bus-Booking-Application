import type { NextPage } from "next";
import { Calendar, Col, Descriptions, Row, Space, Tabs } from "antd";
import Layout from "../components/AppLayout";
const { TabPane } = Tabs;

const Home: NextPage = () => {
	const onPanelChange = (event: any) => {
		console.log("DATE CHANGE EVENT", event);
	};

	const onTabChange = (event: any) => {
		console.log("THE CHANGE EVENT ON TAB", event);
	};

	return (
		<Layout>
			<Space className="sectionContainer" size={16} direction="vertical">
				<Row className="sectionOneRow" wrap={false} align="middle" justify="space-around" gutter={[40, 0]}>
					<Col span={12}>
						<Calendar style={{ height: "350px" }} fullscreen={false} onPanelChange={onPanelChange} />
					</Col>
					<Col span={12}>
						<Tabs className="tabContainer" defaultActiveKey="1" onChange={onTabChange}>
							<TabPane tab="Tab 1" key="1">
								<Descriptions layout="horizontal">
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
							</TabPane>
							<TabPane tab="Tab 2" key="2">
								<Descriptions>
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
							</TabPane>
							<TabPane tab="Tab 3" key="3">
								<Descriptions>
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
							</TabPane>
						</Tabs>
					</Col>
				</Row>
				<Row>Section 2</Row>
			</Space>
			{/* Section 1 : Date picker and details */}
		</Layout>
	);
};

export default Home;
