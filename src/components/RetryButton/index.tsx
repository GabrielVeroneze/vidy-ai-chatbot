import { ButtonHTMLAttributes } from 'react'
import { IconReload } from '@/components/Icons'
import styles from './retry-button.module.css'

export const RetryButton = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} className={styles.btn}>
            <IconReload /> Gerar nova resposta
        </button>
    )
}
