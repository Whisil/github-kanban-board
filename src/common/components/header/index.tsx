import { Layout, Input, Button, Space, message } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchIssues } from "../../../features/board/issuesSlice";
import styles from "./styles.module.css";

const Header = () => {
  const [inputValue, setInputValue] = useState<string>(``);

  const { Header } = Layout;

  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.issues.error);

  useEffect(() => {
    if(errorMessage.length !== 0){
      message.error(errorMessage);
    }
  }, [errorMessage])

  const handleLoad = () => {
    if (inputValue.startsWith("https://")) {
      dispatch(fetchIssues(inputValue));
    } else {
      dispatch(fetchIssues(`https://${inputValue}`));
      setInputValue(`https://${inputValue}`);
    }
  };

  return (
    <Header className={styles.header}>
      <Space className={styles["header-space"]} align="start">
        <div>
          <Input
            size="large"
            placeholder="Enter repo URL"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        </div>
        <Button
          size="large"
          type="primary"
          disabled={!inputValue.includes(`github.com`)}
          onClick={handleLoad}
        >
          Load issues
        </Button>
      </Space>
    </Header>
  );
};

export default Header;
