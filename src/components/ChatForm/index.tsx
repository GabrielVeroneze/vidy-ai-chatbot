'use client'

import { IconSend } from '@/components/Icons'
import styles from './chat.module.css'

interface ChatFormProps {
    input: string
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const ChatForm = ({ input, onInputChange, onSubmit }: ChatFormProps) => {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <input
                className={styles.input}
                placeholder="Digite sua mensagem..."
                value={input}
                onChange={onInputChange}
                required
            />
            <button className={styles.btn}>
                <IconSend />
            </button>
        </form>
    )
}
