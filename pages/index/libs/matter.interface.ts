import { Mesh, Texture } from "three";
import { Body, World } from 'cannon';


export interface MatterOptions {
  /**
   * 宽度
   */
  width: number;
  /**
   * 高度
   */
  height: number;
  
  /**
   * 贴图
   */
  texture?: Texture;
  /**
   * 
   */
  x: number;
  /**
   * 
   */
  y: number;
  /**
   * 
   */
  z: number;
  /**
   * @default #ffffff
   */
  color?: string;
  /**
   * 物理世界
   */
  world?: World;
  /**
   * 物体名称;
   */
  name?: string;
}

export interface Matter {
  mesh: Mesh;
  rgBody?: Body;
  trick?: boolean;
  update?: () => void;
}