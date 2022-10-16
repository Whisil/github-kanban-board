import { GithubOutlined } from "@ant-design/icons";
import { Col, Layout, Row, Space, Spin } from "antd";
import Column from "../common/components/column";
import Header from "../common/components/header";
import SubHeader from "../common/components/subHeader";
import styles from "../styles/app.module.css";
import { useAppSelector } from "./hooks";

function App() {
  const { issuesList, isLoading } = useAppSelector((state) => state.issues);
  return (
    <Layout className={styles.layout}>
      <Header />
      {issuesList.length !== 0 && !isLoading ? (
        <>
          <SubHeader />
          <Row gutter={20} className={styles.row}>
            <Col span={8}>
              <Column title="To Do" />
            </Col>

            <Col span={8}>
              <Column title="In Progress" />
            </Col>

            <Col span={8}>
              <Column title="Done" />
            </Col>
          </Row>
        </>
      ) : !isLoading ? (
        <Space direction="vertical" className={styles["no-content"]}>
          <GithubOutlined style={{ fontSize: `100px` }} />
          <h2 className={styles["no-content-phrase"]}>
            Go ahead, load something
          </h2>
        </Space>
      ) : (
        <Spin className={styles.spinner} />
      )}
    </Layout>
  );
}

export default App;
