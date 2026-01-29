import styles from './header.module.css'

export function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <a href="/" className={styles.logo}>
                    Lab
                </a>
                <ul className={styles.links}>
                    <li>
                        <a href="#experiments" className={styles.link}>
                            Experiments
                        </a>
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
