import { FC } from 'react';
import styles from './index.module.less';
import Draggable from 'react-draggable';
import Widget from './widget';

export interface ILive2dComponentProps {
  /**
   * @description live2dName名称
   * @default null
   */
  live2dName?: string;
  /**
   * @description 是否显示live2d挂件
   * @default false;
   */
  show?: boolean;
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

const Live2dComponent: FC<ILive2dComponentProps> = ({ 
  live2dName, 
  show = false,
  width = '200px',
  height = '200px',
}) => {
  if (!show) return null
  if (!live2dName) {
    console.warn('live2d模型不存在');
    return null
  }

  const canvasWidth = Number.parseInt(width);
  const canvasHeight = Number.parseInt(height);

  return (
    <Draggable 
      defaultPosition={{
        x: window.innerWidth - canvasWidth,
        y: window.innerHeight - canvasHeight
      }}
    >
      <div className={styles.live2d}>
        <Widget
          modelJsonUrl={`/live2d_models/${live2dName}/${live2dName}.model.json`}
          live2dScriptUrl="/live2d_models/live2d.js"
          width={width}
          height={height}
        />
      </div>
    </Draggable>
  )
}

export default Live2dComponent
