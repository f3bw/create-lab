import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Points } from 'three'
import * as THREE from 'three'

const PARTICLE_COUNT = 2000

export function Particles() {
    const pointsRef = useRef<Points>(null)

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3)
        const colors = new Float32Array(PARTICLE_COUNT * 3)

        const color = new THREE.Color()

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3

            // Sphere distribution
            const radius = 3 + Math.random() * 2
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
            positions[i3 + 2] = radius * Math.cos(phi)

            // Color gradient
            const hue = 0.6 + Math.random() * 0.3 // Purple to blue range
            color.setHSL(hue, 0.8, 0.6)

            colors[i3] = color.r
            colors[i3 + 1] = color.g
            colors[i3 + 2] = color.b
        }

        return { positions, colors }
    }, [])

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.1
            pointsRef.current.rotation.x += delta * 0.05
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={PARTICLE_COUNT}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={PARTICLE_COUNT}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    )
}
