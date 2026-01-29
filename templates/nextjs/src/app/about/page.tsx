import Link from 'next/link'
import { Button } from '@/components/button'
import styles from './page.module.css'

export default function AboutPage() {
    return (
        <main className={styles.main}>
            <section className={styles.content}>
                <h1 className={styles.title}>About</h1>
                <p className={styles.text}>
                    This is a Next.js 15 lab template for rapid prototyping and experimentation.
                </p>
                <p className={styles.text}>
                    It includes modern tooling like TypeScript, ESLint, Prettier, and CSS Modules
                    with a clean, minimal design system.
                </p>

                <div className={styles.stack}>
                    <h2 className={styles.stackTitle}>Tech Stack</h2>
                    <ul className={styles.stackList}>
                        <li>Next.js 15 with App Router</li>
                        <li>React 19</li>
                        <li>TypeScript</li>
                        <li>CSS Modules + CVA</li>
                        <li>ESLint + Prettier + Stylelint</li>
                    </ul>
                </div>

                <Link href="/">
                    <Button variant="secondary">← Back to Home</Button>
                </Link>
            </section>
        </main>
    )
}
