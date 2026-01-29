import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import styles from './button.module.css'

const buttonVariants = cva(styles.base, {
    variants: {
        variant: {
            primary: styles.primary,
            secondary: styles.secondary,
            ghost: styles.ghost,
        },
        size: {
            sm: styles.sm,
            md: styles.md,
            lg: styles.lg,
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
    },
})

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: ButtonProps) {
    return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
