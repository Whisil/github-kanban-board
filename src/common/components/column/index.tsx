import { Space, Typography } from "antd";
import IssueCard from "../card";
import styles from "./styles.module.css";

interface ColumnProps {
  title: string;
}

const Column = ({ title }: ColumnProps) => {
  const { Title } = Typography;

  return (
    <Space size={20} direction="vertical" className={styles.column}>
      <Title level={3} className={styles.title} >{title}</Title>
      <Space direction="vertical" size={15} className={styles["column-inner"]}>
        <IssueCard
          title="hey it's a title"
          issueNumber={3}
          openTimestamp="2022-08-11T14:47:58Z"
          commentCount={3}
          creatorName="David"
          creatorLink="/"
        />
      </Space>
    </Space>
  );
};

export default Column;
