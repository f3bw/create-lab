import { useState } from 'react'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { Header } from '@/components/header'
import styles from './App.module.css'

const EXPERIMENTS = [
    {
        title: 'Experiment 01',
        description: 'Click to interact with this card component',
        color: 'var(--color-primary)',
    },
    {
        title: 'Experiment 02',
        description: 'Hover states and transitions demo',
        color: 'var(--color-secondary)',
    },
    {
        title: 'Experiment 03',
        description: 'Layout and grid exploration',
        color: 'var(--color-accent)',
    },
]

function App() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [count, setCount] = useState(0)

    return (
        <div className={styles.app}>
            <Header />
            <main className={styles.main}>
                <section className={styles.hero}>
                    <h1 className={styles.title}>React Lab</h1>
                    <p className={styles.subtitle}>
                        A playground for experiments and prototypes
                    </p>
                    <div className={styles.actions}>
                        <Button onClick={() => setCount((c) => c + 1)}>
                            Counter: {count}
                        </Button>
                        <Button variant="secondary" onClick={() => setCount(0)}>
                            Reset
                        </Button>
                    </div>
                </section>

                <section className={styles.grid}>
                    {EXPERIMENTS.map((exp, index) => (
                        <Card
                            key={index}
                            title={exp.title}
                            description={exp.description}
                            accentColor={exp.color}
                            isActive={activeIndex === index}
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                        />
                    ))}
                </section>

                <section className={styles.info}>
                    <p>Edit <code>src/App.tsx</code> to start experimenting</p>
                </section>
            </main>
        </div>
    )
}

export default App
