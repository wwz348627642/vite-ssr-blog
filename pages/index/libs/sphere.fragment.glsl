precision mediump float;
varying vec3 vPostion;
uniform vec3 spherePosition;
void main() {
  gl_FragColor = vec4(vPostion.x + 0.5, vPostion.y + 0.5, vPostion.z + 0.5, 1.0);
}