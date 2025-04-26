import { IconSend } from '@/components/Icons'
import styles from './chat.module.css'

export const ChatForm = () => {
    return (
        <form className={styles.form}>
            <input
                className={styles.input}
                placeholder="Digite sua mensagem..."
                required
            />
            <button className={styles.btn}>
                <IconSend />
            </button>
        </form>
    )
}
