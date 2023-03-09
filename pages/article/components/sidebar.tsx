import { resolveMarkDownTitle } from '../../../utils/markdown';
import { Affix, Empty, Layout, SiderProps, Tree, TreeDataNode, Typography } from 'antd';
import { FC, useState } from 'react';
import styles from './sideBar.module.less';
import { useReactiveVar } from '@apollo/client/index.js';
import { setArticleInfo } from '../cache';
import { UnorderedListOutlined } from '@ant-design/icons';

const Sidebar: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const { content } = useReactiveVar(setArticleInfo);
  const treeData = resolveMarkDownTitle(content);

  const loop = (data: ReturnType<typeof resolveMarkDownTitle>): TreeDataNode[] => data.map(item => {
    const title = <Typography.Link href={`#${item.title}`} className={styles.linkTitle}>{item.title}</Typography.Link>
    if (item.children) {
      return { title, key: item.title, children: loop(item.children) };
    }
    return {
      title,
      key: item.title,
    };
  })

  const onCollapse: SiderProps['onCollapse'] = (collapsed, type) => {
    setCollapsed(collapsed);
  }

  return (
    <Layout.Sider 
      collapsible
      theme="light" 
      className={styles.slider}
      collapsed={collapsed}
      collapsedWidth={0}
      onCollapse={(collapsed, type) => onCollapse(collapsed, type)}
      trigger={
        <Affix >
          <UnorderedListOutlined />
        </Affix>
      }
    >
      <Affix offsetTop={24}>
        <div style={{ display: collapsed ? 'none' : 'block' }}>
          <Typography.Title 
            level={4} 
            className={styles.articleMenu}
            ellipsis
          >文章目录</Typography.Title>
          {
            !treeData.length ? <Empty description="暂无目录" /> : null
          }
          <Tree
            defaultExpandAll={true}
            treeData={loop(treeData)}
            blockNode={true}
            onSelect={(a) => {
              const url = window.location.origin + window.location.pathname + `#${a}`;
              window.location.replace(url);
            }}
          />
        </div>
      </Affix>
    </Layout.Sider>
  )
}

export default Sidebar