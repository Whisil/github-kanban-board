import { Layout, Input, Button, Space } from "antd";
import styles from './styles.module.css';

const Header = () => {
  const { Header } = Layout;

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
