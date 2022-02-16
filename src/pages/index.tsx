import type { NextPage } from "next";
import { Calendar } from "antd";
import Layout from "../components/AppLayout";

const Home: NextPage = () => {
	const onPanelChange = (event: any) => {
		console.log("DATE CHANGE EVENT", event);
	};
	return (
		<Layout>
			{/* Section 1 : Date picker and details */}
			<div>
				<Calendar fullscreen={false} onPanelChange={onPanelChange} />
			</div>
		</Layout>
	);
};

export default Home;
