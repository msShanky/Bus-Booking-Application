import type { NextPage } from "next";
import { Calendar, Col, Descriptions, Row, Space, Tabs, Typography } from "antd";
import Layout from "../components/AppLayout";
import { BookingForm } from "../components/BookingForm";
import { TripDescription } from "../components/common/TripDescription";
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
                <TripDescription />
              </TabPane>
              <TabPane tab="Tab 2" key="2">
                <TripDescription />
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                <TripDescription />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <>
          <Typography>Feed</Typography>
          <BookingForm />
        </>
      </Space>
      {/* Section 1 : Date picker and details */}
    </Layout>
  );
};

export default Home;
