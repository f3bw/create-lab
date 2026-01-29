import { Scene } from '@/components/canvas/scene'
import styles from './App.module.css'

function App() {
    return (
        <main className={styles.container}>
            <Scene />
            <div className={styles.overlay}>
                <h1 className={styles.title}>Three.js Lab</h1>
                <p className={styles.hint}>Edit src/components/canvas/scene.tsx to experiment</p>
            </div>
        </main>
    )
}

export default App
