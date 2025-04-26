'use client'

import { Button } from '@/components/Button'
import { IconClose } from '@/components/Icons'
import ReactMarkdown from 'react-markdown'
import styles from './chatBubble.module.css'

interface ChatBubbleProps {
    message: string
    onRemove: () => void
    isUser?: boolean
}

export const ChatBubble = ({ message, onRemove, isUser = false }: ChatBubbleProps) => {
    return (
        <div
            className={`${styles.bubbleWrapper} ${isUser ? styles.user : styles.bot}`}
        >
            <div className={styles.bubble}>
                <ReactMarkdown>{message}</ReactMarkdown>
                <div>
                    <Button
                        variant={isUser ? 'secondary' : 'primary'}
                        onClick={onRemove}
                    >
                        Remover{' '}
                        <IconClose fill={isUser ? '#C5C5C5' : '#222222'} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
