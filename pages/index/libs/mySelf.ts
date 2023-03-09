import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { loader } from "./mange";
import { Matter, MatterOptions } from "./matter.interface";

export default class MySelf implements Matter {
  public mesh: Mesh;

  public trick: boolean = false;

  constructor (options: MatterOptions) {
    const { 
      width,
      height,
      x,
      y,
      z,
      name = '',
    } = options;

    const planeGeometry = new PlaneGeometry(width, height);
    const planeMaterial = new MeshBasicMaterial({
      map: loader.skillImage,
      transparent: true,
      side: DoubleSide
    });

    const plane = new Mesh( planeGeometry, planeMaterial );
    this.mesh = plane;
    this.mesh.name = name;
    this.mesh.position.set(x, y, z);
  }

  public update () {
   
  }
}