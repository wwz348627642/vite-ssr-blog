
import { Spin } from 'antd';
import { FC, useEffect, useState, lazy } from 'react';
import { PageContext } from '../../renderer/types';

function Loading (props: PageContext) {
  return (
    <Spin></Spin>
  )
}


const Page: FC<PageContext> = (pageContext) => {
  const [Component, setComponent] = useState(() => Loading);
  useEffect(() => {
    // @ts-ignore
    setComponent(() => lazy(() => import('./client')));
  }, [])

  return (
    <div>
      <Component {...pageContext} />
    </div>
  )
}


export { Page }
