import {Layout} from 'antd';
import Header from '../components/header';
import SubHeader from '../components/subHeader';
import '../styles/app.css';

function App() {
  return (
    <Layout className="layout">
      <Header />
      <SubHeader />
    </Layout>
  );
}

export default App;
