'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import styles from './page.module.css'

export default function Home() {
    const [count, setCount] = useState(0)

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Next.js Lab</h1>
            <div className={styles.card}>
                <Button onClick={() => setCount((c) => c + 1)}>Count: {count}</Button>
            </div>
            <p className={styles.hint}>Edit src/app/page.tsx to get started</p>
        </main>
    )
}
