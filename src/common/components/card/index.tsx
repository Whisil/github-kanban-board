import { HolderOutlined } from "@ant-design/icons";
import { Card, Space, Typography } from "antd";
import { formatTime } from "../../utils/timestampFormatter";
import styles from "./styles.module.css";

interface IssueCardProps {
  title: string;
  issueNumber: number;
  openedAtTimestamp: string;
  commentCount: number;
  creatorName: string;
  creatorLink: string;
}

const IssueCard = ({
  title,
  issueNumber,
  openedAtTimestamp,
  commentCount,
  creatorName,
  creatorLink,
}: IssueCardProps) => {
  const { Title } = Typography;

  return (
    <Card bordered className={styles.card}>
      <Space size={8} direction="vertical" style={{ width: "100%" }}>
        <Space className={styles["card-header"]} align="baseline">
          <Title level={5} className={styles["card-title"]}>
            {title}
          </Title>
          <HolderOutlined style={{ fontSize: "24px", fontWeight: 500 }} />
        </Space>
        <span>
          #{issueNumber} opened {formatTime(openedAtTimestamp)}
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
