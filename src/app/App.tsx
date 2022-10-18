import { GithubOutlined } from "@ant-design/icons";
import { Layout, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import Header from "../common/components/header";
import SubHeader from "../common/components/subHeader";
import { useAppSelector } from "./hooks";

import styles from "../styles/app.module.css";
import DragNDrop from "../common/components/dragNDrop";

function App() {
  const [toDoIssues, setToDoIssues] = useState<any[]>([]);
  const [inProgressIssues, setInProgressIssues] = useState<any[]>([]);
  const [doneIssues, setDoneIssues] = useState<any[]>([]);

  const { issuesList, isLoading } = useAppSelector((state) => state.issues);

  useEffect(() => {
    if (issuesList.length !== 0) {
      issuesList[0].forEach((item: any) => {
        if (!item.closedAtTimestamp && item.assignees.length === 0) {
          setToDoIssues((prevState) => [...prevState, item]);
        } else if (!item.closedAtTimestamp && item.assignees.length !== 0) {
          setInProgressIssues((prevState) => [...prevState, item]);
        } else if (item.closedAtTimestamp) {
          setDoneIssues((prevState) => [...prevState, item]);
        }
      });
    } else if (
      (issuesList.length === 0 && inProgressIssues.length !== 0) ||
      doneIssues.length !== 0 ||
      toDoIssues.length !== 0
    ) {
      setToDoIssues([]);
      setInProgressIssues([]);
      setDoneIssues([]);
    }
  }, [issuesList]); //eslint-disable-line

  return (
    <Layout className={styles.layout}>
      <Header />
      {issuesList.length !== 0 &&
      (toDoIssues.length !== 0 ||
        inProgressIssues.length !== 0 ||
        doneIssues.length !== 0) &&
      !isLoading ? (
        <>
          <SubHeader />
          <DragNDrop
            toDo={toDoIssues}
            inProgress={inProgressIssues}
            done={doneIssues}
          />
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
