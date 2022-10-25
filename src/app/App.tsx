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
  const [issuesOrder, setIssuesOrder] = useState(
    JSON.parse(window.localStorage.getItem("savedRepos")!)
      ? JSON.parse(window.localStorage.getItem("savedRepos")!)
      : []
  );

  const { issuesList, isLoading, repoInfo } = useAppSelector(
    (state) => state.issues
  );

  useEffect(() => {
    const indexOfRepo = issuesOrder
      .map((obj: any) => obj.repo)
      .indexOf(repoInfo?.repoName);
    if (
      (issuesOrder.length !== 0 &&
        issuesOrder.some((el: any) => el.repo === repoInfo?.repoName)) ||
      issuesList.length !== 0
    ) {
      const repoOrder = issuesOrder[indexOfRepo]
        ? issuesOrder[indexOfRepo].items
        : [[], [], []];

      issuesList[0].forEach((item: any) => {
        if (repoOrder[0].includes(item.issueNumber)) {
          setToDoIssues((prevState) => [...prevState, item]);
        } else if (repoOrder[1].includes(item.issueNumber)) {
          setInProgressIssues((prevState) => [...prevState, item]);
        } else if (repoOrder[2].includes(item.issueNumber)) {
          setDoneIssues((prevState) => [...prevState, item]);
        } else if (!item.closedAtTimestamp && item.assignees.length === 0) {
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
  }, [issuesList, issuesOrder, repoInfo]); //eslint-disable-line

  useEffect(() => {
    setIssuesOrder(
      JSON.parse(window.localStorage.getItem("savedRepos")!)
        ? JSON.parse(window.localStorage.getItem("savedRepos")!)
        : []
    );
  }, [repoInfo, issuesList]);

  const handleIndexSorting = (
    arr: any,
    type: "toDo" | "inProgress" | "done"
  ) => {
    if (
      issuesOrder.length !== 0 &&
      arr.length !== 0 &&
      issuesOrder.some((el: any) => el.repo === repoInfo?.repoName)
    ) {
      const indexOfRepo = [...issuesOrder]
        .map((obj: any) => obj.repo)
        .indexOf(repoInfo?.repoName);
      const repoOrder = issuesOrder[indexOfRepo].items;
      const newOrder = repoOrder[
        type === "toDo" ? 0 : type === "inProgress" ? 1 : 2
      ]
        .map((item: number) => arr.find((obj: any) => obj.issueNumber === item))
        .filter((obj: any) => obj);

      const newItems = arr.filter(
        (item: any) =>
          !newOrder.some((obj: any) => item.issueNumber === obj.issueNumber)
      );
      return [...newOrder, ...newItems];
    } else {
      return arr;
    }
  };

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
            toDo={handleIndexSorting(toDoIssues, "toDo")}
            inProgress={handleIndexSorting(inProgressIssues, "inProgress")}
            done={handleIndexSorting(doneIssues, "done")}
          />
        </>
      ) : !isLoading ? (
        <Space direction="vertical" className={styles["no-content"]}>
          <GithubOutlined style={{ fontSize: `100px` }} />
          <h2
            className={styles["no-content-phrase"]}
            data-test="preview-phrase"
          >
            Go ahead, load something
          </h2>
        </Space>
      ) : (
        <Spin className={styles.spinner} data-test="spinner" />
      )}
    </Layout>
  );
}

export default App;
