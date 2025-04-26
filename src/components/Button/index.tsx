import { ButtonHTMLAttributes } from 'react'
import styles from './button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger'
    children: React.ReactNode
}

export const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => {
    const variantClass = {
        primary: styles.primary,
        secondary: styles.secondary,
        danger: styles.danger,
    }

    const className = `${styles.button} ${
        variantClass[variant] || styles.primary
    }`

    return (
        <button className={className} {...props}>
            {children}
        </button>
    )
}
