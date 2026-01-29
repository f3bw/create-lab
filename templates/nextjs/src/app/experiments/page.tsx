'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/button'
import styles from './page.module.css'

const EXPERIMENTS = [
    { id: 1, name: 'Counter', description: 'Simple state management' },
    { id: 2, name: 'Toggle', description: 'Boolean state toggle' },
    { id: 3, name: 'List', description: 'Dynamic list rendering' },
]

export default function ExperimentsPage() {
    const [count, setCount] = useState(0)
    const [isOn, setIsOn] = useState(false)
    const [items, setItems] = useState(['Item 1', 'Item 2'])

    const addItem = () => {
        setItems([...items, `Item ${items.length + 1}`])
    }

    return (
        <main className={styles.main}>
            <div className={styles.header}>
                <h1 className={styles.title}>Experiments</h1>
                <Link href="/">
                    <Button variant="ghost" size="sm">
                        ← Back
                    </Button>
                </Link>
            </div>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Counter</h3>
                    <p className={styles.cardDescription}>Simple state management</p>
                    <div className={styles.cardContent}>
                        <span className={styles.value}>{count}</span>
                        <div className={styles.cardActions}>
                            <Button size="sm" onClick={() => setCount((c) => c + 1)}>
                                +
                            </Button>
                            <Button size="sm" variant="secondary" onClick={() => setCount((c) => c - 1)}>
                                −
                            </Button>
                        </div>
                    </div>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Toggle</h3>
                    <p className={styles.cardDescription}>Boolean state toggle</p>
                    <div className={styles.cardContent}>
                        <span className={styles.status} data-on={isOn}>
                            {isOn ? 'ON' : 'OFF'}
                        </span>
                        <Button size="sm" onClick={() => setIsOn(!isOn)}>
                            Toggle
                        </Button>
                    </div>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Dynamic List</h3>
                    <p className={styles.cardDescription}>Add items dynamically</p>
                    <div className={styles.cardContent}>
                        <ul className={styles.list}>
                            {items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <Button size="sm" onClick={addItem}>
                            Add Item
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}
