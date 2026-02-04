import * as THREE from 'three'
import type { Experiment } from '../index'
import { createScene } from '../../core/scene'
import { createControls } from '../../core/controls'
import { createDebugPanel, destroyDebugPanel } from '../../core/debug'
import { createTicker } from '../../core/ticker'
import styles from './style.module.css'

let cleanup: (() => void) | null = null

export const template: Experiment = {
    name: 'Template',

    init(container: HTMLElement) {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement
        const {
            scene,
            camera,
            renderer,
            destroy: destroyScene,
        } = createScene(canvas)

        // Create your 3D objects here
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshStandardMaterial({ color: 0xff6030 })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)

        // Controls
        const controls = createControls(camera, renderer)

        // Debug panel - add controls here
        createDebugPanel()

        // Info text
        const info = document.createElement('div')
        info.className = styles.info
        info.textContent = 'Drag to rotate, scroll to zoom'
        container.appendChild(info)

        // Animation loop
        const removeTicker = createTicker((elapsed) => {
            mesh.rotation.y = elapsed
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
