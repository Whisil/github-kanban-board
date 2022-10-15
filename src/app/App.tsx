import {Col, Layout, Row} from 'antd';
import Column from '../common/components/column';
import Header from '../common/components/header';
import SubHeader from '../common/components/subHeader';
import styles from '../styles/app.module.css';

function App() {
  return (
    <Layout className={styles.layout}>
      <Header />
      <SubHeader />
      <Row gutter={20} className={styles.row}>
        <Col span={8}>
          <Column title="To Do" />
        </Col>

        <Col span={8}>
          <Column title="In Progress" />
        </Col>

        <Col span={8}>
          <Column title="Done" />
        </Col>
      </Row>
    </Layout>
  );
}

export default App;
