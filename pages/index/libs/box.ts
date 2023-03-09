 import {
  Box as CannonBox,
  Vec3 as CannonVec3,
} from 'cannon';
import { BoxGeometry, DoubleSide, Material, Mesh, ShaderMaterial, Vector3 } from 'three';
import { loader } from './mange';
import { Matter, MatterOptions } from './matter.interface';
import vertexShader from './dissolve.vertex.glsl?raw';
import fragmentShader from './dissolve.fragment.glsl?raw';
import boxFramentShader from './baseBox.fragment.glsl?raw';

export type TexturePosition = 'left' | 'right' | 'top' | 'bottom' | 'behind' | 'front' | 'all';

export interface BoxOptions extends MatterOptions {
  /**
   * 深度
   */
  deep: number;
  /**
   * 贴图位置
   * @default all
   */
  texturePosition?: TexturePosition;

  eventHandler?: Function;

  index?: number;
}

export default class Box implements Matter {

  public mesh: Mesh;

  public trick: boolean = false;
  private uniforms: ShaderMaterial['uniforms'];
  private threshold: number = 0.0;

  private eventHandler?: Function;

  private index?: number;

  constructor (options: BoxOptions) {
    const { 
      width,
      height,
      deep,
      x,
      y,
      z,
      texture,
      texturePosition = 'all',
      color = '#ffffff',
      world,
      name = '',
      eventHandler,
      index,
    } = options;

    this.eventHandler = eventHandler;
    this.index = index;
    const materialList: Array<Material> = new Array(6);
    const boxGeometry = new BoxGeometry(width, height, deep);
    this.uniforms = {
      noiseTexture: {
        value: loader.noiseImage,
      },
      baseTexture: {
        value: texture,
      },
      threshold: {
        value: this.threshold,
      }
    }

    const baseMaterial = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: boxFramentShader, 
      side: DoubleSide 
    });

    materialList.fill(baseMaterial);
    // 是否使用贴图
    if (texture) {
      const primaryMaterial = new ShaderMaterial({
        uniforms: this.uniforms,
        clipping: false,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: DoubleSide
      });
  
      primaryMaterial.transparent = true;
      let spliceIndexObj: { [key in TexturePosition]: number } = {
        'left': 0,
        'right': 1,
        'behind': 2,
        'front': 3,
        'top': 4,
        'bottom': 5,
        'all': -1,
      }

      const index = spliceIndexObj[texturePosition];
      if (index == -1) {
        materialList.fill(primaryMaterial)
      }
      if (index > -1) {
        materialList.splice(index, 1, primaryMaterial);
      }
    }
    

    const mesh = new Mesh(boxGeometry, materialList);
    mesh.position.set(x, y, z);
    mesh.name = name;
    this.mesh = mesh;
  }

  public update () {
    if (this.trick) {
      this.threshold += 0.01;
      this.uniforms.threshold.value = this.threshold;

      if (this.threshold >= 1) {
        this.trick = false;
        this.eventHandler?.(this.index);
      }
    }
  }
}
