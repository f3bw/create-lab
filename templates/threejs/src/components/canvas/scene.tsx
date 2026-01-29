import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Grid, Float } from '@react-three/drei'
import { Spheres } from './spheres'
import { TorusScene } from './torus-scene'
import { Particles } from './particles'

type SceneProps = {
    sceneType: 'spheres' | 'torus' | 'particles'
    wireframe: boolean
}

export function Scene({ sceneType, wireframe }: SceneProps) {
    return (
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
            <color attach="background" args={['#0a0a0a']} />

            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />

            {sceneType === 'spheres' && <Spheres wireframe={wireframe} />}
            {sceneType === 'torus' && <TorusScene wireframe={wireframe} />}
            {sceneType === 'particles' && <Particles />}

            <Grid
                position={[0, -1.5, 0]}
                args={[20, 20]}
                cellSize={0.5}
                cellThickness={0.5}
                cellColor="#333"
                sectionSize={2}
                sectionThickness={1}
                sectionColor="#555"
                fadeDistance={20}
                fadeStrength={1}
            />

            <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={3}
                maxDistance={20}
            />
            <Environment preset="city" />
        </Canvas>
    )
}
