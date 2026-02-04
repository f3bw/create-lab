varying vec2 vUv;
varying float vElevation;
varying vec3 vNormal;

uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;

void main() {
  // Mix colors based on elevation
  float mixStrength = (vElevation + 0.3) * 3.0;
  mixStrength = clamp(mixStrength, 0.0, 1.0);
  vec3 color = mix(uColorA, uColorB, mixStrength);

  // Simple fresnel-like effect
  float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
  color += fresnel * 0.3;

  gl_FragColor = vec4(color, 1.0);
}
