'use client'

import { Button } from '@/components/Button'
import { IconClose } from '@/components/Icons'
import ReactMarkdown from 'react-markdown'
import styles from './chatBubble.module.css'

export const ChatBubble = ({ message, onRemove, isUser = false }) => {
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
