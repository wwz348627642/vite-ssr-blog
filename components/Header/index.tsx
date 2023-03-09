import { FC } from 'react';
import { MenuFoldOutlined } from '@ant-design/icons';
import { Col, Layout, Row, Typography, Space, Affix } from 'antd';
import styles from './index.module.less';
import Dialog from '../Dialog';
import { cacheShowHeader } from './cache';
import { useReactiveVar } from '@apollo/client/index.js';
import Nav, { INavProps } from '../Nav';

const Header: FC = () => {
  const showHeader = useReactiveVar(cacheShowHeader);

  const openNav = () => {
    const navDrawerKey = new Date().toUTCString();
    Dialog.loadDrawer<INavProps>(
      <Nav
        key={navDrawerKey} 
      />,
      {
        title: '导航',
        placement: 'left',
        closable: window.innerWidth < 750,
      }
    )
  }

  if (!showHeader) {
    return null;
  }

  return (
    <Affix>
      <Layout.Header className={styles.header}>
        <Row justify='space-between'>
          <Col className={styles.drawMenuBtn} onClick={openNav}>
            <Space size='small'>
              <MenuFoldOutlined />
              <Typography.Text>菜单</Typography.Text>
            </Space>
          </Col>
        </Row>
      </Layout.Header>
    </Affix>

  )
}

export default Header;