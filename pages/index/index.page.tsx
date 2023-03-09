
import { Spin } from 'antd';
import { FC, useEffect, useState, lazy } from 'react';


function Loading () {
  return (
    <Spin></Spin>
  )
}


const Page: FC = () => {
  const [Component, setComponent] = useState(() => Loading);

  useEffect(() => {
    // @ts-ignore
    setComponent(() => lazy(() => import('./client')));
  }, [])

  return (
    <div>
      <Component />
    </div>
  )
}


export { Page }
