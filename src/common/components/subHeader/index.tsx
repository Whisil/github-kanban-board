import { RightOutlined, StarFilled } from "@ant-design/icons";
import { Space } from "antd";
import { useEffect, useState } from "react";
import { getRepoInfo } from "../../../api/repoInfoAPI";
import { useAppSelector } from "../../../app/hooks";
import { formatNumber } from "../../utils/numberFormatter";
import styles from "./styles.module.css";

const SubHeader = () => {
  const [repoInfo, setRepoInfo] = useState<{
    repoName: string;
    repoLink: string;
    ownerName: string;
    ownerLink: string;
    starsCount: number;
  }>({
    repoName: "",
    repoLink: "",
    ownerName: "",
    ownerLink: "",
    starsCount: 0,
  });

  const { repoApiUrl } = useAppSelector((state) => state.issues);

  useEffect(() => {
    getRepoInfo(repoApiUrl).then((res) => setRepoInfo(res));
  }, [repoApiUrl]);

  return (
    <Space size="large" className={styles["sub-header"]}>
      <Space className={styles["link-container"]}>
        <a href={repoInfo.ownerLink}>{repoInfo.ownerName}</a>
        <RightOutlined style={{ color: `#1890ff` }} />
        <a href={repoInfo.repoLink}>{repoInfo.repoName}</a>
      </Space>
      <div className={styles.stars}>
        <StarFilled style={{ color: `#f59f0a` }} />
        <span className={styles["stars-count"]}>
          {formatNumber(repoInfo.starsCount)} stars
        </span>
      </div>
    </Space>
  );
};

export default SubHeader;
