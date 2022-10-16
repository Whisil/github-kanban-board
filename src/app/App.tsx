import { GithubOutlined } from "@ant-design/icons";
import { Col, Layout, Row, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import Column from "../common/components/column";
import Header from "../common/components/header";
import SubHeader from "../common/components/subHeader";
import { useAppSelector } from "./hooks";

import styles from "../styles/app.module.css";

function App() {
  const [toDoIssues, setToDoIssues] = useState<any[]>([]);
  const [inProgressIssues, setInProgressIssues] = useState<any[]>([]);
  const [doneIssues, setDoneIssues] = useState<any[]>([]);

  const { issuesList, isLoading } = useAppSelector((state) => state.issues);

  useEffect(() => {
    if (issuesList.length !== 0) {
      issuesList.forEach((item) => {
        if (
          (!item.assignees || item.assignees?.length === 0) &&
          !item.closedAtTimestamp
        ) {
          setToDoIssues((prevState) => [...prevState, item]);
        } else if (
          (item.assignees || item.assignees!.length === 0) &&
          !item.closedAtTimestamp
        ) {
          setInProgressIssues((prevState) => [...prevState, item]);
        } else {
          setDoneIssues((prevState) => [...prevState, item]);
        }
      });
    }
  }, [issuesList]);
  // console.log(toDoIssues)
  return (
    <Layout className={styles.layout}>
      <Header />
      {issuesList.length !== 0 && !isLoading ? (
        <>
          <SubHeader />
          <Row gutter={20} className={styles.row}>
            <Col span={8}>
              <Column title="To Do" issues={toDoIssues} />
            </Col>

            <Col span={8}>
              <Column title="In Progress" issues={inProgressIssues} />
            </Col>

            <Col span={8}>
              <Column title="Done" issues={doneIssues} />
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
