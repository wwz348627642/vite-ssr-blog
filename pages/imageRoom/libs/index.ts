import { Clock, PerspectiveCamera, WebGL1Renderer } from 'three';
import { ApplicationScene } from './scene';

export interface ApplicationOptions {
  width?: number;
  height?: number;
}

type Direction = 'left' | 'right' | 'up' | 'down' | 'behind' | 'front';

export class Application {
  private renderer: WebGL1Renderer;
  private camera: PerspectiveCamera;

  public readonly options: Required<ApplicationOptions>;

  private scene?: ApplicationScene;
  private animationFrame?: number;

  private clock: Clock;

  private speed: number = 2;

  private canMove: boolean = false;

  private direction: Direction = 'right';

  constructor(element: HTMLDivElement, applicationOptions: ApplicationOptions = {}) {
    const {
      width = window.innerWidth,
      height = window.innerHeight,
    } = applicationOptions;
    this.options = {
      width,
      height,
    }

    this.clock = new Clock();
    this.renderer = new WebGL1Renderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setViewport(0, 0, width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    window.addEventListener('keydown', this.moveControl)
    window.addEventListener('keyup', () => {
      this.canMove = false;
    })

    window.addEventListener('wheel', (e: WheelEvent) => {
      this.canMove = true;
      if (e.deltaY > 0) {
        this.direction = 'behind'
      }

      if (e.deltaY < 0) {
        this.direction = 'front'
      }

      setTimeout(() => {
        this.canMove = false;
      }, 500)
    })

    element.appendChild(this.renderer.domElement);
    window.addEventListener('resize', () => this.resize())
  }

  private moveControl = (e: KeyboardEvent) => {
    switch ( e.code ) {
      case 'ArrowUp':
      case 'KeyW':
        this.canMove = true;
        this.direction = 'up';
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.canMove = true;
        this.direction = 'left';
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.canMove = true;
        this.direction = 'down';
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.canMove = true;
        this.direction = 'right';
        break;
    }
  }

  private resize = () => {
    // const { width, height } = this.options;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height);
    this.renderer.setViewport(0, 0, width, height);
  }
  
  public loadScene (scene: ApplicationScene) {
    this.scene = scene;
    const len = this.scene.data.length;
    this.camera.position.setZ(len);
    scene.setMainCamera(this.camera);
  }

  public render = () => {
    if (!this.scene) {
      console.error('当前场景未加载');
      return 
    }

    if (this.canMove) {
      const direction = this.direction;
      const time = this.clock.getDelta();
      let { x, y, z } = this.camera.position;
      const delta = this.speed * time;
      if (direction === 'up') {
        this.camera.position.setY(y += delta);
      }
      
      if (direction === 'down') {
        this.camera.position.setY(y -= delta);
      }

      if (direction === 'left') {
        this.camera.position.setX(x -= delta);
      }

      if (direction === 'right') {
        this.camera.position.setX(x += delta);
      }

      if (direction === 'front') {
        this.camera.position.setZ(z += delta)
      }

      if (direction === 'behind') {
        this.camera.position.setZ(z -= delta)
      }
    }
   
   
    this.animationFrame = requestAnimationFrame(() => this.render())
    this.scene.group?.update();
    this.renderer.render(this.scene.scene, this.camera);
  }

  public clear () {
    this.animationFrame && cancelAnimationFrame(this.animationFrame);
    this.scene?.clear();
    this.renderer.dispose();
  }
}