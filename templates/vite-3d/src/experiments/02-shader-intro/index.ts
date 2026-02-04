import * as THREE from 'three'
import type { Experiment } from '../index'
import { createScene } from '../../core/scene'
import { createControls } from '../../core/controls'
import { createDebugPanel, destroyDebugPanel } from '../../core/debug'
import { createTicker } from '../../core/ticker'
import styles from './style.module.css'

let cleanup: (() => void) | null = null

const vertexShader = `
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
`

const fragmentShader = `
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
`

export const shaderIntro: Experiment = {
    name: 'Shader Intro',

    init(container: HTMLElement) {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement
        const {
            scene,
            camera,
            renderer,
            destroy: destroyScene,
        } = createScene(canvas)

        // Move camera back
        camera.position.z = 4

        // Create shader material
        const uniforms = {
            uTime: { value: 0 },
            uFrequency: { value: 4.0 },
            uAmplitude: { value: 0.1 },
            uColorA: { value: new THREE.Color('#ff6030') },
            uColorB: { value: new THREE.Color('#6030ff') },
        }

        const geometry = new THREE.SphereGeometry(1.5, 128, 128)
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
        })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        // Controls
        const controls = createControls(camera, renderer)

        // Debug panel
        const gui = createDebugPanel()
        const params = {
            frequency: uniforms.uFrequency.value,
            amplitude: uniforms.uAmplitude.value,
            colorA: '#ff6030',
            colorB: '#6030ff',
            wireframe: false,
        }

        gui.add(params, 'frequency', 1, 15, 0.1).onChange((value: number) => {
            uniforms.uFrequency.value = value
        })
        gui.add(params, 'amplitude', 0, 0.3, 0.01).onChange((value: number) => {
            uniforms.uAmplitude.value = value
        })
        gui.addColor(params, 'colorA').onChange((value: string) => {
            uniforms.uColorA.value.set(value)
        })
        gui.addColor(params, 'colorB').onChange((value: string) => {
            uniforms.uColorB.value.set(value)
        })
        gui.add(params, 'wireframe').onChange((value: boolean) => {
            material.wireframe = value
        })

        // Info text
        const info = document.createElement('div')
        info.className = styles.info
        info.textContent = 'Sphere with GLSL wave displacement shader'
        container.appendChild(info)

        // Animation loop
        const removeTicker = createTicker((elapsed) => {
            uniforms.uTime.value = elapsed
            controls.update()
            renderer.render(scene, camera)
        })

        cleanup = () => {
            removeTicker()
            destroyDebugPanel()
            controls.dispose()
            geometry.dispose()
            material.dispose()
            destroyScene()
            info.remove()
        }
    },

    destroy() {
        cleanup?.()
        cleanup = null
    },
}
