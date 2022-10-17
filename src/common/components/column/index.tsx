import { Space, Typography } from "antd";
import IssueCard from "../card";
import styles from "./styles.module.css";

interface ColumnProps {
  title: string;
  issues: any[];
}

const Column = ({ title, issues }: ColumnProps) => {
  const { Title } = Typography;

  return (
    <Space size={20} direction="vertical" className={styles.column}>
      <Title level={3} className={styles.title}>
        {title}
      </Title>
      <Space direction="vertical" size={15} className={styles["column-inner"]}>
        {issues.length !== 0 && issues.map((item: any) => (
          <IssueCard
            key={item.issueNumber}
            title={item.title}
            issueNumber={item.issueNumber}
            openedAtTimestamp={item.openedAtTimestamp}
            commentCount={item.commentsCount}
            creatorName={item.user}
            creatorLink={item.userLink}
          />
        ))}
      </Space>
    </Space>
  );
};

export default Column;
