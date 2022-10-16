import { Layout, Input, Button, Space } from "antd";
import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { fetchIssues } from "../../../features/board/issuesSlice";
import styles from './styles.module.css';

const Header = () => {
  const { Header } = Layout;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => dispatch(fetchIssues(`https://github.com/facebook/react/issues`)));
    return () => clearTimeout(timeout);
  }, [dispatch]);

  return (
    <Header className={styles.header}>
      <Space className={styles['header-space']}>
        <Input size="large" placeholder="Enter repo URL" />
        <Button size="large" type="primary" >Load issues</Button>
      </Space>
    </Header>
  );
};

export default Header;
