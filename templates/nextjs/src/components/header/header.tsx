import Link from 'next/link'
import styles from './header.module.css'

export function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.logo}>
                    Lab
                </Link>
                <ul className={styles.links}>
                    <li>
                        <Link href="/experiments" className={styles.link}>
                            Experiments
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className={styles.link}>
                            About
                        </Link>
                    </li>
                    <li>
                        <a
                            href="https://github.com"
                            className={styles.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
