import { Card, Space, Typography } from "antd";
import { formatTime } from "../../utils/timestampFormatter";
import styles from "./styles.module.css";

interface IssueCardProps {
  title: string;
  issueNumber: number;
  openTimestamp: string;
  commentCount: number;
  creatorName: string;
  creatorLink: string;
}

const IssueCard = ({
  title,
  issueNumber,
  openTimestamp,
  commentCount,
  creatorName,
  creatorLink,
}: IssueCardProps) => {
  const { Title } = Typography;

  return (
    <Card bordered className={styles.card}>
      <Space size={8} direction="vertical">
        <Title level={4}>{title}</Title>
        <span>
          #{issueNumber} opened {formatTime(openTimestamp)}
        </span>
        <div className={styles["card-footer"]}>
          <a className={styles.userLink} href={creatorLink}>
            {creatorName}
          </a>
          <span className={styles.divider}>|</span>
          <span>Comments: {commentCount}</span>
        </div>
      </Space>
    </Card>
  );
};

export default IssueCard;
