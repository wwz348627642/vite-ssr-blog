precision mediump float;
precision lowp sampler2D;
uniform sampler2D noiseTexture;
uniform sampler2D baseTexture;
uniform float threshold;
varying vec2 vUv;
void main() {
  float duration = 2.0;
  vec4 noise = texture2D(noiseTexture, vUv);
  vec4 color = texture2D(baseTexture, vUv);
  vec4 color2 = vec4(1.0, 1.0, 1.0, 1.0);
  if (noise.g < threshold) {
    discard;
  }
  float t = 1.0 - smoothstep(0.0, 1.0, noise.g - threshold);
  vec4 dissolveColor = mix(color, color2, t);
  gl_FragColor = mix(color, dissolveColor, t * step(0.0001, threshold));
}