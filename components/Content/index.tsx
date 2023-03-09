import { Layout } from 'antd';
import { FC, PropsWithChildren, useEffect, useState, lazy } from 'react';
import styles from './index.module.less';
import Header from '../Header';
import { useQuerySettingQuery } from '../../generated';

function Loading (props: any) {
  return (
    <div></div>
  )
}


const Content: FC<PropsWithChildren> = ({ children }) => {
  const { data, loading } = useQuerySettingQuery();
  const [Component, setComponent] = useState(() => Loading);
  useEffect(() => {
    // @ts-ignore
    setComponent(() => lazy(() => import('../Live2d')));
  }, [])

  return (
    <Layout className={styles.app}>
      <Header />
      <Layout>
        { children }
      </Layout>
      <Component 
        show={!!data?.querySetting.openLive2d}
        live2dName={data?.querySetting.live2dName + ''}
      />
    </Layout>
  )
}

export default Content
