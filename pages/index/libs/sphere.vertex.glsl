precision mediump float;

varying vec3 vPostion;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  vPostion = gl_Position.xyz;
}