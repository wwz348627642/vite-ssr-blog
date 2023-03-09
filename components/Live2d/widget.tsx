import { FC, memo, useEffect, useState } from 'react';

export interface ILive2dWidgetProps {
  /**
   * @description live2dName名称
   * @default null
   */
  live2dScriptUrl: string;
  /**
   * @description 是否显示live2d挂件
   * @default false;
   */
  modelJsonUrl: string;
  /**
   * @description 容器宽度
   * @default 200px;
   */
  width?: string;
  /**
   *  @description 容器高度
   *  @default 200px;
   */
  height?: string;
}




const Widget: FC<ILive2dWidgetProps> = memo(({
  live2dScriptUrl,
  modelJsonUrl,
  ...restProps
}) => {

  const [isScriptReady, setScriptReady] = useState<boolean>(!!window.loadlive2d);

  const rootId = new Date().getTime() + Math.round(Math.random() * 10e10).toString();


  const loadScript = (src: string) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = () => {
        setScriptReady(true);
        window.loadlive2d(rootId, modelJsonUrl);
        resolve(true);
      };
      script.onerror = () => {
        console.error('加载live2dScriptUrl失败', live2dScriptUrl)
        reject(true);
      }
      script.src = src;
      document.head.appendChild(script);
    });
  }

  useEffect(() => {
    if (!isScriptReady) {
      loadScript(live2dScriptUrl);
    } else {
      window.loadlive2d(rootId, modelJsonUrl);
    }

  }, [live2dScriptUrl, modelJsonUrl])


  return (
    <canvas {...restProps} id={rootId} />
  )
})

export default Widget