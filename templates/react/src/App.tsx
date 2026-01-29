import { useState } from 'react'
import { Button } from '@/components/button'
import styles from './App.module.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>React Lab</h1>
            <div className={styles.card}>
                <Button onClick={() => setCount((c) => c + 1)}>Count: {count}</Button>
            </div>
            <p className={styles.hint}>Edit src/App.tsx and save to test HMR</p>
        </main>
    )
}

export default App
