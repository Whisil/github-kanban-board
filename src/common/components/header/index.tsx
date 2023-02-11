import { Layout, Input, Button, Space, message } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchRepo } from "../../../features/board/issuesSlice";
import styles from "./styles.module.css";

const Header = () => {
  const [inputValue, setInputValue] = useState<string>(``);

  const { Header } = Layout;

  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.issues.error);

  useEffect(() => {
    if (errorMessage.length !== 0) {
      message.error(errorMessage);
    }
  }, [errorMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.startsWith("https://")) {
      dispatch(fetchRepo(inputValue));
    } else {
      dispatch(fetchRepo(`https://${inputValue}`));
      setInputValue(`https://${inputValue}`);
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <Header className={styles.header}>
      <form onSubmit={handleSubmit}>
        <Space className={styles["header-space"]} align="start">
          <div>
            <Input
              size="large"
              placeholder="Enter repo URL"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              onKeyPress={handleEnterPress}
              name="form-input"
              className={styles.radius}
            />
          </div>
          <Button
            size="large"
            type="primary"
            disabled={!inputValue.includes(`github.com`)}
            htmlType="submit"
            name="form-btn"
            className={styles.radius}
          >
            Load issues
          </Button>
        </Space>
      </form>
    </Header>
  );
};

export default Header;
