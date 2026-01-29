import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh, Group } from 'three'

type TorusSceneProps = {
    wireframe: boolean
}

export function TorusScene({ wireframe }: TorusSceneProps) {
    const torusRef = useRef<Mesh>(null)
    const knotRef = useRef<Mesh>(null)
    const groupRef = useRef<Group>(null)

    useFrame((state, delta) => {
        if (torusRef.current) {
            torusRef.current.rotation.x += delta * 0.5
            torusRef.current.rotation.y += delta * 0.3
        }
        if (knotRef.current) {
            knotRef.current.rotation.x -= delta * 0.3
            knotRef.current.rotation.z += delta * 0.4
        }
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1
        }
    })

    return (
        <group ref={groupRef}>
            <mesh ref={torusRef} position={[-2, 0, 0]}>
                <torusGeometry args={[1, 0.4, 32, 64]} />
                <meshStandardMaterial
                    color="#6366f1"
                    wireframe={wireframe}
                    metalness={0.7}
                    roughness={0.1}
                />
            </mesh>

            <mesh ref={knotRef} position={[2, 0, 0]}>
                <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
                <meshStandardMaterial
                    color="#a855f7"
                    wireframe={wireframe}
                    metalness={0.7}
                    roughness={0.1}
                />
            </mesh>

            <mesh position={[0, 0, -2]}>
                <dodecahedronGeometry args={[0.8]} />
                <meshStandardMaterial
                    color="#ec4899"
                    wireframe={wireframe}
                    metalness={0.5}
                    roughness={0.3}
                />
            </mesh>

            <mesh position={[0, 0, 2]}>
                <icosahedronGeometry args={[0.8]} />
                <meshStandardMaterial
                    color="#22d3ee"
                    wireframe={wireframe}
                    metalness={0.5}
                    roughness={0.3}
                />
            </mesh>
        </group>
    )
}
