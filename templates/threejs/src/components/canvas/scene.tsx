import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Box } from './box'

export function Scene() {
    return (
        <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Box position={[0, 0, 0]} />
            <OrbitControls enableDamping dampingFactor={0.05} />
            <Environment preset="city" />
        </Canvas>
    )
}
