import { RightOutlined, StarFilled } from "@ant-design/icons";
import { Space } from "antd";
import styles from './styles.module.css'

const SubHeader = () => {
    return(
        <Space size="large">
            <Space className={styles['link-container']}>
                <a href="/">Facebook</a>
                <RightOutlined style={{color: `#1890ff`}} />
                <a href="/">React</a>
            </Space>
            <div className={styles.stars}>
                <StarFilled style={{color: `#f59f0a`}} />
                <span className={styles['stars-count']}>194 K stars</span>
            </div>
        </Space>
    )
}

export default SubHeader;