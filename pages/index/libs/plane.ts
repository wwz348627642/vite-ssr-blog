import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, ShaderMaterial, Vector3 } from "three";
import { Matter, MatterOptions } from "./matter.interface";
import { 
  Plane as CannonPlane,
  Body as RigidBody,
  Vec3 as CannonVec3,
} from 'cannon';
import { staticMaterial } from "./material";
import { loader } from "./mange";
import vertexShader from './dissolve.vertex.glsl?raw';
import boxFramentShader from './baseBox.fragment.glsl?raw';

export default class Plane implements Matter {
  public mesh: Mesh;
  public rgBody?: RigidBody;
  public trick: boolean = false;
  private uniforms: ShaderMaterial['uniforms'];
  private threshold: number = 0.0;

  constructor (options: MatterOptions) {
    const { 
      width,
      height,
      x,
      y,
      z,
      color = '#ffffff',
      world,
      name = '',
    } = options;
    

    this.uniforms = {
      noiseTexture: {
        value: loader.noiseImage,
      },
      threshold: {
        value: this.threshold,
      }
    }

    const planeGeometry = new PlaneGeometry(width, height);
    const planeMaterial = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: boxFramentShader, 
      side: DoubleSide 
    });
    const plane = new Mesh( planeGeometry, planeMaterial );
    
    const planeShape = new CannonPlane();
    const rgBody = new RigidBody({
      mass: 0,
      shape: planeShape,
      material: staticMaterial,
      position: new CannonVec3(x, y, z),
    })

    this.mesh = plane;
    this.mesh.name = name;
    this.mesh.position.set(x, y, z);
    this.rgBody = rgBody;

    this.rgBody.addEventListener('collide', () => {
      this.trick = true;
    })

    if (world) {
      world.addBody(rgBody);
    }
  }

  public update () {
    if (this.trick) {
      this.threshold += 0.01;
      this.uniforms.threshold.value = this.threshold;

      if (this.threshold >= 1) {
        this.trick = false;
      }
    }
  }
}