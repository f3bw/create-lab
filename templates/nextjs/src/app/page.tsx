import Link from 'next/link'
import { Button } from '@/components/button'
import styles from './page.module.css'

const FEATURES = [
    {
        title: 'App Router',
        description: 'File-based routing with layouts, loading states, and error boundaries',
        href: '/experiments',
    },
    {
        title: 'Server Components',
        description: 'React Server Components for optimal performance',
        href: '/about',
    },
    {
        title: 'Turbopack',
        description: 'Lightning-fast development with Turbopack bundler',
        href: '/experiments',
    },
]

export default function Home() {
    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <h1 className={styles.title}>Next.js Lab</h1>
                <p className={styles.subtitle}>
                    A playground for Next.js 15 experiments and prototypes
                </p>
                <div className={styles.actions}>
                    <Link href="/experiments">
                        <Button>View Experiments</Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="secondary">About</Button>
                    </Link>
                </div>
            </section>

            <section className={styles.features}>
                {FEATURES.map((feature, index) => (
                    <Link href={feature.href} key={index} className={styles.card}>
                        <h3 className={styles.cardTitle}>{feature.title}</h3>
                        <p className={styles.cardDescription}>{feature.description}</p>
                        <span className={styles.cardLink}>Learn more →</span>
                    </Link>
                ))}
            </section>

            <section className={styles.info}>
                <p>
                    Edit <code>src/app/page.tsx</code> to start experimenting
                </p>
            </section>
        </main>
    )
}
