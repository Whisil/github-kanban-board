import { Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import IssueCard from "../card";
import Column from "../column";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import styles from "./styles.module.css";
import { useAppSelector } from "../../../app/hooks";

interface DragNDropProps {
  toDo: any[];
  inProgress: any[];
  done: any[];
}

const DragNDrop = ({ toDo, inProgress, done }: DragNDropProps) => {
  const { repoInfo } = useAppSelector((state) => state.issues);
  const [issueColumns, setIssueColumns] = useState<{
    [key: string]: { title: string; items: any[] };
  }>({
    "To-Do-column": {
      title: "To Do",
      items: toDo,
    },
    "In-Progress-Column": {
      title: "In Progress",
      items: inProgress,
    },
    "Done-Column": {
      title: "Done",
      items: done,
    },
  });
  const [issueRepoStorage, setIssueRepoStorage] = useState<{
    repo: string;
    items: number[][];
  }>({ repo: repoInfo!.repoName, items: [] });
  const [issuesToStore, setIssuesToStore] = useState(
    JSON.parse(window.sessionStorage.getItem("savedRepos")!)
      ? JSON.parse(window.sessionStorage.getItem("savedRepos")!)
      : []
  );

  const { Title } = Typography;

  const onDragEnd = (result: any, columns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setIssueColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];

      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setIssueColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  useEffect(() => {
    setIssueRepoStorage({ repo: repoInfo!.repoName, items: [] });
    Object.entries(issueColumns).forEach((column) => {
      const reducedColumn = column[1].items.reduce(
        (newArr, curItem) => [...newArr, curItem.issueNumber],
        []
      );
      setIssueRepoStorage((prevState) => ({
        repo: repoInfo!.repoName,
        items: [...prevState.items, reducedColumn],
      }));
    });
  }, [issueColumns, repoInfo]);

  useEffect(() => {
    if (issueRepoStorage.items.length !== 0) {
      if (issuesToStore.some((el: any) => el.repo === issueRepoStorage.repo)) {
        const objIndex = [...issuesToStore]
          .map((obj) => obj.repo)
          .indexOf(issueRepoStorage.repo);
        const newArr = [...issuesToStore].map((item: any, i: number) => {
          if (i === objIndex) {
            return (item = issueRepoStorage);
          } else {
            return item;
          }
        });
        setIssuesToStore(newArr);
      } else {
        if (
          issuesToStore.length !== 0 &&
          issuesToStore.some((el: any) => el.repo !== issueRepoStorage.repo)
        ) {
          setIssuesToStore((prevState: any) => [
            ...prevState,
            issueRepoStorage,
          ]);
        } else {
          setIssuesToStore([issueRepoStorage]);
        }
      }
    }
  }, [issueRepoStorage]); //eslint-disable-line

  useEffect(() => {
    if (repoInfo && issuesToStore.length !== 0) {
      window.sessionStorage.setItem(
        "savedRepos",
        JSON.stringify(issuesToStore)
      );
    }
  }, [issuesToStore, repoInfo]);

  return (
    <div className={styles["board-container"]}>
      <Row gutter={40} className={styles.board}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, issueColumns)}
        >
          {Object.entries(issueColumns).map(([columnId, column]) => (
            <Col xs={24} lg={8} key={columnId}>
              <Title level={3} className={styles.title}>
                {column.title}
              </Title>
              <Droppable droppableId={`${columnId}`} key={columnId}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <Column title={column.title}>
                      {column.items.map((item, i) => (
                        <Draggable
                          key={`${item.issueNumber}`}
                          draggableId={`${item.issueNumber}`}
                          index={i}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{ ...provided.draggableProps.style }}
                              className={styles.card}
                            >
                              <IssueCard
                                title={item.title}
                                issueNumber={item.issueNumber}
                                openedAtTimestamp={item.openedAtTimestamp}
                                commentCount={item.commentsCount}
                                creatorName={item.user}
                                creatorLink={item.userLink}
                                isDragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Column>
                  </div>
                )}
              </Droppable>
            </Col>
          ))}
        </DragDropContext>
      </Row>
    </div>
  );
};

export default DragNDrop;
