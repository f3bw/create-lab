import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import type { Group } from 'three'

type SpheresProps = {
    wireframe: boolean
}

export function Spheres({ wireframe }: SpheresProps) {
    const groupRef = useRef<Group>(null)

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.2
        }
    })

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial
                        color="#6366f1"
                        wireframe={wireframe}
                        metalness={0.5}
                        roughness={0.2}
                    />
                </mesh>
            </Float>

            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
                <mesh position={[2.5, 0.5, 0]}>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshStandardMaterial
                        color="#a855f7"
                        wireframe={wireframe}
                        metalness={0.5}
                        roughness={0.2}
                    />
                </mesh>
            </Float>

            <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
                <mesh position={[-2, -0.3, 1]}>
                    <sphereGeometry args={[0.7, 32, 32]} />
                    <meshStandardMaterial
                        color="#ec4899"
                        wireframe={wireframe}
                        metalness={0.5}
                        roughness={0.2}
                    />
                </mesh>
            </Float>

            <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.9}>
                <mesh position={[1, 1.5, -2]}>
                    <sphereGeometry args={[0.4, 32, 32]} />
                    <meshStandardMaterial
                        color="#22d3ee"
                        wireframe={wireframe}
                        metalness={0.5}
                        roughness={0.2}
                    />
                </mesh>
            </Float>

            <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh position={[-1.5, 1, -1]}>
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshStandardMaterial
                        color="#fbbf24"
                        wireframe={wireframe}
                        metalness={0.5}
                        roughness={0.2}
                    />
                </mesh>
            </Float>
        </group>
    )
}
