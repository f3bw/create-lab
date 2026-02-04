import * as THREE from 'three'

export interface SceneContext {
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    destroy: () => void
}

export function createScene(canvas: HTMLCanvasElement): SceneContext {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const handleResize = () => {
        const width = window.innerWidth
        const height = window.innerHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('resize', handleResize)

    const destroy = () => {
        window.removeEventListener('resize', handleResize)
        renderer.dispose()
        scene.clear()
    }

    return { scene, camera, renderer, destroy }
}
