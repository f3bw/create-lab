varying vec2 vUv;
varying float vElevation;
varying vec3 vNormal;

uniform float uTime;
uniform float uFrequency;
uniform float uAmplitude;

void main() {
  vUv = uv;
  vNormal = normal;

  vec3 pos = position;

  // Wave displacement along normal direction
  float elevation = sin(pos.x * uFrequency + uTime) * uAmplitude;
  elevation += sin(pos.y * uFrequency + uTime * 0.8) * uAmplitude;
  elevation += sin(pos.z * uFrequency + uTime * 0.6) * uAmplitude;

  // Displace along the normal
  pos += normal * elevation;

  vElevation = elevation;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
