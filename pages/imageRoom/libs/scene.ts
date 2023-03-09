import { TextureLoader, Scene, PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide, MathUtils, Vector3, Raycaster, Vector2, CameraHelper, Camera, Matrix4 } from 'three';
import TWEEN, { Group, Tween } from '@tweenjs/tween.js';

export class ApplicationScene {
  public scene: Scene;
  public group?: Group;
  private textureLoader: TextureLoader;
  private raycaster: Raycaster;
  public data: string[] = [];
  private meshes: Mesh[] = [];
  private meshListVector3: Vector3[] = [];
  private camera?: Camera;

  constructor () {
    this.scene = new Scene();
    this.raycaster = new Raycaster();
    this.textureLoader = new TextureLoader();
    window.addEventListener('click', this.clickMesh);
  }

  public clear () {
    window.removeEventListener('click', this.clickMesh);
    this.scene?.clear();
  }

  public setMainCamera (camera: Camera) {
    this.camera = camera;
  }


  private clickMesh = (e: MouseEvent) => {
    const mouseVect2 = new Vector2(
      e.clientX / window.innerWidth * 2 - 1,
      - (e.clientY / window.innerHeight) * 2 + 1
    );
    const camera = this.camera;
    const group = new TWEEN.Group();
    if (camera) {
      this.raycaster.setFromCamera(mouseVect2, camera);
      const intersects = this.raycaster.intersectObjects(this.scene.children, true);
      if (intersects.length > 0) {
        const obj = intersects[0].object;
        const position = obj.position;
        const { x, y, z } = position;
        const cameraPosition = camera.position.clone();
        const target = new Vector3(x, y, z);
        const tween = new TWEEN.Tween(cameraPosition, group);
        tween.to(target, 1000)
             .easing(TWEEN.Easing.Sinusoidal.In)
             .onUpdate(() => {
                camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z + 1);
             })
             .start()
        this.group = group
      }
    }
  }

  public animateToBox () {
    const group = new TWEEN.Group();
    this.meshes.forEach((mesh, index) => {
      const initMeshVector3 = this.meshListVector3[index];
      const vector3 = new Vector3(initMeshVector3.x, initMeshVector3.y, initMeshVector3.z);
      const tween = new TWEEN.Tween(vector3, group);
      const y = index % 3;
      tween.to(new Vector3(-index * 0.5, y * 1.3 - 1.2, 1), 1000)
           .easing(TWEEN.Easing.Sinusoidal.InOut)
           .onUpdate(() => {
              mesh.position.set(vector3.x, vector3.y, vector3.z);
            })
           .start();
      const camera = this.camera;
      if (camera) {
        const cameraPosition = camera.position.clone();
        new TWEEN.Tween(cameraPosition, group).to(new Vector3(0, 0, this.meshes.length), 1000)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .onUpdate(() => {
           camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
         })
        .start();
      }
    })
    this.group = group;
  }

  public animateToCircle () {
    const group = new TWEEN.Group();
    this.meshes.forEach((mesh, index) => {
      const initMeshVector3 = this.meshListVector3[index];
      const vector3 = new Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
      const tween = new TWEEN.Tween(vector3, group);
      tween.to(initMeshVector3, 1000)
           .easing(TWEEN.Easing.Sinusoidal.In)
           .onUpdate(() => {
              mesh.position.set(vector3.x, vector3.y, vector3.z);
            })
           .start();
      const camera = this.camera;
      if (camera) {
      const cameraPosition = camera.position.clone();
      new TWEEN.Tween(cameraPosition, group).to(new Vector3(0, 0, this.meshes.length), 1000)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(() => {
          camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        })
      .start();
    }
    })
    this.group = group;
  }

  public loadImageDataList (arr: string[]) {
    this.data = arr;
    const r = arr.length / 5;
    arr.forEach((imgUrl, index) => {
      const texture = this.textureLoader.load(imgUrl);
      const plane = new PlaneGeometry(1, 1);
      const materia = new MeshBasicMaterial({ map: texture, side: DoubleSide });
      const mesh = new Mesh(plane, materia);
      const x = r * Math.cos(0.4 * index);
      const y = r * Math.sin(-0.4 * index);
      const z = 0.5 * index;
      mesh.position.set(x, y, z);
      mesh.name = index.toString();
      this.meshes.push(mesh);
      this.meshListVector3.push(new Vector3(x, y, z));
      this.scene.add(mesh); 
    })
  }
}