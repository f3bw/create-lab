import { useState } from 'react'
import { Scene } from '@/components/canvas/scene'
import { Button } from '@/components/button'
import styles from './App.module.css'

type SceneType = 'spheres' | 'torus' | 'particles'

export default function App() {
    const [sceneType, setSceneType] = useState<SceneType>('spheres')
    const [wireframe, setWireframe] = useState(false)

    return (
        <div className={styles.app}>
            <Scene sceneType={sceneType} wireframe={wireframe} />

            <div className={styles.overlay}>
                <header className={styles.header}>
                    <h1 className={styles.logo}>Lab</h1>
                    <nav className={styles.nav}>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </nav>
                </header>

                <div className={styles.controls}>
                    <div className={styles.controlGroup}>
                        <span className={styles.label}>Scene</span>
                        <div className={styles.buttons}>
                            <Button
                                size="sm"
                                variant={sceneType === 'spheres' ? 'primary' : 'ghost'}
                                onClick={() => setSceneType('spheres')}
                            >
                                Spheres
                            </Button>
                            <Button
                                size="sm"
                                variant={sceneType === 'torus' ? 'primary' : 'ghost'}
                                onClick={() => setSceneType('torus')}
                            >
                                Torus
                            </Button>
                            <Button
                                size="sm"
                                variant={sceneType === 'particles' ? 'primary' : 'ghost'}
                                onClick={() => setSceneType('particles')}
                            >
                                Particles
                            </Button>
                        </div>
                    </div>

                    <div className={styles.controlGroup}>
                        <Button
                            size="sm"
                            variant={wireframe ? 'primary' : 'ghost'}
                            onClick={() => setWireframe(!wireframe)}
                        >
                            Wireframe
                        </Button>
                    </div>
                </div>

                <footer className={styles.footer}>
                    <h1 className={styles.title}>Three.js Lab</h1>
                    <p className={styles.hint}>Drag to orbit • Scroll to zoom</p>
                </footer>
            </div>
        </div>
    )
}
