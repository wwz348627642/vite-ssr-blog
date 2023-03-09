
import { WebGLRenderer } from 'three';
import { loader } from './mange';
import World from './world';

export interface RenderOptions {
  onClick?: (args: any) => void;
}

export class Render {
  public width: number = window.innerWidth;
  public height: number = window.innerHeight;
  private renderer: WebGLRenderer;
  private world: World;
  constructor (el: HTMLElement, options: RenderOptions = {}) {
    const { onClick } = options;
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setViewport(0, 0, this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    loader.load();
    const world = new World({
      width: this.width,
      height: this.height,
      renderer: this.renderer,
      eventHandler: onClick,
    })

    this.world = world;
   
    el.appendChild(this.renderer.domElement);
  }

  public render = () => {
    this.world.render()
  }

  public clear = () => {
    this.renderer.dispose();
    this.world.clear();
  }
}
