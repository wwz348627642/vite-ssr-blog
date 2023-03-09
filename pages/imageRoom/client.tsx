import { useGetImageListQuery } from '../../generated';
import { getImageUrl } from '../../utils/imgUtils';
import { Button, Space, Spin } from 'antd';
import { FC, useLayoutEffect, useRef, useEffect } from 'react';
import { Application } from './libs';
import { ApplicationScene } from './libs/scene';
import styles from './index.module.less';
import { PageContext } from '../../renderer/types';

let imageApp: Application;

const ImageRoom: FC<PageContext> = (pageContext) => {
  let applicationScene: ApplicationScene;

  const { data, loading } = useGetImageListQuery();
  const ref = useRef<HTMLDivElement>(null);

  const renderApplication = (dom: HTMLDivElement) => {
    if (!imageApp) {
      imageApp = new Application(dom);

    }
    applicationScene = new ApplicationScene();
    let imgList: string[];
    if (pageContext.DEV) {
      imgList = Array.from({ length: 21 }).map(() => '/test.png');
    } else {
      imgList = data?.getImageList
      .map(item => getImageUrl(item.url, { width: 512, height: 512 })) || [];
    }
    imageApp.loadScene(applicationScene);
    applicationScene.loadImageDataList(imgList);
    imageApp.render();
  }

  useLayoutEffect(() => {
    if (ref.current) {
      if (Array.isArray(data?.getImageList)) {
        renderApplication(ref.current);
      }
    }
  }, [loading])

  useEffect(() => {
    return () => {
      imageApp.clear();
      // @ts-ignore;
      imageApp = null
    }
  }, [])


  return (
    <Spin spinning={loading}>
      <div className={styles.changeButton}>
        <Space>
          <Button 
            type='primary'
            onClick={() => {
              applicationScene.animateToBox()
            }}
          >形态一</Button>
          <Button
            type='primary'
            onClick={() => {
              applicationScene.animateToCircle()
            }}
          >形态二</Button>
        </Space>
      </div>
      <div ref={ref}></div>
    </Spin>
  )
}

export default ImageRoom;