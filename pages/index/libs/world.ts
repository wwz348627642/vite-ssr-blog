import { Camera, Clock, Object3D, PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from "three";
import Stats from 'three/examples/jsm/libs/stats.module';
import { 
  ContactMaterial,
  SAPBroadphase,
  World as CannonWorld,
} from 'cannon';
import { loader } from "./mange";
import Box from './box';
import Plane from "./plane";
import { Matter } from "./matter.interface";
import Sphere from "./sphere";
import { moveMaterial, staticMaterial } from "./material";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import MySelf from "./mySelf";
let stats: Stats 

// // 设置监视器面板，传入面板id（0: fps, 1: ms, 2: mb）
// // @ts-ignore
// stats = new Stats();
// stats.setMode(0)

// // 设置监视器位置
// stats.domElement.style.position = 'absolute'
// stats.domElement.style.left = '0px'
// stats.domElement.style.top = '0px'

// // 将监视器添加到页面中
// document.body.appendChild(stats.domElement)

export interface WorldOptions {
  width: number;
  height: number;

  renderer: WebGLRenderer;

  eventHandler?: Function;
}

export default class World {

  public scene: Scene;
  public camera: Camera;
  public world: CannonWorld;
  private raycaster: Raycaster;

  private control: OrbitControls;
  private renderer: WebGLRenderer;
  private objects: Array<Matter>;

  private inter?: number;

  private clock: Clock;

  private ball: Sphere;

  public box = {
    width: 0.25,
    height: 0.125,
    deep: 0.125,
  }

  public gutter: number = 0.25;

  constructor (options: WorldOptions) {
    const { 
      width,
      height,
      renderer,
      eventHandler,
    } = options;
    this.renderer = renderer;
    this.clock = new Clock();
    this.scene = new Scene();
    const world = new CannonWorld();
    world.broadphase = new SAPBroadphase(world)
    world.allowSleep = true;
    world.gravity.set(0, 0, -9.82);
    this.world = world;
    const aspect = width / height;
    const camera = new PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(0, -2, 1);
    camera.rotateX(Math.PI / 180 * 15);
    camera.lookAt(new Vector3(0, 0, 0));
    this.camera = camera;
    this.scene.add(camera);
    const plane = new Plane({
      width: 2,
      height: 2,
      x: 0,
      y: 0,
      z: 0,
      world: world,
      name: 'plane'
    })

    const mySelf = new MySelf({
      width: 2,
      height: 2,
      x: 0,
      y: 0,
      z: -0.001,
    })

    const [aboutTexture, articleTexture, petTexture ] = loader.navImage;

    const position = 'front';
    const { 
      width: boxWidth, 
      height: boxHeight, 
      deep: boxDeep 
    } = this.box;


    const article = new Box({
      width: boxWidth,
      height: boxHeight,
      deep: boxDeep,
      x: -1 + boxWidth / 2, 
      y: 1 - boxHeight / 2 + boxHeight, 
      z: boxDeep / 2,
      world: world,
      texture: articleTexture,
      texturePosition: position,
      name: 'clickBox',
      eventHandler: eventHandler,
      index: 0,
    })

    const pet = new Box({
      width: boxWidth,
      height: boxHeight,
      deep: boxDeep,
      x: -1 + boxWidth + this.gutter, 
      y: 1 - boxHeight / 2 + boxHeight, 
      z: boxDeep / 2,
      world: world,
      texture: petTexture,
      texturePosition: position,
      name: 'clickBox',
      eventHandler: eventHandler,
      index: 1,
    })

    // const about = new Box({
    //   width: boxWidth,
    //   height: boxHeight,
    //   deep: boxDeep,
    //   x: -1 + 0.125 + (0.25 + 0.125) * 2, 
    //   y: 1 - 0.125 / 2, 
    //   z: 0.125 / 2,
    //   world: world,
    //   texture: aboutTexture,
    //   texturePosition: position,
    //   name: 'clickBox',
    // })

    const ball = new Sphere({
      radius: 0.1,
      x: 0,
      y: 0.3,
      z: 1,
      color: '#ff0000',
      world,
      name: 'ball',
    })

    this.ball = ball;
    this.objects = [plane, article, pet, ball, mySelf];
    const meshes = this.objects.map(item => item.mesh);
    this.scene.add(...meshes);
    
    const contactMaterial = new ContactMaterial(
      moveMaterial,
      staticMaterial, 
      {
        friction: 0.1,
        restitution: 0.4,
      }
    )

    world.addContactMaterial(contactMaterial);

    this.raycaster = new Raycaster();
    this.control = new OrbitControls(camera, this.renderer.domElement);
    this.control.listenToKeyEvents(window);
    window.addEventListener('click', this.onClick);
  }

  private onClick = (e: MouseEvent) => {
    this.camera.matrixWorld
    const mouseVect2 = new Vector2(
      e.clientX / window.innerWidth * 2 - 1,
      - (e.clientY / window.innerHeight) * 2 + 1
    );
    this.raycaster.setFromCamera(mouseVect2, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) {
      const item = intersects[0];
      const point = item.point;
      const object = intersects[0].object;

      if (object.name != 'sky') {
        this.ball.move(new Vector3(point.x, point.y, 0.1));
      }

      if (object.name === 'clickBox') {
        const target = this.objects.find(item => item.mesh.id === object.id);
        if (target) {
          setTimeout(() => {
            target.trick = true;
          }, 800)
        }
      }
    }
  }


  public render = () => {
    const time = this.clock.getDelta();
    this.world.step(1 / 60, time, 3);
    this.objects.forEach(item => item.update?.())
    this.inter = requestAnimationFrame(() => this.render());
    this.control.update();
    this.renderer.render(this.scene, this.camera);

    // stats.update()
  }


  public clear = () => {
    this.scene.clear();
    if (this.inter) {
      cancelAnimationFrame(this.inter);
    }
  }
}