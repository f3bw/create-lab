import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

type BoxProps = {
    position: [number, number, number]
}

export function Box({ position }: BoxProps) {
    const meshRef = useRef<Mesh>(null)
    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.5
            meshRef.current.rotation.y += delta * 0.5
        }
    })

    return (
        <mesh
            ref={meshRef}
            position={position}
            scale={clicked ? 1.5 : 1}
            onClick={() => setClicked(!clicked)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? '#a855f7' : '#6366f1'} />
        </mesh>
    )
}
