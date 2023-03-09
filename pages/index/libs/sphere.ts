import { BufferAttribute, BufferGeometry, Camera, DoubleSide, Material, Matrix4, Mesh, MeshBasicMaterial, ShaderMaterial, ShaderMaterialParameters, SphereGeometry, Uniform, Vector3, Vector4 } from 'three';
import { Matter, MatterOptions } from './matter.interface';
import { 
  Sphere as CannonSphere, 
  Body as RigidBody,
  Vec3 as CannonVec3,
} from 'cannon';
import { moveMaterial } from './material';
import { Easing, Tween } from '@tweenjs/tween.js';
import fragmentShader from './sphere.fragment.glsl?raw';
import vertexShader from './sphere.vertex.glsl?raw';

export interface SphereOptions extends Omit<MatterOptions, 'deep' | 'width' | 'height'> {
  radius: number;
}

export default class Sphere implements Matter {
  
  public mesh: Mesh;
  
  public rgBody: RigidBody;

  public step: number = 0.005;

  public force: number = 1;

  private ani?: Tween<Vector3>;

  private uniforms: ShaderMaterialParameters['uniforms'];
  
  constructor (options: SphereOptions) {
    const {
      x,
      y,
      z,
      radius,
      world,
      name = '',
      texture
    } = options;

    const uniforms: ShaderMaterialParameters['uniforms'] = {
      spherePosition: new Uniform( new Vector3(x, y, z) ),
    }
    this.uniforms = uniforms;
    const sphere = new SphereGeometry(radius);
    
    let baseMaterial: Material;
    if (texture) {
      baseMaterial = new MeshBasicMaterial({
        map: texture,
        side: DoubleSide,
      })
    } else {
      baseMaterial = new ShaderMaterial({
        uniforms: uniforms,
        clipping: false,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      });
    }
    const mesh = new Mesh(sphere, baseMaterial);
    const shape = new CannonSphere(radius);
    mesh.position.set(x, y, z);
  
   

    mesh.name = name;
    this.mesh = mesh;

    const rgBody = new RigidBody({ 
      mass: 30,
      shape: shape,
      position: new CannonVec3(x, y, z),
      material: moveMaterial,
    }) 

    this.rgBody = rgBody;

    if (world) {
      world.addBody(rgBody);
    }

    rgBody.addEventListener('collide', () => {
      // console.log(111)
    })

  }

  public move = (targetVec3: Vector3) => {
    const position = new Vector3().copy(this.mesh.position);
    const tween = new Tween(position);
    tween.to(targetVec3, 1000)
         .easing(Easing.Sinusoidal.In)
         .onUpdate(() => {
            this.mesh.position.set(position.x, position.y, position.z);
            this.rgBody.position.set(position.x, position.y, position.z);
          })
         .start();
    this.ani = tween;
  }

  update = () => {
    this.ani?.update();
    if (this.rgBody) {
      const { x, y, z } = this.rgBody.position;
      this.mesh.position.copy(new Vector3(x, y, z));
    }
  }
}