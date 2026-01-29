import { cn } from '@/utils/cn'
import styles from './card.module.css'

type CardProps = {
    title: string
    description: string
    accentColor?: string
    isActive?: boolean
    onClick?: () => void
}

export function Card({ title, description, accentColor, isActive, onClick }: CardProps) {
    return (
        <article
            className={cn(styles.card, isActive && styles.active)}
            onClick={onClick}
            style={{ '--accent': accentColor } as React.CSSProperties}
        >
            <div className={styles.indicator} />
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <span className={styles.action}>{isActive ? 'Active' : 'Click to select'}</span>
        </article>
    )
}
