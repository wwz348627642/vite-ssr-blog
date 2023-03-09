import { Menu, MenuProps } from 'antd';
import { BlockOutlined, HomeOutlined, SmileOutlined } from '@ant-design/icons';
import { FC } from 'react';
import Dialog, { BaseDialogProps } from '../Dialog';
export interface INavProps extends BaseDialogProps<string> {
  key: string;
}

type MenuItem = Required<MenuProps>['items'][number];
interface GetItemArgs {
  label: React.ReactNode,
  title?: string,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
}

const menuItems: GetItemArgs[] = [
  { label: '首页', key: '/app', icon: <HomeOutlined /> },
  { label: '文章', key: '/app/articleList', icon: <BlockOutlined /> },
  { label: '萌宠', key: '/app/imageRoom', icon: <SmileOutlined /> }
]

const Nav: FC<INavProps> = ({ key }) => {

  const getItem = (options: GetItemArgs): MenuItem => {
    return {
      ...options,
      onClick: arg => {
        window.location.href = arg.key;
        Dialog.close(key);
      },
    }
  };

  const items: MenuProps['items'] = menuItems.map(item => getItem(item));
  const defaultSelectedKeys = menuItems.find(item => item.key === location.pathname)?.key as string;

  return (
    <Menu 
      defaultActiveFirst
      defaultSelectedKeys={[defaultSelectedKeys]}
      mode="inline"
      theme="light"
      items={items} />
  )
}

export default Nav;