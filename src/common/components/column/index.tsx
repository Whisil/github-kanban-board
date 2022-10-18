import { Space } from "antd";
import styles from "./styles.module.css";

interface ColumnProps {
  title: string;
  children: React.ReactNode;
}

const Column = ({ children }: ColumnProps) => {

  return (
    <Space
      size={20}
      direction="vertical"
      className={styles.column}
    >
      <Space size={0} direction="vertical" className={styles["column-inner"]}>
        {children}
      </Space>
    </Space>
  );
};

export default Column;
