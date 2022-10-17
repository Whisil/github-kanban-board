import { RightOutlined, StarFilled } from "@ant-design/icons";
import { Space } from "antd";
import { useAppSelector } from "../../../app/hooks";
import { formatNumber } from "../../utils/numberFormatter";
import styles from "./styles.module.css";

const SubHeader = () => {
  const { repoInfo } = useAppSelector((state) => state.issues);

  return (
    <Space size="large" className={styles["sub-header"]}>
      <Space className={styles["link-container"]}>
        <a href={repoInfo?.ownerLink}>{repoInfo?.ownerName}</a>
        <RightOutlined style={{ color: `#1890ff` }} />
        <a href={repoInfo?.repoLink}>{repoInfo?.repoName}</a>
      </Space>
      <div className={styles.stars}>
        <StarFilled style={{ color: `#f59f0a` }} />
        <span className={styles["stars-count"]}>
          {repoInfo && formatNumber(repoInfo?.starsCount)} stars
        </span>
      </div>
    </Space>
  );
};

export default SubHeader;
