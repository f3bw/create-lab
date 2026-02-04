import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { PerspectiveCamera, WebGLRenderer } from 'three'

export interface ControlsOptions {
    enableDamping?: boolean
    dampingFactor?: number
    enableZoom?: boolean
    enablePan?: boolean
    autoRotate?: boolean
    autoRotateSpeed?: number
}

export function createControls(
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
    options: ControlsOptions = {}
): OrbitControls {
    const controls = new OrbitControls(camera, renderer.domElement)

    controls.enableDamping = options.enableDamping ?? true
    controls.dampingFactor = options.dampingFactor ?? 0.05
    controls.enableZoom = options.enableZoom ?? true
    controls.enablePan = options.enablePan ?? true
    controls.autoRotate = options.autoRotate ?? false
    controls.autoRotateSpeed = options.autoRotateSpeed ?? 2.0

    return controls
}
